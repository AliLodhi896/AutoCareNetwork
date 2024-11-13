import React, { Suspense } from "react"
import LoadingScreen from "../../../../shared/screens/loading-screen/loading-screen"


const Component = React.lazy(() => import("./profile-component"))
const ProfileScreen = (props) => {
  return (
    <Suspense fallback={<LoadingScreen/>}>
      <Component />
    </Suspense>
  ) 
}

export default ProfileScreen
