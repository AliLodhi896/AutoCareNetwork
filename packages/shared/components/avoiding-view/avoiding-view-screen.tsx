import React from "react"
import { KeyboardAvoidingView, ScrollView, View } from "react-native"
import { GradientBackground } from "../gradient-background/gradient-background"
import { Screen } from "../screen/screen"
import { styles } from "./avoiding-view-screen.style"

interface AvoidingViewProps {
  header?: any
  withoutBackgroundImage?: boolean
  children: React.ReactNode
  merchant?: boolean
  backgroundColor?: string
}

const AvoidingView = (props: AvoidingViewProps) => {
  const { withoutBackgroundImage, children, header, merchant, backgroundColor } = props
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Screen style={[styles.container]} backgroundColor={backgroundColor} statusBar="light-content" unsafe>
        {!withoutBackgroundImage && <GradientBackground merchant={merchant} />}
        <ScrollView style={styles.safeArea}>
          <View style={styles.mainView}>{children}</View>
        </ScrollView>
        {header && header}
      </Screen>
    </KeyboardAvoidingView>
  )
}

export default AvoidingView
