import { GeneralApiProblem } from "./api-problem";
import { VehicleInfo } from "../../global-types";

export interface User {
  CardCode: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  ZipCode: string;
  Password: string;
}

type RequestResult<key extends string, T> =
  | Record<"kind" | key, T | "ok">
  | GeneralApiProblem;
export interface RedeemWash {
  CardCode: string;
  StationId: number;
  TransactionId:number;
  selfValidated: boolean;
}

export interface RedeemWashEW {
  CardCode: string;
  LocationId: number;
  LocationIdentifier: string;
  Latitude?: number;
  Longitude?: number;
}

export interface OauthLogin {
  provider: string;
  clientId?: string;
  code: string;

  FirstName?: string | null;
  LastName?: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface DealerBundleUser {
  MemberNumber: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  ZipCode: string;
  Password: string;
}

export interface Location {
  Latitude: number;
  Longitude: number;
  Scope?: string;
  Type?: string;
  Distance?: number;
  Limit?: number;
  CardCode?: string;
  StationId?: number;
}

export interface FillClaim {
  /**
   * The card code to fill either Card.CardCode or Card.DealerBundleMemberNumber
   */
  MemberNumber: string;
  /**
   * this field is taken from product.DealerProductId
   */
  DealerProductID: string;
  ClaimInfo: string;
  Override?: boolean;
}

export interface Settings {
  SettingName: string;
  Value: "True" | "False";
}

export interface Mileage {
  Code: string;
  Mileage: number;
}
export interface UpdateVehicleInfo {
  MemberNumber: string;
  VehicleYear: number;
  VehicleMake: string;
  VehicleModel: string;
  VehicleColorId?: number | undefined;
  VehicleColor?: string | undefined;
  LicensePlateNumber: string;
  LicensePlateState: string;
  VehicleIdNumber?: string | null;
}

export interface ChangePassword {
  NewPassword: string;
  ConfirmNewPassword: string;
}

export interface BookService extends Omit<FillClaim, "ClaimInfo"> {
  ServiceRequestInfo: string;
}

export interface ValidateVN {
  VehicleIdNumber: string;
  VehicleColorId: number;
}

export interface Message {
  MessageRecipient?: string;
  MessageSubject?: string;
  IncludeAuditInfo?: boolean;
  MessageBody: string;
  MessageFormat?: string;
}

export type RedeemWashResult = RequestResult<"wash", any>;
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem;
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem;

export type GetCharactersResult =
  | { kind: "ok"; characters: any[] }
  | GeneralApiProblem;
export type GetCharacterResult =
  | { kind: "ok"; character: any }
  | GeneralApiProblem;

export type Profile = {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  ZipCode?: string;
  Password?: string;
  AcceptTerms?: boolean;
  CollectVehicleInfo?: string[];
  ReportMileage?: string[];
  hasSubmittedW9?: boolean;
};

export type Redemption = {
  date?: string;
  response?: any;
  station?: Location;
  card?: Card;
  email?: string;
};

export type Product = {
  ContractNumber?: string;
  ExpirationDate?: string;
  DealerProductId?: number;
  BookServiceLink?: string | null;
  FileClaimLink?: string | null;
  Actions?: string[];
  PhoneNumber?: string;
  ProductDescription?: string;
  ProductName?: string;
};

export type ColorOption = {
  ColorId: number;
  ColorName: string;
};

export type CustomButtonType = {
  BackgroundColor?: string | null;
  BackgroundImageUrl?: string | null;
  ButtonSettings: {
    DealerIds?: number[];
    BookServiceButton: boolean;
    ExternalLink: boolean;
    Type: "ManufacturerLogo" | "Link" | "DealerProductPromo";
    Url: string;
    UseInfoBox: boolean;
  };
  ForegroundColor: string | null;
  Id: number;
  Text: string | null;
};
export type DealerButtonPromo = CustomButtonType & {
  BackgroundImageUrl: string | null;
  ButtonSettings: {
    BodyImagePosition: "Top" | "Right" | "Bottom" | "Left";
    BodyImageUrl: string;
    BodyText: string;
    FooterCTA: string;
    Title: string;
  };
};
export type Card = {
  BookServiceUrl: string | null;
  CanWashToday: boolean;
  CardCode: string;
  DealerBundleMemberNumber: string;
  CardDescription: string;
  CardType: string;
  CustomButtons?: CustomButtonType[];
  DealerLogoUrl: string;
  DealerName: string;
  Entitlements: any;
  ExpirationDate: string;
  PlanTerm: string | null;
  QRCodeUrl: string;
  ValidDate: string;
  WashesAvailable: number;
  Products: Product[];
  DealerId: number;
  DealerWebSite: string;
  DealerAddress: string;
  DealerPhone: string;
  DealerCity: string;
  DealerState: string;
  DealerZip: string;
  CardStatus: "Active" | "Inactive" | "Expired" | "Redeemed";
  VehicleInfo?: VehicleInfo;
  LastRedemption: string | null;
};
export type Branding = {
  DealerLogoUrl: string;
  DealerIconUrl: string;
  IconPosition: string;
};

export interface ValidateWash {
  CardCode: string;
  StationId: string;
  ShowIcon?: boolean;
  manualEntry: boolean;
}
export interface MerchantTransactions {
  DateRange: string;
  CustomStartDate: string;
  CustomEndDate: string;
}

export interface Station {
  StationName: string;
  StationId: string;
  IsManager: boolean;
  RequiresActivation: boolean;
  IsZepQualified: boolean;
  ZepQualificationInfo: string | null;
  ZepQualifiedLogo: string | null;
  W9: string | null;
}

export type Transaction = {
  CardCode: string;
  DateTime: string;
  DealerId: number;
  DealerName: string;
  EntitledServices: any[];
  IsSelfValidatedWash: boolean;
  LicensePlate: string;
  ServiceLevel: string;
  StationId: number;
  StationName: string;
  TransactionId: number;
  VehicleInfo: VehicleInfo;
};
