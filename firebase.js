import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBLeqttKymqd6pR8k8PXi-qjA68INFwShw",
    authDomain: "uber-eats-1fadb.firebaseapp.com",
    projectId: "uber-eats-1fadb",
    storageBucket: "uber-eats-1fadb.appspot.com",
    messagingSenderId: "878483068601",
    appId: "1:878483068601:web:577d9b219aa5b482d1ad68",
    measurementId: "G-RMCS6NYWSY",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
