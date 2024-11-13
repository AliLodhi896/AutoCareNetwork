import { IStationProduct } from "../../member/app/washub-types";

export interface Location {
  LocationName: string;
  LocationAddress: string;
  LocationCity: string;
  LocationState: string;
  LocationZip: string;
  LocationPhone: string;
  LocationGooglePlacesId: string;
  LocationLatitude: string;
  LocationLongitude: string;
  LocationDistance: string;
  LocationId: number;
  LocationSubId: string;
  AppOnly: string;
  AllowsSelfValidation: boolean;
  ServiceLevel: string;
  AdditionalServices: [AdditionalService];
  StationServices: any,
  WashUpcharge:any
}

export interface PushSetting {
  DataType: string;
  SettingInfo: string;
  SettingName: string;
  Value: string;
}

export interface AdditionalService {
  CustomerCost: number;
  IsAvailableForSale: boolean;
  IsIncludedWithAutocarePlan: boolean;
  ServiceBrand: string;
  ServiceClass: string;
  ServiceClassDescription: string;
  ServiceDescription: string;
  ServiceId: number;
  ServiceLogo: string;
  ServiceName: string;
}

export interface Product {
  ContractNumber: string;
  ExpirationDate: string;
  DealerProductId: number;
  BookServiceLink: string | null;
  FileClaimLink: string | null;
  Actions: string[];
  PhoneNumber: string;
  ProductDescription: string;
  ProductName: string;
}

export interface Branding {
  DealerLogoUrl: string;
  DealerIconUrl: string;
  IconPosition: string;
}

export interface ColorOption {
  ColorId: number;
  ColorName: string;
}

export interface VehicleInfo {
  Color: string;
  ColorId: number;
  ColorOptions: ColorOption[];
  LicensePlateNumber: string;
  LicensePlateState: string;
  VehicleId: number;
  VehicleIdNumber: string;
  Make: string;
  Model: string;
  Year: number;
  PhotoUrl: string;
  VehiclePhotoExists: boolean;
  VinValidated: boolean;
}

export interface CardButton {
  Id: number;
  Text: string;
  ForegroundColor: string;
  BackgroundColor: string;
  BackgroundImageUrl: string;
  LinkUrl: string;
  CustomerPromptTitle: string;
  CustomerPromptMessage: string;
}

export interface Card {
  BookServiceLink: string | null;
  CanWashToday: boolean;
  CardCode: number;
  DealerBundleMemberNumber?: string;
  CardDescription: string;
  CardType: string;
  DealerLogoUrl: string;
  DealerName: string;
  Entitlements: any;
  ExpirationDate: string;
  PlanTerm: string | null;
  QRCodeUrl: string;
  ValidDate: string;
  WashesAvailable: number;
  Products: Product[];
  DealerWebSite: string;
  DealerAddress: string;
  DealerPhone: string;
  DealerCity: string;
  DealerState: string;
  DealerZip: string;
  CardStatus: "Active" | "Inactive" | "Expired";
  VehicleInfo?: VehicleInfo;
  LastRedemption: string | null;
  CustomButtons: Array<CardButton>;
  AcceptTerms: boolean;
  PasswordChangeRequired: boolean;
  ReportMileage: Array<any>;
  ReportMembershipMileage: Array<any>;
  CollectVehicleInfo: Array<any>;
  CollectMembershipVehicleInfo: Array<any>;
  PendingWashes: Array<any>;
  PromptCardForSearch: boolean;
  ResponseCode: number;
  ResponseMessage: string;
}

export interface ValidationResponse {
  RedemptionType: string;
  RedemptionCode: string;
  RedmptionInstructions: string;
  ResponseCode: number;
  ResponseMessage: string;
  ResponseHtmlMessage: string;
  ShowWashComplete: boolean;
  RedemptionToken: string;
}

export interface Profile {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  ZipCode?: string;
  Password?: string;
  AcceptTerms: boolean;
  CollectVehicleInfo: string[];
  ReportMileage: string[];
}

type Redemption = null | {
  date: string;
  response: any;
  station: Location;
  card: Card;
  email: string;
};

type Notification = any;
