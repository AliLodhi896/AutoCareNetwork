import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Linking } from "react-native";
import { styles } from "./manufacture-logo.styles";
import { Text } from "../../../../../shared/components";
import { Card, CustomButtonType } from "../../../services/api";
import analytics from "@react-native-firebase/analytics";

interface Manufacturer {
  url: string;
  imageUrl: string;
  name: string;
}

interface Props {
  card: Card;
  customButtons: CustomButtonType[];
}
const ManufactureLogo = ({ card, customButtons }: Props) => {
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  useEffect(() => {
    getManufacturerLogo();
  }, [card]);

  useEffect(() => {
    return () => {
      setManufacturer(null);
    };
  }, []);

  const getManufacturerLogo = () => {
    customButtons.map((button: CustomButtonType) => {
      if (button.ButtonSettings.Type === "ManufacturerLogo") {
        if (button.ButtonSettings.DealerIds?.indexOf(card.DealerId) > -1) {
          setManufacturer({
            url: button.ButtonSettings.Url,
            imageUrl: button.BackgroundImageUrl,
            name: button.Text,
          });
          scrreenView(button.Text)
          return;
        }
      }
    });
  };


  const scrreenView = async (name) => {
    await analytics().logEvent('screen_view', {
      screen_name: name + ' ' + 'app',
    });
  }


  const openManufacturerApp = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.manufacturerLogoContainer}>
      {manufacturer !== null && (
        <>
          <TouchableOpacity
            onPress={() => openManufacturerApp(manufacturer.url)}
          >
            <Image
              resizeMode="cover"
              style={styles.manufacturerLogo}
              source={{ uri: manufacturer.imageUrl }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.manufacturerTitle}>{manufacturer.name}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ManufactureLogo;
