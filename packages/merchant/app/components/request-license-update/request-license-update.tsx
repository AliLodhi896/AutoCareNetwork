import React, { useRef } from 'react';
import { Button, LineInput, WForm, Text } from "../../../../shared/components"
import { Picker } from "../../../../shared/components/w-picker/w-picker"
import usStates from '../../../../assets/data/us-states.json'; 
import { translate } from '../../i18n'
import { WFormRef } from '../../../../shared/components/w-form'
import * as Yup from 'yup'
import { View } from 'react-native'
import { dashboardStyles } from '../../screens/dashboard/dashboard.style'
import { requestLicenseUpdateStyle } from './request-license-update.stye'

const licensePlateValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  licensePlateNumber: Yup.string().required(),
  state: Yup.string().oneOf(usStates.map(ele => ele.code)).required()
})
const items = usStates.map(state => ({label: state.name, value: state.code}))
export const RequestLicenseUpdate = ({onDone}: {
  onDone(value: any): void
}) => {
  const formRef = useRef<WFormRef|undefined>()
  return (
    <WForm
      onSubmit={(value) => {
        console.warn("form values are", value)
        onDone(value)
      }}
      style={{ 
        marginTop: 40
       }}
      validationSchema={licensePlateValidationSchema}
      ref={formRef}
      initialValue={{
        email: "",
        name: "",
        license: "",
        state: "",
      }}
    >
      <View style={dashboardStyles.topContainer}>
        <Text
          style={requestLicenseUpdateStyle.headerTitle}
          fontFamily={"primary"}
        >
          {translate("requestLicenseUpdate.title")}
        </Text>
        <Text style={requestLicenseUpdateStyle.headerDescription}>
          {translate("requestLicenseUpdate.description")}
        </Text>
      </View>
      <View style={dashboardStyles.topContainer}>
        <LineInput
          fieldName="name"
          placeholder={translate("requestLicenseUpdate.yourName")}
        />
        <LineInput
          placeholder={translate("requestLicenseUpdate.yourEmail")}
          fieldName="email"
        />
        <LineInput
          placeholder={translate("requestLicenseUpdate.licensePlateNumber")}
          fieldName="licensePlateNumber"
        />
        <Picker
          items={items}
          containerStyle={{ 
            flexDirection: 'column',
            height: 'auto'
           }}
          label={translate("requestLicenseUpdate.selectState")}
          fieldName="state"
        />
        <Button onPress={() => formRef.current.submit()}>
          <Text>{translate("requestLicenseUpdate.requestUpdate")}</Text>
        </Button>
      </View>
    </WForm>
  )
}