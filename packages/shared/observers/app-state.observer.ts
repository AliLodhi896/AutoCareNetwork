import { AppState, NativeEventSubscription } from "react-native"

export class AppStateObserver {
  constructor() {
    this.observer = AppState.addEventListener("change", (nextAppState) => {
      if (
        this.appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!")
        this.setAppIsVisible("active")
      } else {
        this.setAppIsVisible("inactive")
        this.appState = nextAppState
      }

      console.log("AppState", this.appState)
    })
  }

  setAppIsVisible(appState: typeof AppState.currentState) {
    this.isAppVisible = appState === "active"
  }
  observer: NativeEventSubscription

  isAppVisible = false

  appState = AppState.currentState
  destroy() {
    this.observer.remove()
  }
}
