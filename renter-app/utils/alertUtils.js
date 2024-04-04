import { Alert } from "react-native"

export const primaryAlert = (title, message, log) => {
    return (
        Alert.alert(
            title, message,
            [{ text: 'OK', onPress: () => console.log(log) }],
            { cancelable: false }
        )
    )
}

export const showAlert = (title, message, action) => {
    Alert.alert(title, message, [{ text: "OK", onPress: action }], {
        cancelable: false,
    })
}