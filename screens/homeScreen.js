import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import title from "../assets/starWars.png";
import { ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_FILM = "@ffkey";
const FAVORITE_VEHICLE = "@fvkey";
const FAVORITE_STARSHIP = "@fskey";

function HomeScreen() {
  let [expanded1, setExpanded1] = useState(false);
  let [expanded2, setExpanded2] = useState(false);
  let [expanded3, setExpanded3] = useState(false);
  let [film, setFilm] = useState([]);
  let [star, setStar] = useState([]);
  let [vehicle, setVehicle] = useState([]);
  let Films = [];
  let StarShips = [];
  let Vehicles = [];

  const consultFavoriteFilms = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_FILM);
      Films = jsonValue != null ? JSON.parse(jsonValue) : null;
      setFilm(Films);
    } catch (err) {
      console.log(err);
    }
  };
  const consultFavoriteStarShips = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_STARSHIP);
      StarShips = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStar(StarShips);
    } catch (err) {
      console.log(err);
    }
  };
  const consultFavoriteVehicles = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_VEHICLE);
      Vehicles = jsonValue != null ? JSON.parse(jsonValue) : null;
      setVehicle(Vehicles);
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteFilms = async () => {
    try {
      await AsyncStorage.removeItem(FAVORITE_FILM);
      alert("Se eliminaron todos los favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteStarShips = async () => {
    try {
      await AsyncStorage.removeItem(FAVORITE_STARSHIP);
      alert("Se eliminaron todos los favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteVehicles = async () => {
    try {
      await AsyncStorage.removeItem(FAVORITE_VEHICLE);
      alert("Se eliminaron todos los favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <Image source={title} />
      </View>
      <View>
        <Text style={styles.PresentationText}>
          welcome to the most satisfalling experience in the startWars Universe
        </Text>
      </View>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Films Favoritos</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded1}
        onPress={() => {
          consultFavoriteFilms();
          setExpanded1(!expanded1);
        }}
        onLongPress={() => {
          clearFavoriteFilms();
        }}
      >
        {film != null
          ? film.map((film) => {
              return (
                <ListItem key={film.id} style={{ backgroundColor: "#f2efe2" }}>
                  <ListItem.Content>
                    <ListItem.Title>{film.title}</ListItem.Title>
                    <ListItem.Subtitle>{film.character}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
          : null}
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>StarShips Favoritos</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded2}
        onPress={() => {
          consultFavoriteStarShips();
          setExpanded2(!expanded2);
        }}
        onLongPress={() => {
          clearFavoriteStarShips();
        }}
      >
        {star != null
          ? star.map((starship) => {
              return (
                <ListItem
                  key={starship.id}
                  style={{ backgroundColor: "#f2efe2" }}
                >
                  <ListItem.Content>
                    <ListItem.Title>{starship.name}</ListItem.Title>
                    <ListItem.Subtitle>{starship.model}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
          : null}
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Vehicles Favoritos</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded3}
        onPress={() => {
          consultFavoriteVehicles();
          setExpanded3(!expanded3);
        }}
        onLongPress={() => {
          clearFavoriteVehicles();
        }}
      >
        {vehicle != null
          ? vehicle.map((vehic) => {
              return (
                <ListItem key={vehic.id} style={{ backgroundColor: "#f2efe2" }}>
                  <ListItem.Content>
                    <ListItem.Title>{vehic.name}</ListItem.Title>
                    <ListItem.Subtitle>{vehic.model}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
          : null}
      </ListItem.Accordion>
      <View>
        <Text style={styles.SecondText}>may the force be with you!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2efe2",
  },

  image: {
    paddingTop: 100,
    alignItems: "center",
  },

  PresentationText: {
    paddingTop: 40,
    color: "#000000",
    fontSize: 22,
    textAlign: "center",
  },
  SecondText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
