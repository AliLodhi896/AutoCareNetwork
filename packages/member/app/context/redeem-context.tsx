import React, { ReactNode, useContext, useEffect, useState } from "react";

export enum IRedeemStep {
  STEP_1 = "Redeem Type",
  STEP_2 = "No Location",
  STEP_3 = "At Location",
}

interface IRedeemState {
  step: IRedeemStep;
  showBack: boolean;
  locationDisabled: boolean;
}

interface IRedeemFlowContext {
  redeemState: IRedeemState;
  setRedeemState: (value: Partial<IRedeemState>) => void;
  nextStep: () => void;
}

export const RedeemFlowContextDefault: IRedeemFlowContext = {
  redeemState: {
    step: IRedeemStep.STEP_1,
    showBack: true,
    locationDisabled: true,
  },
  setRedeemState: () => null,
  nextStep: () => null,
};

interface Props {
  children: ReactNode;
}

export const RedeemFlowContext = React.createContext(RedeemFlowContextDefault);

const { Provider } = RedeemFlowContext;

export const useRedeemFlow = () => {
  const redeemFlow = useContext(RedeemFlowContext);
  return redeemFlow;
};

export const RdeemFlowContextProvider = ({ children }: Props) => {
  const [redeemState, setRedeemFlow] = useState<IRedeemState>(
    RedeemFlowContextDefault.redeemState
  );

  const setRedeemState = (data: Partial<IRedeemState>) => {
    const state = { ...redeemState, ...data };
    if (state.step === IRedeemStep.STEP_3) {
      state.showBack = false;
    }
    setRedeemFlow(state);
  };

  const nextStep = (): void => {
    let step = IRedeemStep.STEP_1;

    const currentStep = redeemState.step;

    switch (currentStep) {
      case IRedeemStep.STEP_1:
        step = redeemState.locationDisabled
          ? IRedeemStep.STEP_2
          : IRedeemStep.STEP_3;
        break;
      case IRedeemStep.STEP_2:
        step = IRedeemStep.STEP_3;
        break;
    }

    setRedeemState({ step });
  };

  return (
    <Provider value={{ redeemState, setRedeemState, nextStep }}>
      {children}
    </Provider>
  );
};
