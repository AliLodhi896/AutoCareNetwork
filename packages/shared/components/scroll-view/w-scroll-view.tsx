import React, { RefObject } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
  ReactNode,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./w-scrollview.style";

interface Props extends ScrollViewProps {
  children: ReactNode;
  stickyBottomContent?: ReactNode;
  stickyBottomButtonContainerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const WScrollView = React.forwardRef(
  (
    { stickyBottomContent, loading, ...props }: Props,
    ref: RefObject<ScrollView>
  ) => {
    const { bottom } = useSafeAreaInsets();

    const containerStyle = StyleSheet.flatten([
      styles.container,
      stickyBottomContent ? { marginBottom: bottom } : {},
      props.style,
    ]);

    const contentContainerStyle = StyleSheet.flatten([
      styles.contentContainer,
      // add paddingButton to make sure scrollview content is not hidden behind the sticky button.
      // This paddingButton needs to match the height of stickyButton.
      // <Button> is 44 height by default + 16*2 vertical padding.
      // can be overridden for different sticky buttons
      stickyBottomContent ? { paddingBottom: 76 } : {},
      props.contentContainerStyle,
    ]);

    const stickyBottomButtonContainerStyle = StyleSheet.flatten([
      styles.stickyButton,
      { bottom },
      props.stickyBottomButtonContainerStyle,
    ]);

    return (
      <View style={styles.container}>
        <ScrollView
          ref={ref}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          {...props}
          style={containerStyle}
          contentContainerStyle={contentContainerStyle}
        />
        {stickyBottomContent && (
          <View style={stickyBottomButtonContainerStyle}>
            {stickyBottomContent}
          </View>
        )}
        {loading && (
          <View style={styles.loadingContainer}>{"Loading ..."}</View>
        )}
      </View>
    );
  }
);

export default WScrollView;
