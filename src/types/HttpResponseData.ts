export type HttpResponseData<T> = {
    data: T | null;
    success: boolean;
    error: object | null | undefined;
    message: string;
}