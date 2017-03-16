import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
     state = { loggedIn: null };

     componentWillMount() {
          firebase.initializeApp({
              apiKey: 'AIzaSyDIoQ1VeXsGGYQlX_7BEblmvp_n4FnXMhc',
              authDomain: 'authentication-8f6f3.firebaseapp.com',
              databaseURL: 'https://authentication-8f6f3.firebaseio.com',
              storageBucket: 'authentication-8f6f3.appspot.com',
              messagingSenderId: '955498918184'
            });

          firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                    this.setState({ loggedIn: true });
               } else {
                    this.setState({ loggedIn: false });
               }
          });
     }

     renderContent() {
          switch (this.state.loggedIn) {
               case true:
                    return (
                         <View style={styles.buttonContainerStyle}>
                              <Button onPress={() => firebase.auth().signOut()}>
                                   Log Out
                              </Button>
                         </View>
                    );
               case false:
                    return <LoginForm />;
               default:
                    return <Spinner size="large" />;
          }
     }

     render() {
          return (
               <View>
                    <Header headerText="Authentication" />
                    {this.renderContent()}
               </View>
          );
     }

}

const styles = {
     buttonContainerStyle: {
          flexDirection: 'row'
     }
};

export default App;
