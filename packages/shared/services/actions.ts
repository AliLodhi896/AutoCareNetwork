import { AuthStateContextProps } from "../contexts/auth-state-context";
import { Api } from "./api";
import { AppStateProps } from "./storage";

export interface AppStateContextProps {
  appState: AppStateProps;
  setAppState: (data: AppStateProps) => void;
  initializeApp: () => Promise<AppStateProps>;
}

export const logout = (
  stateContext: AppStateContextProps,
  authContext: AuthStateContextProps,
  api: Api
) => {
  const { setAppState } = stateContext;
  const { setAuthState } = authContext;

  setAuthState({
    token: "",
    profile: null,
    isLoggedIn: false,
    isNewUser: false,
    isLoading: false,
    termsPrompt: false,
    notificationToken: "",
    requiredFields: [],
    shownEntitlementPrompt: null,
  });
  setAppState({
    isLoading: false,
  });
  api.setToken("");
};
