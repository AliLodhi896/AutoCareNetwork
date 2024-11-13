import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import storage, {
  AppStateMerchantProps,
} from "../../../shared/services/storage";
import { navigate } from "../navigators";
import { Api, storeName } from "../services/api";

export interface AppStateContextProps {
  appState: AppStateMerchantProps;
  setAppState: (data: AppStateMerchantProps) => void;
  initializeApp: () => Promise<AppStateMerchantProps>;
}

const AppStateContextDefault: AppStateContextProps = {
  appState: {
    owner: "",
    email: "",
    price: "",
    exterior: "",
    full_service: "",
    body_gloss: "",
    pos: "",
    manager: "",
    front_desk_cell: [],
    lastFeedbackTime: null,
    feedbackRating: null,
    hasSubmittedW9: false,
    transactions: null,
    stations: [],
    selectedStation: null,
  },
  setAppState: () => null,
  initializeApp: () => null,
};

interface Props {
  children: ReactNode;
  client: Api;
}

export const AppStateContext = React.createContext(AppStateContextDefault);

const { Provider } = AppStateContext;

export const useAppState = () => {
  const state = useContext(AppStateContext);
  return state;
};

export const AppStateContextProvider = ({ children, client }: Props) => {
  const [appState, setState] = useState<AppStateMerchantProps>({});
  const uniqueStoreName = useRef("")
  const setAppState = async (data: AppStateMerchantProps) => {
    const state = { ...appState, ...data };
    setState(state);
    await storage.setItem(uniqueStoreName.current, state);
  };

  const updateStore = async (client: Api) => {
    try {
      
      const data = (await storage.getItem(uniqueStoreName.current)) ?? {};

      /* get all the updated data from server to update the store */
      if(client?.authToken){
      const [stationResult] = await Promise.all([
        client.getStations(),
      ]);
      if (!stationResult.error) {
        const stations = stationResult.Stations;
        if(data?.selectedStation) {
          const selectedStation = stations.find(
            station => station.StationId === selectedStation?.StationId,
          );
          await storage.setItem(uniqueStoreName.current, { selectedStation: selectedStation });
        }else{
          if (stations?.length === 1) {
            await storage.setItem(uniqueStoreName.current, { selectedStation: stations[0] });
          } else {
            navigate('loginSelectStation');
          }
        }
      }
    }

    } catch (e) {
      console.error(e);
    }
  };

  const initializeApp = async (client: Api) => {
        try {

          const authData = (await storage.getItem(storeName)) ?? {};

          if(authData && authData.profile && authData.profile.Email){
            uniqueStoreName.current = `merchant-${authData.profile.Email}`
            await updateStore(client);
            const data = (await storage.getItem(uniqueStoreName.current)) ?? {};
            setState({ ...appState, ...data });
            return { ...appState, ...data };
          }
      
          return { ...appState };
        } catch (e) {
          console.error(e);
        }
    };


  useEffect(() => {
    if(client.token)
      initializeApp(client);
  }, [client?.authToken]);

  return (
    <Provider
      value={{
        appState,
        setAppState,
        initializeApp: () => initializeApp(client),
      }}
    >
      {children}
    </Provider>
  );
};
