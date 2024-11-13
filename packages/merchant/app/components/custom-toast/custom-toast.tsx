import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { color, typography } from '../../../../shared/theme';
import { shadower } from '../../../../shared/utils/common';

/*
  1. Create the config
*/
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: color.palette.lightBlackBackground, borderLeftColor: color.palette.green,  width: '94%' }}
      text1Style={{
        fontSize: 15,
        fontFamily: typography.primary,
        color: color.palette.white
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{  backgroundColor: color.palette.lightBlackBackground, borderLeftColor: color.palette.red, ...shadower(2), width: '94%' }}
      text1Style={{
        fontSize: 15,
        fontFamily: typography.primary,
        color: color.palette.white
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: typography.primary,
        color: color.palette.white
      }}
    />
  ),

};

export function WashubToast() {
  return <Toast config={toastConfig} />
}