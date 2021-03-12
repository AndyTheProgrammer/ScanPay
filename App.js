import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import BarcodeScanner from "./screens/BarcodeScanner";
import BasicFlatList from "./screens/BasicFlatList";
import AddSubscription from "./screens/AddSubscription";


import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import productList from './screens/productList';





var firebaseConfig = {
  apiKey: "AIzaSyDdFFH2Tr5CsNYO4nxPWBInsQYga0_7ITM",
  authDomain: "scanapp-1a00c.firebaseapp.com",
  databaseURL: "https://scanapp-1a00c.firebaseio.com",
  projectId: "scanapp-1a00c",
  storageBucket: "scanapp-1a00c.appspot.com",
  messagingSenderId: "362364115809",
  appId: "1:362364115809:web:0e8c5130ab1be8f7230320",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, {});
}

/*firebase.database().ref('items/001').set(
  {
    name: 'Milk',
    age: 50
  }
).then(() => {
  console.log('Inserted !');

}
).catch((error) => {
  console.log(error);
});
*/
/* firebase.database().ref('items').once('value', (data) => {
  console.log(data.toJSON());
})
*/
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
      }
    },
    Barcode: {
      screen: BarcodeScanner,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-barcode" size={24} color={tintColor}></Ionicons>
      }
    },
    List: {
      screen: productList,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list" size={24} color={tintColor}></Ionicons>
      }
    },
    Payment: {
      screen: AddSubscription,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-card" size={24} color={tintColor}></Ionicons>
      }
    }
  },

  {}
);
const AppStack = createStackNavigator({


  AddSub: AddSubscription,


});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
      Stack: AppStack
    },
    {
      initialRouteName: "Loading",
    }
  )
);
