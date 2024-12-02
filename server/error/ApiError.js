class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
        this.name = 'ApiError'; // Explicitly set the name property
    }

    static badRequest(message) {
        return new ApiError(400, message); // Corrected status code
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static unauthorized(message) { // Added for 401 Unauthorized
        return new ApiError(401, message);
    }

    static notFound(message) { // Added for 404 Not Found
        return new ApiError(404, message);
    }

}

module.exports = ApiError;