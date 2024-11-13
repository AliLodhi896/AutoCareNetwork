import { Dimensions, Platform } from "react-native";
import { normalize } from "../utils/normalize";

export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64];

export const screenDimensions = Dimensions.get("screen");

/**
 * @namespace
 */
export const spacings = Object.freeze({
  /**
   * none          - value = 0.
   */
  none: 0,
  /**
   * thin          - value = 2.
   */
  thin: normalize(2),
  /**
   * tiny          - value = 4.
   */
  tiny: normalize(4),
  /**
   * smaller       - value = 8.
   */
  smaller: normalize(8),
  /**
   * small         - value = 12.
   */
  small: normalize(12),
  /**
   * small+         - value = 14.
   */
  ["small+"]: normalize(14),
  /**
   * medium        - value = 16.
   */
  medium: normalize(16),
  /**
   * mediumOne        - value = 20.
   */
  mediumOne: normalize(20),
  /**
   * mediumOne+        - value = 22.
   */
  "mediumOne+": normalize(22),
  /**
   * medium+       - value = 24.
   */
  "medium+": normalize(24),
  /**
   * large         - value = 32.
   */
  large: normalize(32),
  /**
   * huge          - value = 48.
   */
  huge: normalize(48),
  /**
   * massive       - value = 64.
   */
  massive: normalize(64),

  icons: {
    /**
     * small    - value = 28.
     */
    small: normalize(28),
    /**
     * medium    - value = 36.
     */
    medium: normalize(36),
    /**
     * mediumOne    - value = 40.
     */
    mediumOne: normalize(40),
    /**
     * medium+    - value = 44.
     */
    "medium+": normalize(44),
    /**
     * large    - value = 64.
     */
    large: normalize(64),
    /**
     * huge   - value = 80.
     */
    huge: normalize(80),
  },
  borderRadius: {
    small: normalize(8),
    smaller: normalize(16),
    large: normalize(24),
  },
  /**
   * cardHeight    - default height of card through out the app.
   */
  cardHeight: 0.65 * screenDimensions.height,
});

/**
 * @namespace
 */
export const fontsize = Object.freeze({
  /**
   * thin         - value = 8.
   */
  thin: normalize(8),
  /**
   * tiny-       - value = 10.
   */
  "tiny-": normalize(10),
  /**
   * tiny         - value = 12.
   */
  tiny: normalize(12),
  /**
   * small         - value = 14.
   */
  small: normalize(14),
  /**
   * medium        - value = 16.
   */
  medium: normalize(16),
  /**
   * mediumOne+        - value = 18.
   */
  "mediumOne+": normalize(18),
  /**
   * medium        - value = 20.
   */
  mediumOne: normalize(20),
  /**
   * medium+       - value = 24.
   */
  "medium+": normalize(24),
  /**
   * large         - value = 32.
   */
  large: normalize(32),
  /**
   * larger         - value = 40.
   */
  larger: normalize(40),
  /**
   * huge          - value = 44.
   */
  huge: normalize(44),
  /**
   * huge+          - value = 52.
   */
  "huge+": normalize(52),
  /**
   * huge          - value = 56.
   */
  "massive-": normalize(56),
  /**
   * massive       - value = 64.
   */
  massive: normalize(64),
});

export const prefix = Platform.OS === "ios" ? "ios" : "md";
