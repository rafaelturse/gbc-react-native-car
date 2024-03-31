import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const StyledTextInput = ({ value, onChangeText, label }) => {
  const [borderWidth, setBorderWidth] = useState(2);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setBorderWidth(3);
    setIsFocused(true);
  };
  const handleBlur = () => {
    setBorderWidth(2);
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={isFocused || value ? styles.label : styles.placeholder}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, { borderBottomWidth: borderWidth }]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexGrow: 1,
    height: 45,
    marginBottom: 10,
  },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 9,
    color: "#284b63",
    fontSize: 12,
  },
  placeholder: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 9,
    color: "#284b63aa",
    fontSize: 16,
    pointerEvents: "none",
  },
  input: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "#284b63",
    borderBottomWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default StyledTextInput;
