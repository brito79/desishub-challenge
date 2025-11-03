/**
 * Standard error response format
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: unknown): {
  success: false;
  error: string;
  code?: string;
} {
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: 'An unexpected error occurred',
  };
}

/**
 * Async error handler wrapper
 */
export function asyncHandler<T>(
  fn: (...args: unknown[]) => Promise<T>
): (...args: unknown[]) => Promise<T> {
  return async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw error;
    }
  };
}
