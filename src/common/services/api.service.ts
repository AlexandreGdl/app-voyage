/**
 * @interface ApiRequestOptions
 * Define the options for a request.
 * Default options are defined in the ApiService class.
 */
export interface ApiRequestOptions {
  // body of the request
  body?: unknown;
  // headers of the request
  headers?: {[key: string]: string};
  // specify if the service request the rm api or another api.
  isRequestingAPI?: boolean;
  // specify if the request should return content or not.
  isReturningContent?: boolean;
}
/**
 * @type {'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'connect' | 'options' | 'trace'}
 * Possibles http request methods
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'connect' | 'options' | 'trace'
/**
 * @class
 * Centralize all api requests
 */
export class ApiService {
  private static instance: ApiService;
  // Default options of the request method
  private defaultOptions: ApiRequestOptions = {
    isRequestingAPI: true,
    isReturningContent: true,
  };
  /**
   * Singleton method to get the only one instance of the class
   * @returns {ApiService} instance of the api service
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Global api request with options
   * @param {HttpMethod} method http request method
   * @param {string} endpoint api endpoint
   * @param {ApiRequestOptions} options options of the request
   * @returns {Promise<unknown>} A promise resolving result of the api request
   */
   public request<T>(
    method: HttpMethod,
    endpoint: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {

    // eslint-disable-next-line no-param-reassign
    options = {...this.defaultOptions, ...options};

    const url = options.isRequestingAPI
      ? `${process.env.EXPO_API_URL}${endpoint}`
      : endpoint;

    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...(!!options.body && { body: JSON.stringify(options.body) }),
      }).then(async (response: Response) => {
        const resJson = await response.json();

        resolve(resJson);

      }).catch((error: unknown) => {
        reject(error);

      });
    });
  }

};