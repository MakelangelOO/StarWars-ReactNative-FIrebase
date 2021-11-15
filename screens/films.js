import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  View,
  Pressable,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

function Films() {
  let [films, setfilms] = useState([]); //guardan los estados de los Films de la API en tiempo de ejecucion.
  let filmv = []; //se utiliza para guardar toda la información proveniente de la API
  let [character, setcharacter] = useState([]); //guarda los estados de los nombres de los personajes
  const [modalVisible, setModalVisible] = useState(false); //guarda el estado de los modales para mostrar información de cada Film

  useEffect(() => {
    axios //peticion a la API para obtener las peliculas
      .get("https://swapi.dev/api/films")
      .then((response) => {
        response.data["results"].forEach((film) => {
          optainCharacters(film.characters[0]); //not working
          filmv.push({
            id: film.episode_id,
            title: film.title,
            character: character, //film.characters[0], //se pasa la ruta por el momento
          });
        });
        setfilms(filmv);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let optainCharacters = (route) => {
    //recive una ruta acerca de un personaje y devuelve su informacion
    axios
      .get(route)
      .then((response) => {
        setcharacter(response.data.name); //se toma solo el nombre del personaje
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FILMS</Text>
      {films.map((film) => {
        return (
          <ListItem
            key={film.id}
            style={{ backgroundColor: "#f2efe2" }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <ListItem.Content>
              <ListItem.Title>{film.title}</ListItem.Title>
              <ListItem.Subtitle>{film.character}</ListItem.Subtitle>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>{film.title}</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2efe2",
  },
  title: {
    paddingTop: 100,
    padding: 30,
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Films;
