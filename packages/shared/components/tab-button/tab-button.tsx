import React from "react"
import { Pressable, View } from "react-native"
import { color, Radii } from "../../theme"
import { styles } from "./tab-button.style"

export type DefaultT = "all" | "saved"
interface TabButtonProps<T = DefaultT> {
  type: T
  isActive: boolean
  isRight?: boolean
  itemCount?: number
  onPress: () => void
  tabLenght: number
}

export function TabButton<T = DefaultT>(props: TabButtonProps<T>) {
  const {itemCount, isActive, tabLenght} = props
  const btnStyle = [
    styles.tabButton,
    { width: '100%', 
    backgroundColor: color.palette.lightGreyBackground,
    borderTopLeftRadius: isActive || itemCount === 0 ? Radii.rounded : 0,  
    borderBottomLeftRadius: isActive || itemCount === 0 ? Radii.rounded : 0,  
    borderTopRightRadius: isActive || itemCount === (tabLenght-1) ? Radii.rounded : 0,   
    borderBottomRightRadius: isActive || itemCount === (tabLenght-1)  ? Radii.rounded : 0
  },
  ]

  return <Pressable onPress={props.onPress} style={btnStyle}>
    {isActive && <View style={styles.tabView}>
    <View style={styles.activeTab}/>
      </View>}
  </Pressable>
}
