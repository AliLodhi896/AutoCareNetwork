import React, { ReactNode, useContext, useEffect, useState } from "react";
import storage, { AuthStateProps } from "../services/storage";
import { Api, storeName } from "../services/api";

export interface AuthStateContextProps {
  authState: AuthStateProps;
  setAuthState: (data?: AuthStateProps) => void;
  initializeAuth: () => Promise<AuthStateProps>;
}

const AuthStateContextDefault: AuthStateContextProps = {
  authState: {
    token: "",
    profile: null,
    isLoggedIn: false,
    isNewUser: false,
    isLoading: false,
    termsPrompt: false,
    notificationToken: "",
    requiredFields: [],
    shownEntitlementPrompt: null,
  },
  setAuthState: () => null,
  initializeAuth: () => null,
};

interface Props {
  children: ReactNode;
  client: Api;
}

export const AuthStateContext = React.createContext(AuthStateContextDefault);

const { Provider } = AuthStateContext;

export const useAuthState = () => {
  const state = useContext(AuthStateContext);
  return state;
};

export const AuthStateContextProvider = ({ children, client }: Props) => {
  const [authState, setState] = useState<AuthStateProps>({
    token: undefined,
    profile: null,
    currentRoute: "",
  });

  const setAuthState = (data?: AuthStateProps) => {
    const state = { ...authState, ...data };
    setState(state);
    storage.setItem(storeName, state);
  };

  const updateStore = async () => {
    try {
      if (!client.authToken) {
        const data: AuthStateProps = await storage.getItem(storeName);
        client.setToken(data?.token);
      }
      /* update the profile */
      const profileResult = await client.getProfile(true);
      // if (!profileResult.error) {
      await storage.setItem(storeName, { profile: profileResult.result });
      // }
    } catch (e) {
      console.error(e);
    }
  };
  const updateProfile = async () => {
    try {
      if (!client.authToken) {
        const data = await storage.getItem(storeName);
        client.setToken(data?.token);
      }
      // Update the profile
      const profileResult = await client.getProfile(true);
      await storage.setItem(storeName, { profile: profileResult.result });
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   // Define an async function to call updateProfile three times
  //   const runProfileUpdates = async () => {
  //     for (let i = 0; i < 3; i++) {
  //       await updateProfile();
  //     }
  //   };

  //   // Call the async function
  //   runProfileUpdates();
  // }, []);
  const initializeAuth = async () => {
    try {
      await updateStore();
      await updateProfile()
      const data = (await storage.getItem(storeName)) ?? {};
      if (authState.token === undefined) {
        if (data.token) {
          setAuthState({ ...authState, ...data });
        } else {
          setAuthState({ ...authState, token: "" });
        }
      }
      return { ...authState, ...data };
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        initializeAuth,
      }}
    >
      {children}
    </Provider>
  );
};
