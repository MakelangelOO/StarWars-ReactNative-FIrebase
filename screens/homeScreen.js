import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import title from "../assets/starWars.png";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={title} />
      </View>
      <View>
        <Text style={styles.PresentationText}>
          welcome to the most satisfalling experience in the startWars Universe
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2efe2",
    alignItems: "center",
  },

  image: {
    paddingTop: 100,
  },

  PresentationText: {
    paddingTop: 40,
    color: "#000000",
    fontSize: 22,
    textAlign: "center",
  },
});

export default HomeScreen;
