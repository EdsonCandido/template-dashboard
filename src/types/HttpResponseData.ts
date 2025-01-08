export type HttpResponseData<T> = {
    data: T | null;
    success: boolean;
    message: string;
}