import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { fontsize, typography } from "../../../../../shared/theme";
import { normalize } from "../../../../../shared/utils/normalize";
import { Text } from "../../../../../shared/components";

const styles = StyleSheet.create({
  label: {
    fontFamily: typography.primary,
    fontSize: fontsize.medium,
    lineHeight: fontsize.mediumOne,
    textTransform: "uppercase",
    marginTop: normalize(20),
  },
  input: {
    fontFamily: typography.primary,
    fontSize: normalize(21),
    paddingLeft: normalize(5),
    paddingVertical: normalize(5),
    borderBottomColor: "#00BCFF",
    borderBottomWidth: normalize(1),
  },
  errorText: {
    fontSize: fontsize.small,
    color: "red",
  },
});

interface Props {
  placeholder: string;
  field: {
    name: string;
    onBlur: (name: string) => void;
    onChange: (name: string) => void;
    value: string;
  };
  form: {
    errors: any;
    touched: any;
    setFieldTouched: (name: string) => void;
  };
  label: string;
}

const AppFormField = (props: Props) => {
  const {
    placeholder,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    label,
    ...extraProps
  } = props;

  const hasError = errors[name] && touched[name];
  console.log('0000',value)
  return (
    <>
      {label && <Text text={label} style={styles.label} />}
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
      />
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </>
  );
};

export default AppFormField;
