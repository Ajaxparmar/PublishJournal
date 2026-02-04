import { NextResponse } from "next/server";


export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  [key: string]: unknown; // For extras like metadata
}


export interface ResponseOptions<T = unknown> {
  status?: number; // Default: 200 for success, 500 for error
  message?: string; // Default: "Success" or "Error"
  data?: T;
  errors?: string[]; // Strict: string array for error messages
}


export function formatResponse<T = unknown>(
  options: ResponseOptions<T>
): NextResponse<ApiResponse<T>> {
  const { 
    status = options.errors ? 500 : 200, // Auto-set based on errors
    message = options.errors ? "Error" : "Success",
    data,
    errors 
  } = options;


  if (process.env.NODE_ENV === 'development') {
    console.log(`API Response [${status}]: ${message}`);
  }

  const responseBody: ApiResponse<T> = {
    success: !errors, // True if no errors
    message,
    ...(data && { data }), // Add data only if provided
    ...(errors && errors.length > 0 && { errors }), // Add errors only if non-empty (your key idea)
  };

  return NextResponse.json(responseBody, { status });
}

// Helpers (shortcuts for common cases)
export const success = <T = unknown>(data?: T, message?: string, status: number = 200) =>
  formatResponse({ data, message, status }); // Explicit success: true

export const created = <T = unknown>(data: T, message?: string) =>
  success(data, message, 201);

export const error = (errorMessage: string, status: number = 500, errors?: string[]) =>
  formatResponse({ status, message: errorMessage, errors });

// Common errors (one-liners)
export const badRequest = (errorMessage: string = "Bad request") => error(errorMessage, 400);
export const unauthorized = (errorMessage: string = "Unauthorized") => error(errorMessage, 401);
export const notFound = (errorMessage: string = "Not found") => error(errorMessage, 404);
export const serverError = (errorMessage: string = "Internal server error", p0: string | undefined) => error(errorMessage, 500);
export const AdminAccessOnly = (errorMessage: string = "Admin access only") => error(errorMessage, 403);