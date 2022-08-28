import { AUTH_ERROR_MESSAGE, AUTH_FORBIDDEN_MESSAGE, CUSTOM_ERROR_MESSAGE } from "./MessageList"

export const StatusCodeHelper = (err) => {

    //     "data": null,
    //   "error": {
    //     "status": "", // HTTP status
    //     "name": "", // Strapi error name ('ApplicationError' or 'ValidationError')
    //     "message": "", // A human readable error message
    //     "details": {
    //       // error info specific to the error type
    //     }
    //   }

    if (err.response) {
        switch (err.response.error.status) {
            case 401: {
                return {
                    hasError: true,
                    errorList: [AUTH_ERROR_MESSAGE]
                }
            }
            case 403: {
                return {
                    hasError: true,
                    errorList: [AUTH_FORBIDDEN_MESSAGE]
                }
            }
            case 400: {
                return {
                    hasError: true,
                    errorList: err.response.data.errorList
                }
            }
            default: {
                return {
                    hasError: true,
                    errorList: err.response.data.errorList
                }
            }
        }
    }

    return {
        hasError: true,
        errorList: [err.message]
    }
}