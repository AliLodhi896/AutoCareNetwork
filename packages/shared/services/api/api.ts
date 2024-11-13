import { ApisauceInstance, create, ApiResponse } from "apisauce";
import { getGeneralApiProblem } from "./api-problem";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import * as Types from "./api.types";
import { Platform as RNPlatform } from "react-native";
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import { getAppID } from "../../utils/common";
import { isDealerBundleApp, getAppToken } from "./api-constant";
import { IAddVinNumberToVehicle } from "../../../member/app/washub-types";
import { useAppState } from "../../../member/app/context/app-state-context";

const AppToken = RNPlatform.select(getAppToken());
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apiUrl = `${config.url}/API/Autocare`;
    this.setup();
  }
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;
  /**
   * Configurable options.
   */
  config: ApiConfig;
  apiUrl: string;
  token = AppToken;
  authToken = null;
  setToken: (token: string) => void = (token) => {
    this.authToken = token;
    this.setup();
  };
  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      // timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        AppToken: this.token,
        AuthToken: this.authToken,
      },
    });
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data;
      const resultUsers: Types.User[] = rawUsers.map(convertUser);
      return { kind: "ok", users: resultUsers };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async handleResponse(
    response: any,
    validCode: number | number[] | undefined,
    responseKey: string | null,
    noError = false
  ) {
    const key: string = responseKey || "result";

    try {
      const responseJson = await response.data;
      const code = responseJson?.ResponseCode;
      let message = responseJson?.ResponseMessage;

      /*const termsRequired = responseJson.AcceptTerms
      if (termsRequired) {
        throw new Error("terms-required")
      }*/
      const showMessage = (message: string) => {
        !noError &&
          Toast.show({
            type: "error",
            text1: "message",
            autoHide: true,
            visibilityTime: 10000,
            position: "bottom",
          });
      };
      if (code === 21) {
        //invalid app token
        message =
          "This app is temporarily unavailable or this version is no longer supported. Please check the app store for an updated version, or call Washub at 631-654-WASH (9274)  if you continue to experience issues.";
        throw new Error(message);
      } else if (code === 25) {
        //invalid auth token
        message = "Your session has expired, please log in again.";
        throw new Error(message);
      }

      const isValidCode = (val: number) => {
        if (validCode instanceof Array) {
          return validCode.indexOf(val) > -1;
        }
        return val === validCode;
      };

      if (isValidCode(code)) {
        //success
        const result = responseKey ? responseJson[responseKey] : responseJson;
        return {
          [key]: result,
          error: null,
          response,
        };
      }
      showMessage(message);
      return {
        [key]: null,
        error: {
          message,
          code,
          responseJson,
        },
        response,
      };
    } catch (e) {
      let message = "Unhandled Error";
      if (e instanceof Error) {
        message = e.message;
      }
      return {
        [key]: null,
        error: {
          message,
          code: -99,
          responseJson: {},
        },
        response,
      };
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    return this.handleResponse(response, 200, "result");
  }

  async redeemWash({
    CardCode,
    StationId,
    selfValidated,
    TransactionId
  }: Types.RedeemWash): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Cards/RedeemWash`,
      {
        CardCode,
        StationId,
        IsSelfValidatedWash: selfValidated ? "True" : "False",
        TransactionId:TransactionId
      }
    );

    // the typical ways to die when calling an api
    return await this.handleResponse(response, [35, 74], null);
  }

  async redeemEWWash({
    CardCode,
    LocationId,
    LocationIdentifier,
    Latitude,
    Longitude,
  }: Types.RedeemWashEW): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.config.url}/API/AutocareEverWash/Wash/Redeem`,
      {
        CardCode,
        LocationId,
        LocationIdentifier,
        Latitude,
        Longitude,
      }
    );

    return await this.handleResponse(response, undefined, null);
  }

  async getEWToken(): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `${this.config.url}/API/AutocareEverWash/Token/Get`
    );

    return await this.handleResponse(response, undefined, "result");
  }

  async oauthLogin({
    provider,
    clientId,
    code,
    FirstName,
    LastName,
  }: Types.OauthLogin): Promise<any> {
    // make the api call

    console.log({
      AuthorizationToken: code,
      ClientID: clientId,
      FirstName: FirstName,
      LastName: LastName,
    });
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.config.url}/API/AutocareExternalAuthentication/Authenticate/${provider}`,
      {
        AuthorizationToken: code,
        ClientID: clientId,
        FirstName: FirstName,
        LastName: LastName,
      }
    );

    return await this.handleResponse(response, 30, null);
  }

  async emailLogin({ email, password }: Types.UserLogin): Promise<any> {
    try {
      const ApplicationID = await getAppID();
      const platform = RNPlatform.select({ ios: "APNS", android: "FCM" });

      // make the api call
      const response: ApiResponse<any> = await this.apisauce.post(
        `${this.apiUrl}/Users/AuthenticateUser`,
        {
          email,
          password,
          Platform: platform,
          ApplicationID,
        }
      );

      // the typical ways to die when calling an api
      return await this.handleResponse(response, 30, null);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "non-error message";
      console.error("Unable to login: ", msg);
      return {
        error: {
          message: "Unknown Error",
          code: -1,
        },
      };
    }
  }

  async createDealerBundleUser(user: Types.DealerBundleUser): Promise<any> {
    const Platform = RNPlatform.select({ ios: "APNS", android: "FCM" });
    const ApplicationID = await getAppID();
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Users/CreateDealerBundleUser`,
      {
        ...user,
        Platform,
        ApplicationID,
      }
    );
    return this.handleResponse(response, 30, "AuthToken");
  }

  async createUser(user: Types.User): Promise<any> {
    const Platform = RNPlatform.select({ ios: "APNS", android: "FCM" });
    const ApplicationID = await getAppID();
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Users/CreateUser`,
      {
        ...user,
        Platform,
        ApplicationID,
      }
    );
    return this.handleResponse(response, 30, "AuthToken");
  }

  async createPendingWash({
    CardCode,
    StationId,
  }: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Cards/CreatePendingWash`,
      {
        CardCode,
        StationId,
      },
    );
    return this.handleResponse(response, 38, "CreatePendingWash");
  }

  async verifyPendingWash({
    TransactionId,
  }: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Cards/VerifyWashPayment`,
      {
        TransactionId,
      },
    );
    return this.handleResponse(response, 38, "VerifyWashPayment");
  }

  async createPaymentIntent({
    chargeAmount,
    transactionId,
  }: any): Promise<any> {
    const payload = {
      chargeAmount: chargeAmount,
      "metaData": {
        "transactionId": transactionId
      }
    };
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://autocarenetwork.com/API/AutocareStripe/Payments/CreateTransactionPaymentIntent`,
      payload,
    );
    return this.handleResponse(response, 38, "CreateTransactionPaymentIntent");
  }


  async getLocations({
    Latitude,
    Longitude,
    Scope = "Stations",
    Type = "Closest",
    Distance = -1,
    Limit = 15,

    CardCode,

    StationId,
  }: Types.Location): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Locations/Search`,
      {
        Latitude,
        Longitude,
        Scope,
        Type,
        Distance,
        Limit,
        CardCode: CardCode,
        StationId,
      }
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, "Locations");
  }


  async getWashPlans({
    Latitude,
    Longitude,
    Scope = 'Stations',
    Type = 'Closest',
    Distance = -1,
    Limit = 15,
    CardCode = '',
    StationId,
  }: Types.Location): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`https://autocarenetwork.com/API/Autocare/Locations/Search`, {
      Latitude,
      Longitude,
      Scope,
      Type,
      Distance,
      Limit,
      CardCode,
      StationId,
    });

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, 'Locations');
  }

  async getLocationDetails({ StationId }: { StationId: number }): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Locations/Search`,
      {
        Scope: "Stations",
        Type: "Closest",
        Distance: -1,
        StationId,

      }
    );
    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, "Locations");
  }

  async getCards() {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`${this.apiUrl}/Memberships/GetMemberships`);

    // the typical ways to die when calling an api
    return this.handleResponse(response, [38, 77], null, true);
  }

  async sendMessage({
    MessageFormat = "html",
    MessageRecipient = "info@autocarenetwork.com",
    IncludeAuditInfo = false,
    ...message
  }: Types.Message): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Messaging/SendMessage`,
      {
        ...message,
        MessageFormat,
        MessageRecipient,
      }
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, null);
  }

  async fillClaim(card: Types.FillClaim): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/DealerBundle/FileDealerBundleClaim`,
      card
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, null);
  }

  async bookService(service: Types.BookService): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/DealerBundle/BookDealerBundleService`,
      service
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, null);
  }

  async getProfile(noError = false): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `${this.apiUrl}/Users/GetUserProfile`
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, null, noError);
  }

  async getMobileAppButtons(): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `${this.apiUrl}/Users/GetMobileAppButtons`
    );

    // the typical ways to die when calling an api
    return this.handleResponse(response, 38, null, true);
  }

  async updateProfile(user: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `${this.apiUrl}/Users/UpdateUserProfile`,
      user
    );
    return this.handleResponse(response, 38, null);
  }

  async resetBadgeCount(): Promise<any> {
    const response = await this.apisauce.get(
      `${this.apiUrl}/PushNotifications/ResetBadgeCount`
    );
    return this.handleResponse(response, 38, null);
  }

  async registerPushNotifications(pnToken: string): Promise<any> {
    const ApplicationID = await getAppID();
    const response = await this.apisauce.post(
      `${this.apiUrl}/PushNotifications/UpdateToken`,
      {
        ApplicationID,
        Token: pnToken,
        Platform: RNPlatform.select({ ios: "APNS", android: "FCM" }),
      }
    );
    return this.handleResponse(response, 38, null, true);
  }

  async updateSettings(settings: Types.Settings): Promise<any> {
    const ApplicationID = await getAppID();
    const response = await this.apisauce.post(
      `${this.apiUrl}/PushNotifications/UpdateSetting`,
      {
        ApplicationID,
        ...settings,
      }
    );
    return this.handleResponse(response, 38, "Settings");
  }
  async getPushNotificationsSettings(notifToken: string): Promise<any> {
    const response = await this.apisauce.post(
      `${this.apiUrl}/PushNotifications/GetSettings`,
      {
        ApplicationID: notifToken,
      }
    );
    return this.handleResponse(response, 38, null);
  }
  async getBranding(): Promise<any> {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Dealers/GetBranding`
    );
    return this.handleResponse(response, undefined, null, true);
  }

  async getTerms(): Promise<any> {
    const response = await this.apisauce.get(`${this.apiUrl}/Users/GetTerms`);
    return this.handleResponse(response, undefined, null, true);
  }
  async acceptTerms(): Promise<any> {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Users/AcceptTerms`
    );
    return this.handleResponse(response, undefined, null);
  }
  async updateMileage(data: Types.Mileage): Promise<any> {
    let response = null;
    response = await this.apisauce.post(
      `${this.apiUrl}/Users/UpdateMembershipMileage`,
      {
        MemberNumber: data.Code,
        Mileage: data.Mileage,
      }
    );

    return this.handleResponse(response, undefined, null);
  }
  async deleteAccount(): Promise<any> {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Users/DeleteAccount`
    );
    return this.handleResponse(response, undefined, null);
  }
  async fetchEndpoint(endpoint: string): Promise<any> {
    const response = await this.apisauce.get(endpoint);
    return this.handleResponse(response, undefined, null);
  }
  async getTransactions(CardCode: string, noError = false): Promise<any> {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Cards/GetTransactions`,
      { CardCode }
    );
    return this.handleResponse(response, 0, "LastRedemptions", noError);
  }

  async linkCard(MembershipNumber: string): Promise<any> {
    const response = await this.apisauce.post(`${this.apiUrl}/Cards/LinkCard`, {
      MemberNumber: `${MembershipNumber}`,
    });

    return this.handleResponse(response, 40, "data");
  }
  async unlinkCard(MembershipNumber: string): Promise<any> {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Cards/UnlinkMembership`,
      {
        MemberNumber: `${MembershipNumber}`,
      }
    );
    return this.handleResponse(response, 40, null);
  }
  async changePassword(data: Types.ChangePassword): Promise<any> {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Users/ChangePassword`,
      data
    );
    return this.handleResponse(response, 38, null);
  }
  async validateVN(data: Types.ValidateVN): Promise<any> {
    if (data.VehicleIdNumber.length !== 17) {
      throw new Error("VIN Number must be 17 characters long");
    }
    const response = await this.apisauce.post(
      `${this.apiUrl}/Cards/ValidateVin`,
      data
    );
    return this.handleResponse(response, [1, 2], "VehicleInfo");
  }
  async updateVehicleInfo(data: Types.UpdateVehicleInfo): Promise<any> {
    if ((data.VehicleIdNumber ?? "").length !== 17) {
      throw new Error("Trying to save invalid VIN");
    }
    const response = await this.apisauce.post(
      `${this.apiUrl}/Users/UpdateMembershipVehicleInfo`,
      data
    );
    return this.handleResponse(response, 0, null);
  }
  async updateVehicleVinNumber(data: IAddVinNumberToVehicle): Promise<any> {
    if ((data.VehicleIdNumber ?? "").length !== 17) {
      throw new Error("Trying to save invalid VIN");
    }
    const response = await this.apisauce.post(
      `${this.apiUrl}/Users/UpdateMembershipVehicleInfo`,
      data
    );
    return this.handleResponse(response, 0, null);
  }

  forgotPassword() {
    return this.config.url + "/Account-Login/ctl/SendPassword";
  }

  // Merchant Endpoints
  async validateWash({ CardCode, StationId, manualEntry }: Types.ValidateWash) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Cards/ValidateWash`,
      {
        CardCode,
        StationId,
        RedemptionInfo: manualEntry
          ? "AutocareMerchantAppKeyed"
          : "AutocareMerchantAppQrScan",
      }
    );
    return this.handleResponse(response, 35, null);
  }

  async getStations() {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Stations/GetStations`
    );
    return this.handleResponse(response, 38, "Stations");
  }

  async getMerchantTransactions(data: Types.MerchantTransactions) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Transactions/GetTransactions`,
      data
    );
    return this.handleResponse(response, 38, "Transactions");
  }
  async allowSelfOnboarding() {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Stations/AllowSelfOnboarding`
    );
    return this.handleResponse(response, 38, null);
  }
  async getStationOnboardingOptions() {
    const response = await this.apisauce.get(
      `${this.apiUrl}/Stations/GetStationOnboardingOptions`
    );
    return this.handleResponse(response, 38, null);
  }
  async createStation(station: Types.Station) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Stations/CreateStation`,
      station
    );
    return this.handleResponse(response, 42, null);
  }
  async updateStation(station: Types.Station) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Stations/UpdateStation`,
      station
    );
    return this.handleResponse(response, 38, null);
  }
  async activateStation(StationId: Types.Station["StationId"]) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Stations/ActivateStation`,
      { StationId }
    );
    return this.handleResponse(response, 38, null);
  }

  async getStationInfo(StationId: string) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/Stations/GetStationInfo`,
      { StationId }
    );
    return this.handleResponse(response, 38, null);
  }

  async deleteNotificationRegistration(token: string) {
    const response = await this.apisauce.post(
      `${this.apiUrl}/PushNotifications/DeleteRegistration`,
      {
        ApplicationID: token,
      }
    );
    return this.handleResponse(response, 38, null);
  }

  async getW9(fileToken: string) {
    const toFile = `${RNFS.DocumentDirectoryPath}/w9.pdf`;
    const res = await RNFS.downloadFile({
      fromUrl: `${this.apiUrl}/Files/GetFile?filetoken=${fileToken}`,
      toFile,
      headers: {
        AppToken: this.token,
      },
    }).promise;

    return res.statusCode === 200 ? toFile : null;
  }
}
