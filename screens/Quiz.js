import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Card from "../components/Card";
import BigCard from "../components/BigCard";
import TextStyle from "../components/TextStyle";
import Layout from "../global/Layout";
import { generateQuestions } from "../functions/GenerateQuestions";
import { buttonGenerator } from "../functions/ButtonGenerator";
import { Entypo } from "@expo/vector-icons";
import { heightDimensions} from "../global/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ContextApi } from "../functions/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BannerAd from "../AdMob/BannerAd";
import ProgressStyle from "../components/ProgressStyle";
import RewardedAd from "../AdMob/RewardedAd";
import { saveLevel, saveScore } from "../functions/SaveData";

const Quiz = ({ route }) => {
  const { operator } = route.params;
  const [question, setQuestion] = useState("");
  const [button, setButton] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isCorect, setIsCorect] = useState(false);
  const [riview, setRiview] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);
  const [counter, setCounter] = useState(1);
  const [displayAd, setDisplayAd] = useState(1);
  const [level, setLevel] = useState(10);
  const navigation = useNavigation();
  const { pauseTimer, setPauseTimer } = useContext(ContextApi);
  const [score, setScore] = useState(0);

  const KEY_SCORE = "@score" + level + operator;
  const KEY_LEVEL = "@level" + operator;

  const showLevel = () => {
    pauseTimer ? setPauseTimer(false) : setPauseTimer(true);
    navigation.navigate("Level", { operator, setLevel });
  };

  const getData = async () => {
    try {
      const scoreValue = await AsyncStorage.getItem(KEY_SCORE);
      if (scoreValue !== null) {
        setScore(parseInt(scoreValue));
      } else {
        setScore(0);
      }
      const levelValue = await AsyncStorage.getItem(KEY_LEVEL);
      if (levelValue !== null) {
        setLevel(parseInt(levelValue));
      } else {
        setLevel(10);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const finish = () => {
    setLevel(level + 10);
    saveLevel(KEY_LEVEL, level + 10);
  };

  const renderQuiz = () => {
    if (displayAd % 300 === 0) {
      RewardedAd();
    }
    setCounter(1);
    const { getValueXY, addition, multiply, divide, subtraction } =
      generateQuestions(level);
    switch (operator) {
      case "*":
        setQuestion(`${getValueXY.x} x ${getValueXY.y} =`);
        setButton(buttonGenerator(multiply));
        setCorrectAnswer(multiply);
        break;
      case ":":
        setQuestion(`${divide.XValue} : ${divide.YValue} =`);
        setButton(buttonGenerator(divide.result));
        setCorrectAnswer(divide.result);
        break;
      case "+":
        setQuestion(`${getValueXY.x} + ${getValueXY.y} =`);
        setButton(buttonGenerator(addition));
        setCorrectAnswer(addition);
        break;
      case "-":
        setQuestion(`${getValueXY.x} - ${getValueXY.y} =`);
        setButton(buttonGenerator(subtraction));
        setCorrectAnswer(subtraction);
        break;
    }
  };

  const buttonOnclick = (btnChoice, index) => {
    if (score === 1000) {
      setPauseTimer(true)
      Alert.alert("Finish", `Your Score: ${score}`, [
        {
          text: "Retry",
          onPress: () => {
            saveScore(KEY_SCORE, 0);
            setScore(0)
            setPauseTimer(false)
          },
          style: "cancel",
        },
        {
          text: "Next Level",
          onPress: () => {
            saveScore(KEY_SCORE, 0);
            finish();
            setPauseTimer(false)
            RewardedAd();
          },
        },
      ]);
     
    }
    setDisplayAd(displayAd + 1);
    setRiview(true);
    setBtnIndex(index);
    if (btnChoice === correctAnswer) {
      setIsCorect(true);
      setScore(score + 10);
      saveScore(KEY_SCORE, score);
    } else {
      setIsCorect(false);
      score !== 0 && setScore(score - 10);
    }

    setTimeout(() => {
      renderQuiz();
      setRiview(false);
      setBtnIndex(0);
    }, 1000);
  };

  useEffect(() => {
    getData();
    renderQuiz();
  }, [level]);

  return (
    <Layout>
      <View style={styles.score}>
        <TextStyle style={{ color: "#AEADAD", fontSize: 18 }}>
          Score: {score}
        </TextStyle>
        <TextStyle style={{ color: "#AEADAD", fontSize: 18 }}>
          Level : {`${level / 10}`}
        </TextStyle>
      </View>
      <View style={styles.progress}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={40} color="#BDBCBC" />
        </TouchableOpacity>
        <ProgressStyle
          quiz={renderQuiz}
          counter={counter}
          setCounter={setCounter}
        />
        <Ionicons
          name="md-grid-outline"
          size={30}
          color={"#BDBCBC"}
          onPress={showLevel}
        />
      </View>
      <BigCard>
        <TextStyle>{question}</TextStyle>
      </BigCard>
      <View style={styles.container}>
        {button.map((value, index) => (
          <View key={index}>
            {!riview ? (
              <Card onPress={() => buttonOnclick(value, index)}>
                <TextStyle>{value + ""}</TextStyle>
              </Card>
            ) : (
              <Card>
                {btnIndex === index && isCorect && (
                  <Entypo name="check" size={50} color="#FFF" />
                )}
                {btnIndex === index && !isCorect && (
                  <Entypo name="cross" size={50} color="#FFF" />
                )}
                {btnIndex !== index && <TextStyle>{value + ""}</TextStyle>}
              </Card>
            )}
          </View>
        ))}
      </View>
      <View style={styles.bannerAdd}>
        <BannerAd />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  score: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: heightDimensions(8),
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: heightDimensions(2),
  },
  bannerAdd: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: heightDimensions(6),
  },
});

export default Quiz;
