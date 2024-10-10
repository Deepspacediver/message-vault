class BadRequestError extends Error {
    errors: string[];
    statusCode: 400;
    viewFilePath: string;

    constructor(message: string, errors: string[], viewFilePath: string) {
        super(message);
        this.errors = errors;
        this.statusCode = 400;
        this.viewFilePath = viewFilePath;
    }
}

export default BadRequestError;