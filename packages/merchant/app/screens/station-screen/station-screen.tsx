import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { useAppState } from '../../context/app-state-context';
import styles from './station-screen.styles';
import { Station } from '../../services/api';
import { BackButton } from '../../components/back-button/back-button';
import { fontsize } from '../../../../shared/theme';
import { color } from '../../theme';
import { Screen, VIcon } from '../../../../shared/components';
import { cardStyles } from '../../../../shared/utils/common';
import CustomHeader from "../../../../shared/components/custom-header/custom-header";

const StationScreen = () => {
    const {appState, setAppState} = useAppState()
    const {stations} = appState
    const stationSelected = (station: Station) => setAppState({selectedStation: station});

  const stationList = stations?.map((station: any) => ({
    key: station.StationId.toString(),
    station,
  }));

  return (

      <View testID="stationScreen" style={styles.container}>
      <Screen
        statusBar="light-content"
        style={[
          styles.container
        ]}
        merchant
        unsafe
      >

        <View style={[cardStyles.card]}>
          {stationList?.length>0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                color="#222"
                animating
                style={[{ height: 80 }]}
                size="large"
              />
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={stationList}
              keyExtractor={(item: any) => item.DateTime}
              renderItem={({item}: any) => (
                <View>
                <TouchableHighlight
                  style={styles.result}
                  onPress={() => {
                    stationSelected(item.station);
                  }}
                  underlayColor="#f0f0f0">
                  <Text style={styles.stationText}>{item.station.StationName}</Text>
                </TouchableHighlight>
              </View>
              )}
            />
          )}
        </View>
        <CustomHeader
          leftContent={<BackButton type="back" />}
          centerContent={
            <View>
              <VIcon
                family="MaterialCommunityIcons"
                name="history"
                size={fontsize.large}
                color={color.palette.white}
              />
            </View>
          }
        />
      </Screen>
    </View>
  );
};



export default StationScreen;
