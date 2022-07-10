import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Quiz from "./screens/Quiz";
import Level from "./screens/Level";
import { ContextApi } from "./functions/Context";
import { LogBox, Text, TouchableOpacity } from "react-native";
import _ from "lodash";
import { AntDesign, Entypo } from "@expo/vector-icons";
import onShare from "./functions/shareFunction";
import { riviewPlayStore } from "./functions/priviewPlayStore";
import { Gray } from "./global/Color";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const Stack = createNativeStackNavigator();

function App() {
  const [pauseTimer, setPauseTimer] = useState(false);

  return (
    <ContextApi.Provider value={{ pauseTimer, setPauseTimer }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={riviewPlayStore}>
                  <AntDesign name="star" size={35} color={"gray"} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={onShare}>
                  <Entypo name="share" size={35} color={"gray"} />
                </TouchableOpacity>
              );
            },
            title: "",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Level"
            component={Level}
            options={{
              headerTintColor: "#AEADAD",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApi.Provider>
  );
}

export default App;
