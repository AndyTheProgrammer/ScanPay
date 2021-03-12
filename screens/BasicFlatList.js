import React from 'react';
import { View, Text, FlatList, Button, SafeAreaView, processColor, StyleSheet, Alert, RefreshControl, StatusBar } from 'react-native';
import flatList from "../data/flatList";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
//import Swipeout from "react-native-swipeout";
import * as firebase from 'firebase';
const products = flatList;

class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeRowwKey: null,
      refreshing: false,
      list: []
    }
    // var getItem = props.navigation.getParam('itemList')
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }
  render() {
    const { item } = this.props;

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        this.setState({ activeRowwKey: null });

      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowwKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                { text: 'No', onPress: () => console.log('Cancel pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    flatList.splice(this.props.index, 1);

                  }
                },
              ],
              { cancelable: true }
            );

          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    return (

      <Swipeout {...swipeSettings}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor:
            this.props.index % 2 == 0 ? "mediumseagreen" : "tomato",
        }}>
          <StatusBar barStyle="light-content"></StatusBar>
          <View style={{
            flexDirection: 'row', flex: 0, alignItems: 'center',
          }}>
            <Text style={styles.buttonText}>{this.props.item.name} - </Text>
            <Text style={styles.buttonText}>k {this.props.item.price}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button title="Subtract" onPress={this.props.onSubtract} />
            <Text>{item.quantity}</Text>
            <Button title="Add" onPress={this.props.onAdd} />
          </View>
        </View>
      </Swipeout>
    )
  }
}

class App extends React.Component {
  state = {
    products,

  }
  componentDidMount() {
    /*  var product = firebase.firestore()
        .collection('customers');
      var itemData = []
      product.doc()
        .get()
        .then(function (doc) {
          itemData.push(doc.data())
          console.warn('current data:', doc.data());
  
  
  
  
        })
        .catch(Error)
      this.setState({ list: itemData })*/
    firebase.firestore().collection('customers')
      .get().then(function (querySnapshot) {
        var itemList = []
        itemList.push(querySnapshot)
        querySnapshot.forEach(function (doc) {

          console.warn(doc.id, "=> ", doc.data());

          //console.warn(itemList);
        })
        this.setState({ list: itemList });
      })

  }


  onSubtract = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity -= 1;
    this.setState({ products });
  }

  onAdd = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity += 1;
    this.setState({ products });
  }

  render() {
    const { products } = this.state;
    let totalQuantity = 0;
    let totalPrice = 0;
    products.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    })

    return (
      <SafeAreaView style={{ flex: 1 }}
      >
        <FlatList
          data={this.state.list}
          renderItem={({ item, index }) => (

            <ListItem style={{ flex: 1, }}

              item={item}
              onSubtract={() => this.onSubtract(item, index)}
              onAdd={() => this.onAdd(item, index)}
            />
          )}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh} />}

        />
        <Text style={styles.flatList}>Total Quantity: {totalQuantity}</Text>
        <Text style={styles.flatList}>Total Price: {totalPrice}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddSub')}>
          <Text style={styles.flatList}> {"Press here to Pay Bill "} k{totalPrice}</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  flatList: {
    color: "green",
    padding: 15,
    fontSize: 16,
    flex: 0
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
    marginVertical: 10,
    // padding: 15,
    textAlign: 'center'

  },
})
export default App;