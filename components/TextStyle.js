import React from "react";
import { Text } from "react-native";

const TextStyle = ({ children, style }) => {
  return (
    <Text style={[{ fontSize: 35, fontWeight: "bold", color: "#FFF" }, style]}>
      {children}
    </Text>
  );
};


export default TextStyle;