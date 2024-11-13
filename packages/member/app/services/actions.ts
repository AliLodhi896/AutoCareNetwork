import { DEFAULT_CHANNEL_ID } from "../services/notification.service";
import { Location, VehicleInfo } from "../../../shared/global-types";
import { AppStateProps } from "./../../../shared/services/storage";
import { getMemberNumber } from "../../../shared/services/api/Utils";
import { Card } from "./api";
import WashubClient from "../services/api/api";
import notificationService from "../services/notification.service";
import { AuthStateContextProps } from "../../../shared/contexts/auth-state-context";
import { AppStateContextProps } from "../../../shared/services/actions";

export const hasLocation = (locations:any, location: Location) => {
  return (
    locations.filter(
      (l) =>
        location.LocationId === l.LocationId &&
        location.LocationSubId === l.LocationSubId
    ).length > 0
  );
};

export const locationIsUnique = (locations:any, location: Location) => {
  return (
    locations.filter((loc) => loc.LocationId === location.LocationId).length ===
    1
  );
};

export const isLocation = (
  locations:any,
  locationA: Location,
  locationB: Location
) => {
  return locationIsUnique(locations, locationA)
    ? !locationB.LocationId || locationB.LocationId === locationA.LocationId
    : !locationB.LocationSubId ||
        locationB.LocationSubId === locationA.LocationSubId;
};

export const removeFavoriteLocation = (
  stateContext: AppStateContextProps,
  location: Location
) => {
  const set = new Set(stateContext.appState.favoriteLocations);
  set.forEach((loc) => {
    if (isLocation(stateContext.appState.favoriteLocations, location, loc)) {
      set.delete(loc);
    }
  });

  stateContext.setAppState({ favoriteLocations: [...set] });
  return false;
};
export const addFavoriteLocation = (
  stateContext: AppStateContextProps,
  location: Location
) => {
  const set = new Set(stateContext.appState.favoriteLocations);
  set.add(location);
  stateContext.setAppState({ favoriteLocations: [...set] });
  return true;
};

export const notificationHistory = (state: AppStateProps) => {
  const allNotifications = state.notifications;

  const savedIds = state.saved_notifications;

  return allNotifications
    ?.filter((n) => n.data?.route === "custom_message")
    .map((n) => ({ ...n, saved: savedIds.includes(n.id) }))
    .sort((n1, n2) => {
      const d1 = Date.parse(n1.date ?? 0);
      const d2 = Date.parse(n2.date ?? 0);
      return d2 - d1;
    });
};

export const saveVehicleInfo = (
  stateContext: AppStateContextProps,
  authContext: AuthStateContextProps,
  { CardCode, info }: { CardCode: string; info: VehicleInfo }
) => {
  const { appState, setAppState } = stateContext;
  const { authState, setAuthState } = authContext;
  const newCards = [];
  const existingVehicleInfo = authState.profile?.CollectVehicleInfo ?? [];
  const existingProfile = authState.profile;

  for (let index = 0; index < appState?.cards.length; index++) {
    const card: Card = appState.cards[index];
    if (getMemberNumber(card) === CardCode) {
      newCards.push({
        ...card,
        VehicleInfo: info,
      });
    } else {
      newCards.push({ ...card });
    }
  }

  setAuthState({
    profile: {
      ...existingProfile,
      CollectVehicleInfo: existingVehicleInfo.filter(
        (c) => `${c}` !== `${CardCode}`
      ),
    },
  });
  setAppState({
    hasSavedVehicleInfo: true,
    cards: newCards,
  });
};

export async function completeSignup(
  stateContext: AppStateContextProps,
  authContext: AuthStateContextProps,
  info: any,
  cardCode?: string
) {
  const { initializeApp } = stateContext;
  const { setAuthState } = authContext;

  if (cardCode) {
    const { error } = await WashubClient.linkCard(cardCode);
    if (error) {
      console.error("Error linking card", error);
      throw new Error(error.message as string);
    }
  }

  const profileResult = await WashubClient.getProfile();

  if (profileResult.error) {
    console.error("Error updating user", profileResult.error);
    throw new Error(profileResult.error.message as string);
  }

  const updatedInfo = {
    ...profileResult.result,
    ...info,
  };

  const { error } = await WashubClient.updateProfile(updatedInfo);
  if (error) {
    console.error("Error updating user", error);
    throw new Error(error.message as string);
  }

  await initializeApp();
  setAuthState({ requiredFields: [], token: null, isNewUser: false });
}

export function scheduleFeedback(props: { station: Location; card: Card }) {
  const { station, card } = props;

  notificationService.scheduleLocalNotification({
    channelId: DEFAULT_CHANNEL_ID,
    message: "Please Rate your wash!",
    date: new Date(Date.now() + 15 * 60 * 1000),
    userInfo: {
      navigate: {
        route: "home",
        params: {
          screen: "default",
          params: {
            collectFeedback: true,
            stationName: station.LocationName,
            cardCode: card.CardCode,
          },
        },
      },
    },
  });
}

export function getDealer(card: Card) {
  return "aaaa";
}
