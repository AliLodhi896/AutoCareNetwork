import { IRedemption, IRequestStatus } from "../../../washub-types";

export enum IStatus {
  Request = "Request",
  Success = "Success",
  Error = "Error",
}

type IRedemptionAction =
  | { type: IStatus.Request }
  | { type: IStatus.Success; result: IRedemption }
  | { type: IStatus.Error; error: string };

interface IRedemptionState {
  data?: IRedemption;
  error?: string;
  reqStatus: IRequestStatus;
}

export const initialState: IRedemptionState = {
  data: undefined,
  error: undefined,
  reqStatus: IRequestStatus.Idle,
};

export default function redemptionReducer(
  state: IRedemptionState,
  action: IRedemptionAction
): IRedemptionState {
  const { type } = action;

  switch (type) {
    case IStatus.Request:
      return { ...state, ...{ reqStatus: IRequestStatus.Pending } };
    case IStatus.Success:
      return {
        data: action.result,
        reqStatus: IRequestStatus.Success,
      };
    case IStatus.Error:
      return {
        ...state,
        ...{ reqStatus: IRequestStatus.Error, error: action.error },
      };
    default:
      throw Error("Unknown action: " + type);
  }
}
