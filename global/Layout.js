import React from "react";
import { View } from "react-native";
import { widthDimensions } from "./Dimensions";

const Layout = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: widthDimensions(5),
        backgroundColor: "#FFF",
      }}
    >
      {children}
    </View>
  );
};

export default Layout;
