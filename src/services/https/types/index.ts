export interface AppAxiosSuccessResponseI<T = any> {
  data: T;
  status: number;
  statusText: string;
}
