export interface Response<Response> {
  success: boolean;
  data: Response;
  errors?: Record<string, Array<string>>;
}
