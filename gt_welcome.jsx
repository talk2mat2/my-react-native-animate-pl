import React from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  PanResponder,
} from "react-native";
// import Cart from './screens/Cart'
// import Home from './screens/Home'
import "react-native-gesture-handler";
// import Myprofile from './screens/MyProfile'
import { NavigationContainer } from "@react-navigation/native";
import NavigationMain from "./screens/Navigation.main";
export default function Gtwelcome() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  //animated.timing fnction takes two parameter, initial animated position and new xy position
  // Animated.timing(position, {
  //   toValue: { x: width / 4, y: height / 3 },
  //   useNativeDriver: true,
  //   speed: 3,
  //   duration: 1000,
  //   bounciness: 10,
  // }).start();

  //interpolate means increasing the value of output based on the % value of input
  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });
  const pan = PanResponder.create({
    //this set the position to the supplied x/y position
    onPanResponderRelease: () => {
      // position.setValue({ x: 0, y: 0 });
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        bounciness: 10,
      }).start();
    },
    onMoveShouldSetPanResponder: () => true,
    //this moves your animated view with response to pan dy dx value
    // onPanResponderMove: Animated.event(
    //   [null, { dx: position.x, dy: position.y }],
    //   { useNativeDriver: false }
    // ),
    onPanResponderMove: (e, gesture) =>
      position.setValue({ x: gesture.dx, y: gesture.dy }),
    // (e, c) => {
    //   // console.log("move", e);
    //   Animated.event([null, { dx: position.x, dy: position.y }]);
    // },
  });
  return (
    // <NavigationContainer><StatusBar/>
    // <NavigationMain/>
    // </NavigationContainer>

    <View style={styles.container}>
      <StatusBar />

      <Animated.View
        {...pan.panHandlers}
        style={{
          ...styles.block,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            // { rotate },
          ],
        }}
      >
        {/* <View style={styles.headbox}></View>
        <Text style={styles.LogotText}>GTBank</Text> */}
        <Image source={require("./assets/logo.jpg")} style={styles.logo} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#ffff",
  },
  block: {
    height: 150,
    width: 150,

    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    fontSize: 16,
    color: "grey",
  },
  headbox: {
    height: 40,
    width: 40,
    backgroundColor: "#ffff",
    position: "absolute",
    top: 9,
    right: 9,
  },
  LogotText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    height: 100 + "%",
    width: 100 + "%",
  },
});

//         // <View style={styles.container}>
// {/* <StatusBar/> */}
// {/* <Home/> */}
// {/* <Cart/> */}
// {/* <Myprofile/> */}
// <NavigationMain/>
//         {/* </View> */}
