/**
 *
 */

export interface ApiResponseModel {
  success: boolean;
  statusCode: number;
  items?: any;
  message?: string;
  error?: string;
  result?: any;
}
