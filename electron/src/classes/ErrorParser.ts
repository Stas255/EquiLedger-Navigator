import { ErrorDetail } from "Types/error";

export class ErrorParser {
    static parseError(error: Error, context: { source?: string; userContext?: string; errorCode?: string } = {}): ErrorDetail {
        return {
            message: error.message,
            timestamp: new Date(),
            errorCode: context.errorCode,
            severity: 'high', // Default severity, can be adjusted based on error or context
            source: context.source,
            stackTrace: error.stack,
            userContext: context.userContext
        };
    }
}