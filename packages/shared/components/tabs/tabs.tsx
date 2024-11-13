import React from "react"
import { Pressable, View } from "react-native"
import { palette } from "../../theme/palette"
import { TabButton } from "../tab-button/tab-button"
import { Text } from "../text/text"
import { tabsStyle } from "./tabs.style"

interface Props<T> {
  tabs: { key: T; value: string }[]
  onChange: (key: T) => void
  textCenter?: boolean
  value: T
  isNotif?: boolean
}
export function Tabs<T extends string>({
  tabs,
  onChange,
  value,
  textCenter = false,
  isNotif= false
}: Props<T>) {
  return (
    <View>
      <View style={tabsStyle.tabLabelContainer}>
        {tabs.map((tab, index) => (
          <Pressable style={{width:`${100/tabs.length}%`}} key={tab.key} onPress={() => onChange(tab.key)}>
            <Text
              style={[
                tabsStyle.tabText,
                {
                  textAlign: isNotif ? (index===0 ?  "left" : "right") : "center",
                  color: value === tab.key ? palette.red : palette.black,
                },
              ]}
              preset="fieldLabel"
            >
              {tab.value}
            </Text>
            <TabButton<T>
            tabLenght={tabs.length}
            itemCount={index}
            isActive={tab.key === value}
            key={tab.key}
            type={value}
            onPress={() => onChange(tab.key)}
          />
          </Pressable>
        ))}
       
      </View>
    
    </View>
  )
}
