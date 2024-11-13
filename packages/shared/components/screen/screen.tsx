import * as React from "react"
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import WScrollView from "../scroll-view/w-scroll-view"
import { styles } from "./screen.styles"
import { backgroundImage } from "../../utils/common"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}

  return (

      <View style={[preset.inner, style, backgroundStyle]}>
        {props.withBackgroundImage ? (
          <ImageBackground
            source={backgroundImage(props.merchant)}
            style={styles.backgroundImage}
          >
            {props.children}
          </ImageBackground>
        ) : (
          props.children
        )}
      </View>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const insetStyle = { paddingTop: props.unsafe ? undefined : insets.top }

  const content = Platform.select({
    ios: (
      <View style={styles.container}>
        <>{props.children}</>
      </View>
    ),
    default: <>{props.children}</>,
  })

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <WScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || "handled"
          }
        >
          {props.withBackgroundImage ? (
            <ImageBackground
              source={backgroundImage(props.merchant)}
              style={styles.backgroundImage}
            >
              {props.children}
            </ImageBackground>
          ) : (
            content
          )}
        </WScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
