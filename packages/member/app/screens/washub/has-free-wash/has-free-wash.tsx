import React from "react";
import { ErrorDrop } from "../../../components/washub/error-drop/error-drop";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../../../shared/components";
import { styles } from "./has-free-wash.styles";
import { fontsize } from "../../../../../shared/theme";

const HasFreeWash = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <ErrorDrop text="You have no free car washes available.">
      <TouchableOpacity
        onPress={() => handleClose()}
        style={{ ...styles.textContainer }}
      >
        <Text style={styles.text}>
          <Text style={{ ...styles.text, fontSize: fontsize.tiny }}>{"<"}</Text>{" "}
          CLOSE
        </Text>
      </TouchableOpacity>
    </ErrorDrop>
  );
};

export default HasFreeWash;
