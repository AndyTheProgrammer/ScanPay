import * as firebase from 'firebase';





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
    firebase.initializeApp({});
}

export default firebaseConfig;