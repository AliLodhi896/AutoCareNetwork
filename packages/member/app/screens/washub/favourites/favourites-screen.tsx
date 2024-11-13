import React, { FC, useCallback, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { HomeNavigatorParamList } from "../home/home-stack";
import { useAppState } from "../../../context/app-state-context";
import { Layout } from "../../../components/washub/layout";
import LocationsFavorites from "../../../components/washub/locations/locations-favorites";
import analytics from '@react-native-firebase/analytics';
import { useFocusEffect } from "@react-navigation/native";

const FavouritesScreen: FC<
  StackScreenProps<HomeNavigatorParamList, "favourites">
> = observer(() => {
  const state = useAppState();
  const favoriteLocations = state.appState.favoriteLocations || [];

  const scrreenView =  async () => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Favorites',
    });
  }

  useFocusEffect(
    useCallback(() => {
      scrreenView()
    }, []),
  );

  return (
    <Layout>
      <LocationsFavorites washLocations={favoriteLocations} />
    </Layout>
  );
});

export default FavouritesScreen;
