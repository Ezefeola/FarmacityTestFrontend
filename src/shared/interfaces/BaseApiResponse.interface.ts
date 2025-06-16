export interface BaseApiResponse<TResponse = null> {
    payload: TResponse;
    isSuccess: boolean;
    httpStatusCode: number;
    description: string;
    errors: string[];
}