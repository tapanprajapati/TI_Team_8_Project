/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 * Generalized response type for all the backend responses
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
