package server

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// Pagination takes care of the pagination parameters and headers
func Pagination() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			var perPage, pageNumber int
			if c.Request().Method == http.MethodGet || c.Request().Method == http.MethodPost {

				str := c.QueryParam("per_page")
				if str != "" {
					n, err := strconv.ParseInt(str, 10, 32)
					if err != nil || n <= 0 {
						e := fmt.Sprintf("Invalid value %q - expected an integer greater than zero", str)
						return c.JSON(http.StatusBadRequest, echo.Map{
							"message": "Validation error",
							"details": echo.Map{
								"per_page": e,
							},
						})
					}
					perPage = int(n)
				} else {
					perPage = 10
				}

				str = c.QueryParam("page")
				if str != "" {
					n, err := strconv.ParseInt(str, 10, 32)
					if err != nil || n <= 0 {
						e := fmt.Sprintf("Invalid value %q - expected an integer greater than zero", str)
						return c.JSON(http.StatusBadRequest, echo.Map{
							"message": "Validation error",
							"details": echo.Map{
								"page": e,
							},
						})
					}
					pageNumber = int(n)
				} else {
					pageNumber = 1
				}

				c.Set("page_number", pageNumber)
				c.Set("per_page", perPage)
			}

			return next(c)
		}
	}
}
