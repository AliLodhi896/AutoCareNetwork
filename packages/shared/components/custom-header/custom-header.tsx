import { screenDimensions } from "../../theme";
import React ,{ReactNode} from "react";

import { View, ViewStyle, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./custom-header.styles";

interface CustomHeaderProps {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  styles?: ViewStyle;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const {
    leftContent,
    centerContent,
    rightContent,
    styles: viewstyles,
  } = props;
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.header,
        ...viewstyles,
        paddingTop: Platform.OS === "android" ? insets.top + 30 : insets.top,
      }}
    >
      <View style={styles.container}>
        <View style={styles.leftView}>{leftContent}</View>
        <View style={[styles.centerView]}>{centerContent}</View>
        <View
          style={[
            styles.rightView,
            rightContent
              ? {}
              : { width: screenDimensions.width / 3, marginLeft: 10 },
          ]}
        >
          {rightContent}
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
