import React from "react";
import { ImageBackground, Platform, View } from "react-native";
import { Header } from "./header/header";
import { screenDimensions } from "../../../../shared/theme";
import { normalize } from "../../../../shared/utils/normalize";

const Image = require("./washub-app-background.png");
const isIOS = Platform.OS === "ios";

export function Layout({
  children,
  hasContainer = true,
  headerManufacturer = false,
  ...props
}) {
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(174, 223, 243)" }} {...props}>
      <ImageBackground style={{ flex: 1 }} source={Image}>
        <Header showManufacturer={headerManufacturer} />
        {hasContainer ? (
          <View
            style={{
              width: screenDimensions.width - normalize(40),
              display: "flex",
              alignSelf: "center",
              flex: 1,
            }}
          >
            {children}
          </View>
        ) : (
          children
        )}
      </ImageBackground>
    </View>
  );
}
