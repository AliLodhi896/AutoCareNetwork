import React, { useState, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  Platform,
  ImageBackground,
  Image,
} from "react-native";

export function SPlashView({ children }) {
  const [visible, setVisible] = useState(
    Platform.select({ ios: true, default: false })
  );
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    let timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (visible && Platform.OS === "ios") {
    return (
      <View
        style={{
          height: Platform.select({ android: height + 700, default: height }),
          marginTop: Platform.select({ android: -250, default: 0 }),
          justifyContent: "center",
          width,
          backgroundColor: "#1B588A",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={require("../../../assets/splash-drops.png")}
          style={{
            height,
            width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 286,
              height: 304,
            }}
            source={require("../../../assets/splash-brand.png")} />
        </ImageBackground>
      </View>
    );
  }
  return <>{children}</>;
}
