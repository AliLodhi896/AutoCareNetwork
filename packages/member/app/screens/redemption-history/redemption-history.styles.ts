import { StyleSheet } from "react-native";
import { spacings } from '../../../../shared/theme/spacing';
import { screenStyles } from "../../../../shared/components/screen/screen.styles";

export const styles = StyleSheet.create({
    container: screenStyles.container,
    label: {
        fontWeight: "bold",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 5,
    },
    details: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        paddingVertical: spacings.small,
        paddingHorizontal: spacings.medium,
        flexDirection: "row",
        minHeight: 60,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#cdcdcd",
    },
    input: {
        padding: 10,
    },
    safeArea: {
        flex: 1,
    },
    card: {
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 0
    },
    list: { flex: 1, width: "100%", paddingVertical: spacings.medium }
});
