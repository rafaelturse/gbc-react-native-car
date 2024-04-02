import { Pressable, Text, StyleSheet } from "react-native";

const StyledButton = ({ text, action, secondary, small, accept, reject }) => {
  return (
    <Pressable
      style={[
        styles.button,
        secondary && styles.secondaryStyles,
        small && styles.smallStyles,
        accept && styles.accept,
        reject && styles.reject,
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
    height: 45,
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
  secondaryStyles: {
    shadowColor: "#fca311",
    borderColor: "#fca311",
    marginBottom: 10,
  },
  smallStyles: {
    height: "auto",
    marginRight: 20,
    flex: 0,
  },
  accept: {
    flex: 1,
    shadowColor: "#6a994e",
    borderColor: "#6a994e",
  },
  reject: {
    flex: 1,
    shadowColor: "#bc4749",
    borderColor: "#bc4749",
  },
});

export default StyledButton;
