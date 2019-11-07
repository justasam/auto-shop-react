package controllers

import (
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

// Ping returns a ping response
// - suitable for any check not wanting to hit db backend
func Ping(c echo.Context) error {
	return c.JSON(http.StatusOK, echo.Map{"message": "pong"})
}

func getSessionByType(t string, c echo.Context) (*sessions.Session, bool) {
	sess, _ := session.Get("session", c)
	if v, found := sess.Values["account_type"]; found {
		if v.(string) == t {
			return sess, true
		}
	}

	return nil, false
}
