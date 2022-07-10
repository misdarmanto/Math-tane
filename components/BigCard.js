import React, { memo } from "react";
import { View } from "react-native";
import { heightDimensions } from "../global/Dimensions";
import { MainColor } from "../global/Color";

const BigCard = ({ children }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: heightDimensions(23),
        backgroundColor: MainColor,
        borderRadius: 10,
        marginVertical: heightDimensions(2),
      }}
    >
      {children}
    </View>
  );
};

export default memo(BigCard);
