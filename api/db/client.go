package db

import (
	"fmt"
	"strings"

	"github.com/go-sql-driver/mysql"
	// this is needed to enable mysql database support
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/gommon/log"

	"autoshop/api/types"
)

// Client is db client object
type Client struct {
	db         *sqlx.DB
	ex         sqlx.Ext
	committed  bool
	viewPrefix string
}

var conf Config

const (
	uniqueViolation     = 1062
	foreignKeyViolation = 1452
)

// Config stores database configuration
type Config struct {
	MySQLHost         string `json:"mysql_host" default:"127.0.0.1"`
	MySQLPort         string `json:"mysql_port" default:"3306"`
	DatabaseName      string `json:"database_name" default:"oldvolkshome"`
	MySQLGuestUser    string `json:"mysql_guest_user" default:"guest"`
	MySQLGuestPass    string `json:"mysql_guest_pass" default:"guest"`
	MySQLCustomerUser string `json:"mysql_customer_user" default:"customer"`
	MySQLCustomerPass string `json:"mysql_customer_pass" default:"customer"`
	MySQLEmployeeUser string `json:"mysql_employee_user" default:"employee"`
	MySQLEmployeePass string `json:"mysql_employee_pass" default:"employee"`
	MySQLAdminUser    string `json:"mysql_admin_user" default:"admin"`
	MySQLAdminPass    string `json:"mysql_admin_pass" default:"root"`
}

// Init sets config
func Init(c Config) {
	conf = c
}

// Connect returns new db connections
func Connect(connType string) (*Client, error) {
	cn := fmt.Sprintf("%%s:%%s@(%s:%s)/%s", conf.MySQLHost, conf.MySQLPort, conf.DatabaseName)
	viewPrefix := ""
	switch connType {
	case "admin":
		cn = fmt.Sprintf(cn, conf.MySQLAdminUser, conf.MySQLAdminPass)
		viewPrefix = "admin_v"
	case "employee":
		cn = fmt.Sprintf(cn, conf.MySQLEmployeeUser, conf.MySQLEmployeePass)
		viewPrefix = "employee_v"
	case "customer":
		cn = fmt.Sprintf(cn, conf.MySQLCustomerUser, conf.MySQLCustomerPass)
		viewPrefix = "customer_v"
	case "guest":
		cn = fmt.Sprintf(cn, conf.MySQLGuestUser, conf.MySQLGuestPass)
		viewPrefix = "guest_v"
	default:
		return nil, fmt.Errorf("Invalid connection type: %s", connType)
	}

	rawdb, err := sqlx.Connect("mysql", cn)
	if err != nil {
		return nil, err
	}

	return &Client{
		db:         rawdb,
		ex:         rawdb,
		viewPrefix: viewPrefix,
	}, nil
}

func (c *Client) applyView(query string) string {
	return strings.ReplaceAll(query, "%s", c.viewPrefix)
}

func (c *Client) transformError(err error) *types.Error {
	if err == nil {
		return nil
	}
	// Check key violation error
	if mq, ok := err.(*mysql.MySQLError); ok {
		if mq.Number == foreignKeyViolation {
			return types.ValidationError(mq.Message)
		} else if mq.Number == uniqueViolation {
			return types.DuplicateError(mq.Message)
		}
	}

	return types.DatabaseError(err)
}

// Close closes connection
func (c *Client) Close() error {
	c.viewPrefix = ""
	return c.db.Close()
}

// DB returns internal sqlx db connection
func (c *Client) DB() *sqlx.DB {
	return c.db
}

// currentTransaction returns the current transaction if there is one, otherwise nil
func (c *Client) currentTransaction() *sqlx.Tx {
	if tx, ok := c.ex.(*sqlx.Tx); ok {
		return tx
	}

	return nil
}

// Begin begins a transaction, and returns a client set up to use the transaction
func (c *Client) Begin() (*Client, error) {
	if tx := c.currentTransaction(); tx != nil {
		panic("can't start nested transaction")
	}

	tx, err := c.db.Beginx()
	if err != nil {
		return nil, err
	}

	return &Client{
		db:         c.db,
		ex:         tx,
		viewPrefix: c.viewPrefix,
	}, nil
}

// End ends a transaction, rolling the transaction back if it has not been committed
func (c *Client) End() {
	tx := c.currentTransaction()
	if !c.committed && tx == nil {
		panic("End() called outside transaction")
	}

	if !c.committed { // => tx != nil, or we'd have panicked above
		err := tx.Rollback()
		if err != nil {
			log.Errorf("Failed to rollback transaction: %s", err)
		}
	}

	c.ex = c.db
	c.committed = false
}

// Commit commits the current transaction
func (c *Client) Commit() error {
	tx := c.currentTransaction()
	if tx == nil {
		panic("Commit() called outside transaction")
	}

	err := tx.Commit()
	if err != nil {
		return err
	}

	c.ex = c.db
	c.committed = true
	return nil
}
