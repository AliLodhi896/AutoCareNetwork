// import Config from '../../../member/app/config';
// import Config from "react-native-config";

// const API_URL = "https://autocarenetwork.com";
const API_URL = "https://autocarenetwork.com";

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
};
