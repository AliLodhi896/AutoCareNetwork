import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function (props: any) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={props.route.params.services}
        keyExtractor={(item: any) => item.ServiceName}
        renderItem={({ item: service }: any) => (
          <View style={styles.row}>
            <View style={styles.content}>
              <View style={styles.details}>
                <Image
                  source={{ uri: service.ServiceLogo }}
                  style={styles.image}
                />
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Text style={{ fontSize: 15 }}>{service.ServiceName}</Text>
                  <Text>{service.ServiceDescription}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 8,
    backgroundColor: "white",
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
