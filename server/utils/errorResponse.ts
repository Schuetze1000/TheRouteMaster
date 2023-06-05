export class ErrorResponse extends Error {
	statusCode: number;
	constructor(message: any, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}


export function onError(error:any, next: any, status:number = 400) {
	if (error instanceof ErrorResponse) {
		return next(new ErrorResponse(error.message, error.statusCode));
	}
	return next(new ErrorResponse(error.message, status));
}
