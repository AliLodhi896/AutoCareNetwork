export type PushSetting = {
  DataType?: string;
  SettingInfo?: string;
  SettingName?: string;
  Value?: string;
};

export type Station = {
  StationName?: string;
  StationId?: string;
  IsManager?: boolean;
  RequiresActivation?: boolean;
  IsZepQualified?: boolean;
  ZepQualificationInfo?: string | null;
  ZepQualifiedLogo?: string | null;
  W9?: string | null;
};

export type StationServiceTypeOptions = {
  StationServiceId?: number;
  StationServiceName?: string;
};

export type StationServiceType = {
  StationServiceClassId?: number;
  StationServiceClassName?: string;
  StationServiceTypeOptions?: StationServiceTypeOptions[];
};

export type StationServicePricing = {
  StationServiceId?: number;
  StationServicePrice?: number;
};

export type ZepRep = {
  ZepRepId?: number;
  ZepRepName?: string;
};

export type StationInfo = {
  StationAddress?: string;
  StationID?: string;
  StationCWManager?: string;
  StationCity?: string;
  StationExteriorOnlyWashPrice?: string;
  StationFullServiceWashPrice?: string;
  StationName?: string;
  StationOwnerEmail?: string;
  ConfirmStationOwnerEmail?: string
  StationOwnerFirstName?: string;
  StationOwnerLastName?: string;
  StationOwnerMobilePhone?: string;
  StationPhone?: string;
  StationServiceLevel?: string;
  StationServiceTypes?: StationServiceType[];
  StationServicesPricing?: StationServicePricing[];
  StationState?: string;
  StationZip?: string;
  ZepRepId?: string;
  ZepReps?: ZepRep[];
};

export type StationOnboardingOptions = {
  StationServiceTypes?: StationServiceType[];
  ZepReps?: ZepRep[];
};

export type ColorOption = {
  ColorId?: number;
  ColorName?: string;
};

export type VehicleInfo = {
  Color?: string;
  ColorId?: number | null;
  ColorOptions?: ColorOption[];
  LicensePlateNumber?: string;
  LicensePlateState?: string;
  VehicleIdNumber?: string;
  Make?: string;
  Model?: string;
  Year?: string;
  PhotoUrl?: string;
};

export type Transaction = {
  CardCode?: string;
  DateTime?: string;
  DealerId?: number;
  DealerName?: string;
  EntitledServices?: any[];
  IsSelfValidatedWash?: boolean;
  LicensePlate?: string;
  ServiceLevel?: string;
  StationId?: number;
  StationName?: string;
  TransactionId?: number;
  VehicleInfo?: VehicleInfo;
};
