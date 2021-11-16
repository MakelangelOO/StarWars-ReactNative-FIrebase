import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import title from "../assets/starWars.png";
import { ListItem, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_FILM = "@ffkey";
const FAVORITE_VEHICLE = "@fvkey";
const FAVORITE_STARSHIP = "@fskey";

function HomeScreen() {
  let [expanded1, setExpanded1] = useState(false);//se usa para expandir la lista de Films
  let [expanded2, setExpanded2] = useState(false);//se usa para expandir la lista de StarShips
  let [expanded3, setExpanded3] = useState(false);//se usa para expandir la lista de Vehicles
  let [film, setFilm] = useState([]);//se utiliza para poder mostrar los Films favoritos en las listas
  let [star, setStar] = useState([]);//se utiliza para poder mostrar los Starships favoritos en las listas
  let [vehicle, setVehicle] = useState([]);//se utiliza para poder mostrar los vehicules favoritos en las listas
  let Films = [];//guarda los Films favoritos
  let StarShips = [];//guarda los starships favoritos
  let Vehicles = [];//guarda los vehicles favoritos

  const consultFavoriteFilms = async () => {//esta funcion consulta los films favoritos guardados en Async Storage
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_FILM);
      Films = jsonValue != null ? JSON.parse(jsonValue) : null;
      setFilm(Films);
    } catch (err) {
      console.log(err);
    }
  };
  const consultFavoriteStarShips = async () => {//esta funcion consulta los starships favoritos guardados en Async Storage
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_STARSHIP);
      StarShips = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStar(StarShips);
    } catch (err) {
      console.log(err);
    }
  };
  const consultFavoriteVehicles = async () => {//esta funcion consulta los vehicles favoritos guardados en Async Storage
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITE_VEHICLE);
      Vehicles = jsonValue != null ? JSON.parse(jsonValue) : null;
      setVehicle(Vehicles);
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteFilms = async () => {//esta funcion elimina los films favoritos
    try {
      await AsyncStorage.removeItem(FAVORITE_FILM);
      alert("Se eliminaron todos los favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteStarShips = async () => {//esta funcion elimina los starships favoritos
    try {
      await AsyncStorage.removeItem(FAVORITE_STARSHIP);
      alert("Se eliminaron todos los favoritos");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFavoriteVehicles = async () => {//esta funcion elimina los vehicles favoritos
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
        theme={{ colors: "#f2efe2" }}
        content={
          <>
            <Icon name={"camera-roll"} />
            <ListItem.Content style={styles.list}>
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
                <ListItem key={film.id}>
                  <ListItem.Content style={styles.list}>
                    <ListItem.Title>{film.title}</ListItem.Title>
                    <ListItem.Subtitle>{film.character}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
          : null}
      </ListItem.Accordion>
      <ListItem.Accordion
        theme={{ colors: "#f2efe2" }}
        content={
          <>
            <Icon name={"flight"} />
            <ListItem.Content style={styles.list}>
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
                <ListItem key={starship.id}>
                  <ListItem.Content style={styles.list}>
                    <ListItem.Title>{starship.name}</ListItem.Title>
                    <ListItem.Subtitle>{starship.model}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
          : null}
      </ListItem.Accordion>
      <ListItem.Accordion
        theme={{ colors: "#f2efe2" }}
        content={
          <>
            <Icon name={"directions-car"} />
            <ListItem.Content style={styles.list}>
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
                <ListItem key={vehic.id} bottomDivider>
                  <ListItem.Content style={styles.list}>
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
    paddingVertical: 20,
    color: "#000000",
    fontSize: 22,
    textAlign: "center",
  },
  SecondText: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 20,
  },
  list: {
    alignItems: "center",
  },
});

export default HomeScreen;
