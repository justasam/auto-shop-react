package types

import "fmt"

type errType int

const (
	// ErrTypeValidationError indicates Validation Failure
	ErrTypeValidationError = iota

	// ErrTypeSystemError indicates a System Error
	ErrTypeSystemError

	// ErrTypeNotFoundError indicates a 404 Not Found Error
	ErrTypeNotFoundError

	// ErrTypeDatabaseError indicates a Database Error
	ErrTypeDatabaseError

	// ErrTypeDuplicateError indicates a Duplicate Error
	ErrTypeDuplicateError
)

// Error represents a talaria error
type Error struct {
	msg  string
	Type errType
}

func (e *Error) String() string {
	return e.msg
}

func (e *Error) Error() string {
	return e.msg
}

func (e *Error) IsDuplicate() bool {
	return e.Type == ErrTypeDuplicateError
}

// ErrorResponse represents a talaria http response containing error message
type ErrorResponse struct {
	Message string            `json:"message"`
	Details map[string]string `json:"details,omitempty"`
}

// ValidationError returns an error object that indicates Validation Failure
func ValidationError(msg string) *Error {
	return &Error{msg, ErrTypeValidationError}
}

// DuplicateError returns an error object that indicates Duplicate record
func DuplicateError(msg string) *Error {
	return &Error{msg, ErrTypeDuplicateError}
}

// SystemError returns an error object that indicates a System Error
func SystemError(msg string) *Error {
	return &Error{msg, ErrTypeSystemError}
}

// DatabaseError returns an system error object with prefix "DB Error: "
func DatabaseError(err error) *Error {
	msg := "DB Error: " + err.Error()
	return &Error{msg, ErrTypeDatabaseError}
}

// NotFoundError return a not found error object with prefix ""
func NotFoundError(err error) *Error {
	msg := "404 Not Found Error: " + err.Error()
	return &Error{msg, ErrTypeNotFoundError}
}

var (
	// ErrInternalError is raised when a system error prevents us from checking auth
	ErrInternalError = SystemError("Internal Error")

	// ErrDatabaseError is raised when a system error prevents us from checking auth
	ErrDatabaseError = SystemError("Database Error")

	// ErrAccessDenied is raised when the authorisation check fails
	ErrAccessDenied = fmt.Errorf("Access Denied")
)
