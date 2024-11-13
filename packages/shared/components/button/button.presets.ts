import { ViewStyle, TextStyle } from "react-native";
import { color, spacing, typography } from "../../theme";

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[2],
  marginVertical: spacing[3],
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  letterSpacing: 1.4,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.primary } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
};

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT,
    fontSize: 16,
    color: color.palette.white,
  } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.palette.black,
    textDecorationLine: "underline",
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
};

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets;
