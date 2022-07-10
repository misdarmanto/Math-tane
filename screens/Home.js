import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card";

import TextStyle from "../components/TextStyle";
import Layout from "../global/Layout";
import { FontAwesome5 } from "@expo/vector-icons";
import { heightDimensions } from "../global/Dimensions";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const choices = (operator, range) => {
    navigation.navigate("Quiz", { operator, range });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Card onPress={() => choices("*")}>
          <TextStyle>x</TextStyle>
        </Card>
        <Card onPress={() => choices(":")}>
          <FontAwesome5 name="divide" size={30} color="#FFF" />
        </Card>
        <Card onPress={() => choices("+")}>
          <TextStyle>+</TextStyle>
        </Card>
        <Card onPress={() => choices("-")}>
          <TextStyle>-</TextStyle>
        </Card>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: heightDimensions(20),
  },
});
