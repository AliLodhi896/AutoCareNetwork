import React, {useEffect, useRef} from "react";
import { Location } from "../../../../../shared/global-types";
import { LocationsList } from "../locations-list/locations-list";
import RedeemContainer from "../redeem-container";
import analytics from '@react-native-firebase/analytics';
import { Animated, Dimensions } from "react-native";
import { useAppState } from "../../../context/app-state-context";

const LocationsNearby = ({ washLocations, open }: { washLocations: Location[], open: boolean }) => {
  const { appState } = useAppState();

  const animatedBottom = useRef(new Animated.Value(0)).current
  const searchWashPlansAnalytics = async () => {
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
          item_list_id: 'location_list',
          item_list_name: 'Location List',
          items: items
        })
      }
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }

  useEffect(() => {
    animatedBottom.setValue(open ? Dimensions.get("screen").height : 0)
    
    const animation = Animated.timing(animatedBottom, {
      delay: 100, 
      toValue: open ? 0: Dimensions.get("screen").height, 
      duration: 300, 
      useNativeDriver: false
    })

    animation.start()

    return () => {
      animation.reset()
    }
  }, [open, animatedBottom])
  
  useEffect(() => {
    
    searchWashPlansAnalytics()
    analytics().logEvent('screen_view', {
      screen_name: 'Search By Location - Nearby',
    })

  }, [searchWashPlansAnalytics])
  
  return (
    <Animated.View style={{ position: 'absolute', height: "100%", width: "100%", paddingHorizontal: 40, bottom: animatedBottom, backgroundColor: "rgb(174, 223, 243)", zIndex: 5}}>    
      <RedeemContainer>
        <LocationsList recentWash={washLocations} washLocations={washLocations} title="NEARBY CARWASHES" />
      </RedeemContainer>
    </Animated.View>
  );
};

export default LocationsNearby;
