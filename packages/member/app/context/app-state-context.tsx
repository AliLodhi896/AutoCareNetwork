import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppStateContextProps } from "../../../shared/services/actions";
import storage, {
  AppStateProps,
  AuthStateProps,
} from "../../../shared/services/storage";
import { Api, Card, storeName } from "../services/api";
import { Location } from "../../../shared/global-types";
import { ICardStatus, IRecentWash } from "../washub-types";
import { Alert, AppState } from "react-native";
import analytics from '@react-native-firebase/analytics';

const AppStateContextDefault: AppStateContextProps = {
  appState: {
    recentWashes: [],
    cards: [],
    selectedCard: null,
    registeredCard: null,
    mobileAppButtons: [],
    mobileAppButtons2: [],
    hasSavedVehicleInfo: false,
    name: "",
    isLoading: false,
    favoriteLocations: [],
    lastRedemption: null,
    lastRedemptionHistory: null,
    activeRedemption: null,
    branding: null,
    feedbackRating: null,
    hasCompletedCopyTutorial: false,
    notifications: [],
    saved_notifications: [],
    noActiveCards: false,
    mileageSaved: 0,
    toggleFavorite(): void { },
    togglePrimaryCard(): void { },
    primaryCard: null,
    reInit(): void { },
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
  const appCurrentState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(
    appCurrentState.current
  );

  const [appState, setState] = useState<AppStateProps>(
    AppStateContextDefault.appState
  );
  const uniqueStoreName = useRef("");
  const setAppState = (data: Partial<AppStateProps>) => {
    const state = { ...appState, ...data };
    setState(state);
    storage.setItem(uniqueStoreName.current, state);
  };

  const getLastRedemptionHistory = async (client: Api, cards: Card[]) => {
    const activeCards = cards.filter(
      (c) => c.CardStatus === ICardStatus.Active
    );

    //Get last redemption for each card
    const transactions = await Promise.all(
      cards.map((card) => client.getTransactions(card.CardCode, true))
    );

    //Parse all last redemptions
    const allTransactions = [];
    transactions.forEach((t) => {
      if (t.LastRedemptions?.length > 0) {
        t.LastRedemptions.forEach((r) => {
          if (
            !allTransactions.find(
              (t) => t.StationId === r.StationId && t.CardCode === r.CardCode
            )
          ) {
            allTransactions.push(r);
          }
        });
      }
    });

    const uniqueStationsIds = [];
    allTransactions.forEach((t) => {
      if (!uniqueStationsIds.includes(t.StationId)) {
        uniqueStationsIds.push(t.StationId);
      }
    });

    //Get stations details
    const stations = await Promise.all(
      uniqueStationsIds.map((id) =>
        client.getLocationDetails({ StationId: id })
      )
    );

    //Add station details to each transaction
    const recentWashes: IRecentWash[] = [];
    allTransactions.forEach((t) => {
      const station = stations.find((s) => {
        if (
          s.Locations.length > 0 &&
          s.Locations[0].LocationId === t.StationId
        ) {
          return s;
        }
      });
      if (station) {
        recentWashes.push({
          ...t,
          Location: station.Locations[0],
        });
      }
    });

    return recentWashes;
  };

  const updateProfile = async () => {
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


  const updateStore = async (client: Api) => {
    try {
      if (!client.authToken) {
        const data: AuthStateProps = await storage.getItem(storeName);
        client.setToken(data?.token);
      }

      if (uniqueStoreName.current) {
        // Get the existing state to preserve registeredCard and mobileAppButtons
        const currentState = await storage.getItem(uniqueStoreName.current);
        const existingRegisteredCard = currentState?.registeredCard;
        const existingMobileAppButtons = currentState?.mobileAppButtons2;

        /* get all the updated data from server to update the store */
        const [
          cardResult,
          brandingResult,
          mobileButtonsResult,
        ] = await Promise.all([
          client.getCards(),
          client.getBranding(),
          client.getMobileAppButtons(),
        ]);

        if (!cardResult.error) {
          const res = cardResult.result;
          const cards = res.Cards ?? [];
          const recentWashes = await getLastRedemptionHistory(client, cards);

          const { primaryCard } = await storage.getItem(uniqueStoreName.current);
          if (primaryCard) {
            const index = cards.findIndex((c) => c.CardCode === primaryCard.CardCode);
            if (index !== -1) {
              cards.splice(0, 0, cards.splice(index, 1)[0]);
            }
          }

          await storage.setItem(uniqueStoreName.current, {
            cards: cards || [],
            recentWashes: recentWashes,
            selectedCard: cards?.find((c) => c.CardStatus === ICardStatus.Active) ?? null,
          });

          // Update registeredCard only if it's null, otherwise keep the existing one
          if (!existingRegisteredCard) {
            await storage.setItem(uniqueStoreName.current, {
              registeredCard: cards?.find((c) => c.CardStatus === ICardStatus.Active) ?? null,
            });
          }

        }

        if (!brandingResult.error) {
          await storage.setItem(uniqueStoreName.current, {
            branding: brandingResult.result,
          });
        }

        if (mobileButtonsResult.response.status === 200) {
          // Update mobileAppButtons only if they are null or empty
          await storage.setItem(uniqueStoreName.current, {
            mobileAppButtons: mobileButtonsResult.response.data.Buttons ?? [],
          });
        }

        if (mobileButtonsResult.response.status === 200) {
          // Update mobileAppButtons only if they are null or empty
          if (existingMobileAppButtons?.length === 0 || existingMobileAppButtons == undefined) {
            await storage.setItem(uniqueStoreName.current, {
              mobileAppButtons2: mobileButtonsResult.response.data.Buttons ?? [],
            });
          }
        }

      }
    } catch (e) {
      console.error(e);
    }
  };


  const initializeApp = async (client: Api) => {
    try {
      setState({
        ...appState,
        isLoading: true,
      });
      const authData = (await storage.getItem(storeName)) ?? {};
      if (authData && authData.profile && authData.profile.Email && authData.profile.FirstName) {
        uniqueStoreName.current = `member-${authData.profile.Email}`;
        await updateProfile()

        await updateStore(client);
        let data = (await storage.getItem(uniqueStoreName.current)) ?? {};
        data.isLoading = false;

        setState({ ...appState, ...data });
        return { ...appState, ...data };
      } else {
        await updateProfile()
      }
      setState({
        ...appState,
        isLoading: false,
      });
      return { ...appState };
    } catch (e) {
      setState({ ...appState, isLoading: false });
      console.error(e);
    }
  };

  const reInit = async () => {
    await initializeApp(client);
  };

  const toggleFavorite = async (location: Location) => {
    let wasRemoved = false;
    const setOfFavorites = new Set(appState.favoriteLocations);
    setOfFavorites.forEach((loc) => {
      if (loc.LocationId === location.LocationId) {
        setOfFavorites.delete(loc);
        wasRemoved = true;
        return;
      }
    });
    if (!wasRemoved) {
      setOfFavorites.add(location);
    }
    setAppState({ favoriteLocations: [...setOfFavorites] });
    await analytics().logEvent('add_to_wishlist', {
      item_list_id: 'wash_details',
      item_list_name: 'Wash Details',
      item_brand: location?.LocationName,
      item_name: location?.ServiceLevel,
      item_id: location?.LocationId,
      item_category: 'car wash',
      item_category2: 'Premium Only',
      location_id: location?.LocationGooglePlacesId,
      affiliation: '*Pitch Deck - 222560201',
    });

  };
  const togglePrimaryCard = async (card: Card) => {
    const allCards = appState.cards;
    const index = allCards.findIndex((c) => c.CardCode === card.CardCode);
    allCards.splice(0, 0, allCards.splice(index, 1)[0]);
    setAppState({ primaryCard: card, selectedCard: card, cards: allCards });
  };

  useEffect(() => {
    updateProfile()
    initializeApp(client);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (
          appCurrentState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          //TODO: this was suppressed because it was causing a bug on the app
          //await initializeApp(client);
          // console.log("Refresh app Data", cards, uniqueStoreName.current);
        }

        appCurrentState.current = nextAppState;
        setAppStateVisible(appCurrentState.current);

        // console.log("AppState", appCurrentState.current);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider
      value={{
        appState: {
          ...appState,
          toggleFavorite,
          togglePrimaryCard: togglePrimaryCard,
          reInit,
        },
        setAppState,
        initializeApp: () => initializeApp(client),
      }}
    >
      {children}
    </Provider>
  );
};
