/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description: content type
 */

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data url
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
