// Custom hook for error handling with user-friendly messages
import { useState, useCallback } from 'react';
import { ApiError } from '@/services';

interface ErrorState {
  message: string;
  code?: string;
  details?: any;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback((error: unknown) => {
    console.error('Error occurred:', error);
    
    let errorMessage = 'An unexpected error occurred';
    let errorCode: string | undefined;
    let errorDetails: any;

    if (error instanceof ApiError) {
      errorMessage = error.message;
      errorCode = error.code;
      errorDetails = { status: error.status };
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorDetails = error;
    }

    // User-friendly error messages
    const userFriendlyMessage = getUserFriendlyMessage(errorMessage, errorCode);

    setError({
      message: userFriendlyMessage,
      code: errorCode,
      details: errorDetails
    });
    setIsError(true);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  const retryWithErrorHandling = useCallback(async (
    operation: () => Promise<any>,
    onSuccess?: (result: any) => void
  ) => {
    try {
      clearError();
      const result = await operation();
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError, clearError]);

  return {
    error,
    isError,
    handleError,
    clearError,
    retryWithErrorHandling
  };
};

// Helper function to convert technical errors to user-friendly messages
function getUserFriendlyMessage(message: string, code?: string): string {
  const lowerMessage = message.toLowerCase();

  // Network errors
  if (lowerMessage.includes('fetch') || lowerMessage.includes('network')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Authentication errors
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('401')) {
    return 'Your session has expired. Please log in again.';
  }

  if (lowerMessage.includes('forbidden') || lowerMessage.includes('403')) {
    return 'You do not have permission to perform this action.';
  }

  // Validation errors
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return 'Please check your input and try again.';
  }

  // Server errors
  if (lowerMessage.includes('500') || lowerMessage.includes('server error')) {
    return 'Server is temporarily unavailable. Please try again later.';
  }

  if (lowerMessage.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  // API specific errors
  if (lowerMessage.includes('no rewritten text')) {
    return 'Unable to generate content. Please try again or contact support.';
  }

  // Return original message if no specific mapping found
  return message;
}