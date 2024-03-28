import { Pressable, Text, StyleSheet } from "react-native";

const StyledButton = ({ text, action, secondary, small }) => {
  return (
    <Pressable
      style={[
        styles.button,
        secondary && styles.alternateColor,
        small && { height: "auto" },
      ]}
      onPress={action && action}
    >
      <Text style={[styles.buttonText, small && { fontSize: 16 }]}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: "#284b63",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "#284b63",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#284b63",
    textAlign: "center",
  },
  alternateColor: {
    shadowColor: "#fca311",
    borderColor: "#fca311",
  },
});

export default StyledButton;
