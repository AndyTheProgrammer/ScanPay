import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, LayoutAnimation, StatusBar, FlatList, Button, Alert, Dimensions } from "react-native";
import * as firebase from 'firebase'
import { firestore } from 'firebase';
//import { FlatList } from "react-native-gesture-handler";
import flatList from "../data/flatList";
import Swipeout from 'react-native-swipeout';
import { color } from "react-native-reanimated";

class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        }
    }


    render() {

        const { item } = this.props;
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                this.setState({ activeRowKey: null })
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key })
            },
            right: [
                {
                    onPress: () => {
                        Alert.alert(
                            'Alert',
                            'Are your sure you want to delete ?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel pressed'), style: 'Cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        const db = firestore();
                                        db.collection("customers")
                                            .get()
                                            .then(res => {
                                                res.forEach(element => {
                                                    element.ref.delete();
                                                });
                                            });

                                    }
                                },
                            ],
                        )

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
                    flex: 1,
                    backgroundColor: this.props.index % 2 == 0 ? "#37474F" : '#263238',
                    //height: 132,
                    marginTop: 4,
                    alignItems: 'center'

                }}>
                    <Text style={styles.flatListData}> Product-Name - {this.props.item.name}</Text>
                    <Text style={styles.flatListData}> Unit-Price - {this.props.item.price}</Text>
                    <Text style={styles.flatListData}> Quantity -{this.props.item.Qty}</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Button title='Subtract' onPress={this.props.onSubtract} />
                        <Text style={styles.flatListData}>{item.Qty}</Text>
                        <Button title='Add' onPress={this.props.onAdd} />
                    </View>
                </View>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    flatListData: {
        color: 'white',
        padding: 10,
        fontSize: 16,
        fontWeight: '700',
    },
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

    button: {

        //width: 100,
        width: Dimensions.get('window').width,

        backgroundColor: '#37474F',
        // borderRadius: 30,
        paddingVertical: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        // alignItems: 'center',
        //justifyContent: 'flex-end',
        bottom: -5,
        fontWeight: '700',
        //left: 90

    },
    button3: {

        width: 200,
        //backgroundColor: '#E9446A',
        //borderRadius: 30,
        paddingVertical: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 3,
        alignItems: 'flex-end',
        //justifyContent: '',
        bottom: 10,
        fontWeight: '700',
        width: Dimensions.get('window').width

    },
})


export default class productList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            list: []
        });
        this.ref = firebase.firestore().collection('customers');

    }

    onSubtract = (item, index) => {
        var list = [...this.state.list];
        list[index].Qty -= 1;
        if (list[index].Qty >= 0) {
            this.setState({ list });
        } else {
            list[index].Qty = 0;
            alert('Quantity cannot be less than zero.');
        }
    }

    onAdd = (item, index) => {
        var list = [...this.state.list];
        list[index].Qty += 1;
        this.setState({ list });
    }

    componentDidMount() {
        this.show = this.ref.onSnapshot((querySnapshot) => {
            const listShow = [];
            querySnapshot.forEach((doc) => {
                listShow.push({
                    name: doc.data().itemName,
                    price: doc.data().itemPrice,
                    Qty: doc.data().itemQty
                })
                this.setState({
                    list: listShow
                })
            })
        })


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
        /*  firebase.firestore().collection('customers')
              .get().then(function (querySnapshot) {
                  var itemList = []
                  itemList.push(querySnapshot)
                  querySnapshot.forEach(function (doc) {
  
                      console.warn(doc.id, "=> ", doc.data());
  
                      //console.warn(itemList);
                  });
                  this.setState({ list: itemList });
              })
  */
    }


    render() {
        const { list } = this.state;
        let totalQuantity = 0;
        let totalPrice = 0;
        list.forEach((item) => {
            totalQuantity += item.Qty;
            totalPrice += item.Qty * item.price
                ;
        }
        )
        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: "#eceff1" }}>
                <Text style={{ fontWeight: "700", alignItems: 'center', left: 140, fontSize: 20, bottom: -20 }}>
                    Product-Cart
                  </Text>

                <FlatList
                    style={{ marginTop: 20, }}
                    data={this.state.list}
                    renderItem={({ item, index }) => {
                        return (<FlatListItem item={item} index={index}
                            onSubtract={() => this.onSubtract(item, index)}
                            onAdd={() => this.onAdd(item, index)}
                        >

                        </FlatListItem>)
                    }}
                />
                <Text style={styles.button3}> Total quantity: {totalQuantity}  </Text>
                <Text style={styles.button3} > Total Price: {totalPrice} </Text>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddSub')}>
                    <Text style={{ left: 90, fontSize: 16, fontWeight: "700", color: "#fff" }}> {"  Press here to Pay Bill "} k{totalPrice}</Text></TouchableOpacity>

            </View>

        );
    }
}

