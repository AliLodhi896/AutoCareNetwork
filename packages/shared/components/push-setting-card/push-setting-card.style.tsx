import { color, spacings, fontsize } from "../../theme";
import { StyleSheet,Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: color.primary,
        borderStyle: Platform.select({default: "dashed"}),
        paddingVertical: spacings.medium,
    },
    textContainer: {},
    iconContainer: { justifyContent: "center" },
    title: {
        color: color.palette.black,
        fontSize: fontsize.medium,
    },
    description: {
        color: color.palette.black,
        fontSize: fontsize.small,
    },
    icon: {},
});
