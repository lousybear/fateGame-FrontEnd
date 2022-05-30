import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { RootTabScreenProps } from "../types";
import LottieView from "lottie-react-native";
import React, { useRef, useEffect, useState } from "react";
import coinFlip from "./93966-coin-flip-animation.json";
import dollarCoin from "./../assets/images/1590-coin-flip.json";
import dollarNote from "./../assets/images/dollar.jpg";
//import coinToss from "./../assets/images/23227-coin-flip-rupee.json";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const animation = useRef(null);
  const [showLottie, setShowLottie] = useState(2);
  const [currentSelectedAmount, setCurrentSelectedAmount] = useState<Number>(0);
  const betAmount = ["10", "20", "50", "100", "500"];

  const addMoney = (amount: Number) => {
    const newAmount = currentSelectedAmount + amount;
    setCurrentSelectedAmount(newAmount);
  };

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      {/* {showLottie == 1 ? (
        <LottieView
          onAnimationFinish={() => {
            setShowLottie(1);
          }}
          ref={animation}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#000",
          }}
          source={coinFlip}
        />
      ) : null}
      {showLottie == 2 ? (
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 200,
            height: 300,
            backgroundColor: "#000",
          }}
          source={dollarCoin}
        />
      ) : null} */}

      <View
        style={{
          flexWrap: "wrap",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {betAmount.map((amount, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ margin: 10 }}
              onPress={() => {
                const currentAmount = amount;
                addMoney(Number(currentAmount));
              }}
            >
              <Image
                style={{ width: 80, height: 50 }}
                source={dollarNote}
                key={index}
              />
              <Text
                style={{
                  color: "black",
                  position: "absolute",
                  fontWeight: "700",
                  fontSize: 20,
                  left: "30%",
                  top: "26%",
                }}
              >
                ₹{amount}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.xflex}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            runAnimFrame(19, 45);
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>HEAD</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 50, color: "white", fontWeight: "600" }}>
          ₹{currentSelectedAmount}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            animation.current.pause();
            setShowLottie(1);
            runAnimFrame(0, 19);
          }}
        >
          <Text style={{ color: "white" }}>TAIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function runAnimFrame(startFrame: number, endFrame: number) {
    animation.current.play(startFrame, endFrame);
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#000",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  xflex: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginHorizontal: 20,
    position: "absolute",
    bottom: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "green",
    color: "white",
    margin: 10,
    borderRadius: 6,
  },
});
