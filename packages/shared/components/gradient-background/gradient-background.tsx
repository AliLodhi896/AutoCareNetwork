import React, {ReactNode} from "react";
import {
  ImageBackground as DefaultImageBackground,
  ImageURISource,
  View,
  ViewStyle,
} from "react-native";
import { backgroundImage } from "../../utils/common";

const BG_GRADIENT: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

type ImageBackgroundProps = DefaultImageBackground["props"] & {
  children: React.ReactNode;
};

function MyBackground(props: ImageBackgroundProps) {
  return <DefaultImageBackground {...props} />;
}

export interface GradientBackgroundProps {
  colors?: string[];
  children?: ReactNode;
  imgSrc?: ImageURISource;
  hasImageBackground?: boolean;
  merchant?: boolean;
  backgroundColor?: string;
}

export function GradientBackground(props: GradientBackgroundProps) {
  const { imgSrc, children, merchant } = props;

  const imageBackground = imgSrc || backgroundImage(merchant)
  return (
    <MyBackground
      source={imageBackground}
      resizeMode="cover"
      style={BG_GRADIENT}
    >
     <View>
        {children}
     </View>
    </MyBackground>
  );
}