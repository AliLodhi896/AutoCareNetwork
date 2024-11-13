import * as React from "react"
import {Image} from 'react-native';
import { normalize } from "../../utils/normalize";
import { spacings } from "../../theme";

function SvgComponent(props) {
  const width = normalize(spacings.icons.huge+10);
  const height = normalize(spacings.icons.large);

  return (
    
      <Image
        width={width}
        height={height}
        style={{ 
          width,
          height
         }}
        source={require('../../../assets/images/app-logo-small.png')}
        resizeMode={'contain'}
      />
  )
}

export default SvgComponent
