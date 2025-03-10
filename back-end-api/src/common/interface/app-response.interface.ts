export interface ErrorResponse {
  code: string;
  status: number;
  message: string;
  detail?: string;
  timestamp: string;
}
