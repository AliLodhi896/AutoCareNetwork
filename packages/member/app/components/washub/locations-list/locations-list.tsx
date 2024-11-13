import React, { useEffect } from "react";
import { Text } from "../../../../../shared/components/text/text";
import { View, ViewStyle } from "react-native";
import { styles } from "./locations-list.style";
import { useNavigation } from "@react-navigation/native";
import { CircleActionButton } from "../circle-action-button/circle-action-button";
import { FlatList } from "react-native-gesture-handler";
import { Location } from "../../../../../shared/global-types";
import useDistanceMiles from "../../../hooks/useDistanceMiles";
import analytics from '@react-native-firebase/analytics';
import { normalize } from "../../../../../shared/utils/normalize";

import { PinColors } from "../../../washub-types";
import { useAppState } from "../../../context/app-state-context";

const LocationItem: React.FC<{ item: Location }> = ({ item }) => {

  const navigation = useNavigation();
  const { distanceMiles } = useDistanceMiles(item);
  return (
    <View style={styles.item}>
      <View style={styles.itemData}>
        <Text style={{ ...styles.itemText, ...{ fontWeight: "bold" } }}>
          {item.LocationName}
        </Text>
        {Array.isArray(item.StationServices) &&


          item?.WashUpcharge !== 0.00 || item?.WashUpcharge !== 0 ? (


          <Text
            style={{
              ...styles.itemText,
              ...{ fontWeight: "bold", color: PinColors.red },
            }}
            text="PREMIUM - CO-PAY REQUIRED"
          />
        )
          :
          null

        }

        <Text style={styles.itemText}>{item.LocationAddress}</Text>
        <Text style={styles.itemText}>
          {item.LocationCity}, {item.LocationState}
        </Text>
        <Text style={styles.itemText}>{item.LocationPhone}</Text>
      </View>
      <View>
        {distanceMiles !== null && (
          <Text style={styles.actionButtonText}>
            {distanceMiles !== 0 ? distanceMiles.toFixed(2) : distanceMiles}{" "}
            miles
          </Text>
        )}
        <CircleActionButton
          style={styles.actionButton}
          textStyle={{ fontSize: normalize(12) }}
          text="SELECT"
          onPress={() => {
            navigation.navigate("locationDetail", { station: item });
          }}
        />
      </View>
    </View>
  );
};

interface LocationsListProps {
  washLocations: Location[];
  recentWash: Location[];
  title: string;
  emptyListText?: string;
  customStyle?: {
    container?: ViewStyle;
  };
}

export function LocationsList({
  washLocations,
  title,
  emptyListText = "Use Search By Location to find nearest car washes.",
  customStyle = {
    container: {},
  },
  recentWash,
}: LocationsListProps) {
  const { appState } = useAppState();

  useEffect(() => {
    try {
      console.log('Recent wash list event logged')
      const items = recentWash.map(item => ({
        item_brand: appState.registeredCard.VehicleInfo.Make,
        item_name: item?.LocationName,
        item_id: item?.LocationId,
        location_id: item?.LocationGooglePlacesId,
        item_category: 'car wash',
        affiliation: appState.registeredCard.DealerName,
        item_category2: 'Premium Only',
      }));

      analytics().logEvent('view_item_list', {
        item_list_id: 'recent_washes',
        item_list_name: 'Recent Washes',
        items: items
      })
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }, [recentWash])

  return (
    <View style={{ ...styles.container, ...customStyle.container }}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={washLocations}
        renderItem={({ item }: { item: Location }) => (
          <LocationItem item={item} />
        )}
        keyExtractor={(item, key) => {
          return item.LocationId + key.toString();
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        ListEmptyComponent={() => (
          <Text style={styles.emtpyList} text={emptyListText} />
        )}
      />
    </View>
  );
}
