import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, LayoutAnimation, StatusBar } from "react-native";
import * as firebase from 'firebase'
export default class HomeScreen extends React.Component {

  state = {
    email: "",
    displayName: ""
  }



  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser

    this.setState({ email, displayName });
  }

  signOutUser = () => {


    firebase.auth().signOut();
  };

  render() {

    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={{
          bottom: -50, fontFamily: "sans-serif",
          fontStyle: "italic", fontWeight: "700",
          fontSize: 16,

        }}>Welcome To ScanNPay, Happy Shopping!</Text>
        <Image
          source={require('../data/logo3.jpg')}
          style={{ width: 300, height: 300, paddingVertical: 20, bottom: -90 }} />






        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Barcode")}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={this.signOutUser}>
          <Text style={styles.buttonText}> Logout </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
    alignItems: "center",

  },
  buttonText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#ffffff',
    marginVertical: 1,
    textAlign: 'center'
  },
  button2: {

    width: 250,
    backgroundColor: '#E9446A',
    borderRadius: 30,
    paddingVertical: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: -100

  },

  button: {

    width: 300,
    backgroundColor: '#E9446A',
    borderRadius: 30,
    paddingVertical: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: -100

  },
  logoText1: {

    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',

  }
});
