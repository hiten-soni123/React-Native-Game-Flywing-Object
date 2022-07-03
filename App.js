import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import { TouchableOpacity } from "react-native-web";
export default function App() {
  const [running, setRunning] = useState(false);
  const [GameEngine, setGameEngine] = useState(null);
  const [currentPoints, setcCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={{ Physics }}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game over":
              setRunning(false);
              GameEngine.stop();

              break;
            case "new_point":
              setcCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />{" "}
      </GameEngine>
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              GameEngine.swap(entities());
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 30,
              }}
            >
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
