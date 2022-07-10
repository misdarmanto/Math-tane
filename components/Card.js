import React from "react";
import { Pressable } from "react-native";
import { heightDimensions, widthDimensions } from "../global/Dimensions";
import { MainColor } from "../global/Color";

const Card = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: heightDimensions(18),
        width: widthDimensions(38),
        backgroundColor: MainColor,
        borderRadius: 10,
        marginVertical: heightDimensions(2),
       
      }}
    >
      {children}
    </Pressable>
  );
};

export default Card;
