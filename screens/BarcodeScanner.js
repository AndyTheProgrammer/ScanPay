import * as React from "react";
import { Text, View, StyleSheet, Button, Dimensions, StatusBar } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

import { BarCodeScanner } from "expo-barcode-scanner";
import { FlatList } from "react-native-gesture-handler";
import Scanner from "./Scanner";

export default class BarcodeScannerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      productId: [],
      scanner: true,
    };

  }


  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  showBarcodeScanner = () => {
    this.setState((previousState) => ({ scanner: !previousState.scanner }));
  };

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",

        }}
      >

        <StatusBar barStyle="light-content"></StatusBar>

        <View>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (

                <View
                  style={{
                    //flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                    backgroundColor:
                      "white"
                    //this.props.index % 2 == 0 ? "mediumseagreen" : "tomato",
                  }}>




                  <Text style={styles.flatList}>

                    {item.itemName}    Price- K{item.itemPrice}

                  </Text>
                  <Button
                    title={"Add items"}
                    color="#841584"
                    onPress={() =>
                      firebase.firestore().collection('customers').add({
                        itemName: item.itemName,
                        itemPrice: item.itemPrice,
                        itemQty: item.itemQty
                      })
                        .then(function (docRef) {

                          console.log("document written with ID", docRef.id);
                        })
                        .catch(function (error) {
                          console.error("error adding document:", error);
                        })

                    }
                  />


                </View>
              );
            }}
          />
        </View>
        {this.state.scanner && (
          <View style={{ flex: 10 }}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>

            <View style={styles.layerBottom} />
            {scanned && (

              <Button
                title={"Tap to Scan Again"}
                onPress={() => this.setState({ scanned: false })}
              />
            )}


          </View>
        )}

        <Button title="Scan"
          color="#E9446A"
          onPress={this.showBarcodeScanner} />

      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    //  alert(`Bar code with type ${type} and data ${data} has been scanned!`);


    if (data == 6001374025686) {

      firebase
        .database()
        .ref('items')
        .orderByKey()
        .equalTo("6001374025686")
        .once("value", (item) => {
          var li = [];

          item.forEach((child) => {
            li.push({
              key: child.key,
              itemName: child.val().itemName,
              itemPrice: child.val().itemPrice,
              itemQty: child.val().itemQty,
              itemDesc: child.val().itemDesc
            });
          });

          this.setState({ list: li });
          console.log(item.toJSON());


        });
    } else if (data == 6164000613210) {
      firebase
        .database()
        .ref('items')
        .orderByKey()
        .equalTo("6164000613210")
        .once("value", (item) => {
          var li = [];

          item.forEach((child) => {
            li.push({
              key: child.key,
              itemName: child.val().itemName,
              itemPrice: child.val().itemPrice,
              itemQty: child.val().itemQty,
              itemDesc: child.val().itemDesc
            });
          });
          this.setState({ list: li });
          console.log(item.toJSON());


        });
    } else if (data == 6949170500092) {
      firebase
        .database()
        .ref('items')
        .orderByKey()
        .equalTo("6949170500092")
        .once("value", (item) => {
          var li = [];

          item.forEach((child) => {
            li.push({
              key: child.key,
              itemName: child.val().itemName,
              itemPrice: child.val().itemPrice,
            });
          });
          this.setState({ list: li });
          console.log(item.toJSON());


        });
    } else if (data == 6291100713011) {
      firebase
        .database()
        .ref('items')
        .orderByKey()
        .equalTo("6291100713011")
        .once("value", (item) => {
          var li = [];

          item.forEach((child) => {
            li.push({
              key: child.key,
              itemName: child.val().itemName,
              itemPrice: child.val().itemPrice,
            });
          });
          this.setState({ list: li });
          console.log(item.toJSON());
        });
    } else {
      alert('Ensure you have scanned the Barcode properly.\nOtherwise product is not in Inventory');
    }
  }



  /* var product = firebase.firestore()
      .collection('items');
    var itemData = []
    product.doc(data)
      .get()
      .then(function (doc) {
        itemData.push(doc.data())
        console.warn('current data:', doc.data());
 
 
       
      })
      .catch(Error)
 
    this.setState({ productId: id });
 
    this.setState({ list: itemData });
 
 
  }
 */
  /*  firebase.firestore()
      .collection('items')
      .doc(data)
      .onSnapshot(function (doc) {
        console.warn('current data: ', doc.data());
      })
*/



};

/*  
 firebase.firestore()
      .collection('items')
      .doc(data)
      .get()
      .then(doc => {
        this.setState({list: doc.data().items });
        //console.warn('current data ', doc.data());
        console.warn(list);
      });




if (data == 6001374025686) {

    firebase
      .database()
      .ref('items')
      .orderByKey()
      .equalTo("6001374025686")
      .once("value", (item) => {
        var li = [];

        item.forEach((child) => {
          li.push({
            key: child.key,
            itemName: child.val().itemName,
            itemPrice: child.val().itemPrice,
          });
        });

        this.setState({ list: li });
        console.log(item.toJSON());


      });
  } else if (data == 3607342734074) {
    firebase
      .database()
      .ref('items')
      .orderByKey()
      .equalTo("3607342734074")
      .once("value", (item) => {
        var li = [];

        item.forEach((child) => {
          li.push({
            key: child.key,
            itemName: child.val().itemName,
            itemPrice: child.val().itemPrice,
          });
        });
        this.setState({ list: li });
        console.log(item.toJSON());


      });
  } else if (data == 6949170500092) {
    firebase
      .database()
      .ref('items')
      .orderByKey()
      .equalTo("6949170500092")
      .once("value", (item) => {
        var li = [];

        item.forEach((child) => {
          li.push({
            key: child.key,
            itemName: child.val().itemName,
            itemPrice: child.val().itemPrice,
          });
        });
        this.setState({ list: li });
        console.log(item.toJSON());


      });
  } else if (data == 6291100713011) {
    firebase
      .database()
      .ref('items')
      .orderByKey()
      .equalTo("6291100713011")
      .once("value", (item) => {
        var li = [];

        item.forEach((child) => {
          li.push({
            key: child.key,
            itemName: child.val().itemName,
            itemPrice: child.val().itemPrice,
          });
        });
        this.setState({ list: li });
        console.log(item.toJSON());
      });
  } else {
    alert('Ensure you have scanned the Barcode properly\nOtherwise product is not in INventory');
  }
} 
/* if (data == 8904115500108) {
   alert("Product successfully Scanned, Check itemList below");
 }
 else {
   alert("product is not available");
 }
     */




const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
  flatList: {
    color: "black",
    padding: 10,
    fontSize: 20,
    fontWeight: "500"
  },


});
