import { z } from "zod";

export const ErrorResponse = z.object({
	error: z.string(),
	code: z.string().optional(),
});

export class AppError extends Error {
	constructor(
		message: string,
		public status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500,
		public code?: string,
	) {
		super(message);
		this.name = "AppError";
	}
}

export const errorResponses = {
	400: ErrorResponse,
	401: ErrorResponse,
	403: ErrorResponse,
	404: ErrorResponse,
	409: ErrorResponse,
	422: ErrorResponse,
	429: ErrorResponse,
	500: ErrorResponse,
};
