import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";
import RewardedAd from "../AdMob/RewardedAd";
import Card from "../components/Card";
import TextStyle from "../components/TextStyle";
import { ContextApi } from "../functions/Context";
import Layout from "../global/Layout";
import { saveLevel } from "../functions/SaveData";

const Level = ({ route }) => {
  const { operator, setLevel } = route.params;
  const KEY_LEVEL = "@level" + operator;
  const navigation = useNavigation();
  const { setPauseTimer } = useContext(ContextApi);
  const level = [];

  let i = 1;
  for (i; i <= 50; i++) {
    level.push(i);
  }

  useEffect(() => {
    return () => {
      setPauseTimer(false);
    };
  }, []);

  const changeLevel = (value) => {
    setLevel(value);
    saveLevel(KEY_LEVEL, value);
    navigation.goBack();
    RewardedAd()
  };
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {level.map((data, index) => (
            <Card onPress={() => changeLevel(data * 10)} key={index}>
              <TextStyle>{data}</TextStyle>
              <TextStyle style={{ fontSize: 18 }}>Level</TextStyle>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Level;
