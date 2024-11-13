import React from 'react';
import {View, ViewProps} from "react-native"

function ImageView(props:  ViewProps) {
    const {children, style } = props;

    return (
      <View style={[{overflow: "hidden"}, style]}>
        {children}
      </View>
    );
}

export default ImageView;