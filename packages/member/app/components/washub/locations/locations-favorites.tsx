import React, { useCallback, useEffect } from "react";
import { Location } from "../../../../../shared/global-types";
import { LocationsList } from "../locations-list/locations-list";
import analytics from '@react-native-firebase/analytics';
import RedeemContainer from "../redeem-container";
import { useFocusEffect } from "@react-navigation/native";
import { useAppState } from "../../../context/app-state-context";

const LocationsFavorites = ({
  washLocations,
}: {
  washLocations: Location[];
}) => {
  const { appState } = useAppState();

  const favoriteWashPlansAnalytics = async () => {
    try {
      if(washLocations?.length !== 0){
        const items = washLocations.map(item => ({
          item_brand: appState.registeredCard.VehicleInfo.Make,
          item_name: item?.LocationName,
          item_id: item?.LocationId,
          location_id: item?.LocationGooglePlacesId,
          item_category: 'car wash',
          affiliation: appState.registeredCard.DealerName,
          item_category2: 'Premium Only',
        }));
        await analytics().logEvent('view_item_list', {
          item_list_id: 'favorites_list',
          item_list_name: 'Favorites List',
          items: items
        })
      }
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }



  useFocusEffect(
    useCallback(() => {
      favoriteWashPlansAnalytics()
    }, []),
  );


  return (
    <RedeemContainer>
      <LocationsList
        washLocations={washLocations}
        recentWash={washLocations}
        title="FAVORITE CAR WASHES"
        emptyListText="You have not added any favorites yet."
      />
    </RedeemContainer>
  );
};

export default LocationsFavorites;
