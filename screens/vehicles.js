import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_VEHICLE = "@fvkey";

function Vehicles() {
  const [modalVisible, setModalVisible] = useState(false);
  const [info, setinfo] = useState([]);
  let [veh, setveh] = useState([]);
  let vehicles = [];
  let favorites = [];
  useEffect(() => {
    axios //peticion a la API para obtener las naves estelares
      .get("https://swapi.dev/api/vehicles")
      .then((response) => {
        response.data["results"].forEach((vehicle) => {
          vehicles.push({
            id: vehicle.url,
            name: vehicle.name,
            model: vehicle.model,
            cost: vehicle.cost_in_credits,
            speed: vehicle.max_atmosphering_speed,
            passengers: vehicle.passengers,
          });
        });
        setveh(vehicles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let showModal = (vehicle) => {
    setModalVisible(!modalVisible);
    setinfo(vehicle);
  };

  const saveFavorite = async (value) => {
    try {
      favorites.push(value);
      let jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem(FAVORITE_VEHICLE, jsonValue);
      alert("añadido a vehicles favoritos.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>VEHICLES</Text>
      {veh.map((vehicle) => {
        return (
          <ListItem
            key={veh.id}
            style={{ backgroundColor: "#f2efe2" }}
            onPress={() => showModal(vehicle)}
            onLongPress={() => saveFavorite(vehicle)}
          >
            <ListItem.Content>
              <ListItem.Title>{vehicle.name}</ListItem.Title>
              <ListItem.Subtitle>{vehicle.model}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
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
            <Text style={styles.modalText}>{info.name}</Text>
            <Text style={styles.modalText}>{`modelo: ${info.model}`}</Text>
            <Text
              style={styles.modalText}
            >{`costo en creditos: ${info.cost}`}</Text>
            <Text
              style={styles.modalText}
            >{`velocidad maxima: ${info.speed}`}</Text>
            <Text
              style={styles.modalText}
            >{`numero de pasageros: ${info.passengers}`}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
export default Vehicles;
