export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
      "description": "My Bank API descripion",
      "version": "1.0.0",
      "title": "My Bank API descripion"
    },
    "host": "localhost:3000",
    "tags": [
      {
        "name": "account",
        "description": "Account management"
      }
    ],
    "paths": {
      "/account": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Get existing accounts",
          "description": "Get existing account description",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Successful operation",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Account"
                }
              }
            },
            "400": {
              "description": "Error ocurred"
            }
          }
        },
        "post": {
          "tags": [
            "account"
          ],
          "summary": "Create a new account",
          "description": "Create a new account with the received parameters",
          "consumes": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account object",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Account created"
            },
            "400": {
              "description": "Error ocurred"
            }
          }
        }
      }
    },
    "definitions": {
      "Account": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "Guilherme Fernando"
          },
          "balance": {
            "type": "integer",
            "example": 742.34
          }
        }
      }
    }
  };