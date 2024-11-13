import React, { useMemo, useRef } from "react"
import { View, Platform, ActionSheetIOS, Pressable } from "react-native"
import { Text, VIcon } from ".."
import { styles } from "./w-picker.styles"
import { PickerProps } from "./w-picker.props"
import { Picker as WPicker } from "@react-native-picker/picker"
import { color } from "../../theme"
import { palette } from "../../theme/palette"

export const Picker = (props: PickerProps) => {
  const pickerRef = useRef<WPicker<any>>()
  const {
    onChange,
    label,
    value,
    containerStyle,
    pickerStyle,
    labelStyle,
    items,
    placeholder,
  } = props
  const triggerPickAndroid = () => {
    pickerRef.current?.focus()
  }
  const androidContent = (
    <View style={styles.pickerView}>
      <WPicker
        mode="dropdown"
        ref={pickerRef}
        onValueChange={(e) => onChange(e)}
        placeholder={placeholder}
        selectedValue={value}
        dropdownIconRippleColor={color.palette.red}
        dropdownIconColor={color.palette.white}
      >
        {items.map((item: { label: string; value: any; key: number }) => (
          <WPicker.Item
            key={item.key}
            label={item.label}
            style={{
              backgroundColor: palette.white,
            }}
            value={item.value}
          />
        ))}
      </WPicker>
    </View>
  )
  const display = (value: any) => value.label
  const onIOSItemsOpen = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [{ label: "Close", value: "close" }, ...items].map(display),
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex !== 0) onChange(items[buttonIndex - 1].value)
      }
    )
  const iosValue = useMemo(
    () =>
      items?.find((ele) => ele.value === value || ele.label === value)?.label,
    [value]
  )
  const iosTextContent = (
    <Pressable
      style={[styles.pickerView, { marginLeft: 10 }]}
      onPress={onIOSItemsOpen}
    >
      <Text>{iosValue}</Text>
    </Pressable>
  )
  const content = Platform.select({
    ios: iosTextContent,
    default: androidContent,
  })
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        pickerStyle,
        Platform.OS === "android" ? { alignItems: "center" } : {},
      ]}
    >
      {label && (
        <Text
          style={[styles.label, labelStyle]}
          fontFamily="secondary"
          preset="fieldLabel"
        >
          {label}:
        </Text>
      )}
      {content}
      {Platform.OS === "ios" ? (
        <VIcon family="Entypo" name="chevron-down" onPress={onIOSItemsOpen} />
      ) : null}
    </View>
  )
}
