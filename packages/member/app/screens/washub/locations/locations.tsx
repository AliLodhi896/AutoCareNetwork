import { View } from "react-native";
import React, { useCallback, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavigatorParamList } from "../home/home-stack";
import LocationsMap from "../../../components/washub/locations/locations-map";
import LocationsNearby from "../../../components/washub/locations/locations-nearby";
import { ToggleMode } from "../../../components/washub/toggle-mode/toggle-mode";
import { styles } from "./locations.styles";
import { Location } from "../../../../../shared/global-types";
import { useAppState } from "../../../context/app-state-context";
import { Header } from "../../../components/washub/header/header";

interface LocationsScreenProps
  extends StackScreenProps<HomeNavigatorParamList, "locations"> { }

function LocationsScreen(_: LocationsScreenProps) {
  const [washLocations, setWashLocations] = useState<Location[]>([]);
  const [isMapMode, setIsMapMode] = useState<boolean>(true);

  const { appState } = useAppState();

  const onLocationChange = useCallback(
    (locations: Location[]) => {
      setWashLocations(locations);
    },
    []
  );



  return (
    <View style={{ flex: 1 }}>
      <Header showManufacturer={false} />
      <View style={{ flex: 1 }}>
        {isMapMode == true ?
          <LocationsMap
            onLocationsChange={onLocationChange}
            card={appState.selectedCard}
          />
          :
          <LocationsNearby washLocations={washLocations} open={!isMapMode} />
        }

        <View
          style={{
            ...styles.buttonWrapper,
            zIndex: 10,
          }}
        >
          <ToggleMode
            handleOnPress={() => {
              setIsMapMode(!isMapMode);
            }}
            isMapMode={isMapMode}
          />
        </View>
      </View>
    </View>
  );
}

export default LocationsScreen;
