import { color, spacings, fontsize } from "../../theme";
import { StyleSheet } from "react-native";
import { screenStyles } from "../../components/screen/screen.styles";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: screenStyles.container,
    header: {
        top: 44,
        zIndex: 1,
        position: "absolute",
    },
    title: {
        fontSize: fontsize.large,
        color: color.palette.black,
    },
    card: {
        borderWidth: spacings.tiny,
        borderRadius: spacings["medium+"],
        borderColor: color.primary,
        margin: spacings.medium,
        padding: spacings.medium,
        backgroundColor: color.palette.white,
        flex: 1,
        marginBottom: 80,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    form: {
        marginVertical: spacings.medium,
    },
    textInputContainer: {
        marginVertical: spacings.medium,
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
    textInputLabel: {
        color: color.palette.black + "aa",
    },
    submitButton: {
        marginTop: spacings["medium+"],
    },
    editProfileIcon: {
        marginTop: -40,
        marginBottom: spacings.medium,
    },
});

export const wstyles = StyleSheet.create({
    container: {
        // borderBottomWidth: 1,
        borderBottomColor: color.dim,
        marginVertical: spacings.small,
    },
    label: {
        fontStyle: "italic",
        color: color.palette.black + "aa",
    },
    textInput: {
        marginTop: spacings.tiny,
        fontSize: fontsize.medium,
        backgroundColor: color.primary + "22",
        borderRadius: spacings.borderRadius.small,
        paddingHorizontal: spacings.small,
    },
});

export const cardStyles = StyleSheet.create({
    card: {
        marginHorizontal: spacings.small,
        borderWidth: spacings.tiny - 1,
        borderColor: color.palette.red,
        borderRadius: spacings.borderRadius.smaller,
        height: spacings.cardHeight,
        backgroundColor: color.palette.white,
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.medium,
    },
});
