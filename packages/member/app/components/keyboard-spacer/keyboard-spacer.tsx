import React, { useEffect, useRef, ReactNode } from "react"
import { Keyboard, View, ViewStyle } from "react-native"

export default function KeyboardSpacer(props: {
  children: ReactNode
  style?: ViewStyle
  keyboardOffset?: number
}) {
  const { children, keyboardOffset = 20, style } = props
  const submitButtonViewRef = useRef<View | null>(null)

  useEffect(() => {
    const updateMarginBottom = (margin: number) => {
      submitButtonViewRef.current?.setNativeProps({
        marginBottom: margin,
      })
    }
    const handleShowFunc = () => {
      updateMarginBottom(keyboardOffset)
    }
    const handleHideFunc = () => {
      updateMarginBottom(0)
    }
    const hideListener = Keyboard.addListener(
      "keyboardWillHide",
      handleHideFunc
    )
    const showListener = Keyboard.addListener(
      "keyboardWillShow",
      handleShowFunc
    )
    return () => {
      hideListener.remove()
      showListener.remove()
    }
  }, [keyboardOffset])
  return (
    <View style={style} ref={submitButtonViewRef}>
      {children}
    </View>
  )
}
