import { Location } from "../../shared/global-types";
import { Card } from "./services/api";

export interface IStationProduct {
  StationServiceId: number;
  StationServiceName: string;
  StationServiceDescription: string;
  StationServicePrice: number;
}

export enum PinColors {
  red = "#FB3C33",
  blue = "#00BCFF",
}

export interface ILastRedemption {
  station: Location;
  card: Card;
}

export interface IRecentWash {
  CardCode: string;
  DateTime: string;
  StationId: number;
  Station: string;
  Location: Location;
}

export interface IAddVinNumberToVehicle {
  MemberNumber: string;
  VehicleIdNumber: string;
}

export enum IRequestStatus {
  Idle = "Idle",
  Pending = "Pending",
  Success = "Success",
  Error = "Error",
}

export enum ICardStatus {
  Active = "Active",
  Expired = "Expired",
  Redeemed = "Redeemed",
}
export enum ICardType {
  Member = "MEMBER",
  Service = "SERVICE",
}
export interface ICard extends Card {
  PlanType: ICardType;
}

export enum RedemptionType {
  CardCode = "CardCode",
  QrCode = "QrCode",
  BarCode39 = "BarCode39",
  BarCode128 = "BarCode128",
  Barcode = "Barcode",
  Alphanumeric = "Alphanumeric",
  SelfValidation = "SelfValidation",
}

export enum BarCodeType {
  "BarCode39" = "CODE39",
  "BarCode128" = "CODE128",
  "Barcode" = "CODE39",
}

export interface IRedemption {
  BarCodeInfo: {
    BarcoderData: string | null;
    BarCodeDisplay: string | null;
    BarCodeFormat: "BarCode128" | "BarCode39" | null;
  };
  RedemptionType: RedemptionType;
  RedemptionCode: string;
  RedmptionInstructions: string;
  ResponseCode: number;
  ResponseMessage: string;
  ShowWashComplete: boolean;
  RedemptionToken: string;
}

export interface IRedemptionPayload {
  CardCode: string;
  StationId: number;
  selfValidated: boolean;
}

export enum IRedeemType {
  VOUCHER = "VOUCHER",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum IRedeemStep {
  STEP_1 = "Redeem Type",
  STEP_2 = "No Location",
}
