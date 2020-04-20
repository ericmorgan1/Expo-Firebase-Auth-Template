import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { AuthNavigator, MainTabNavigator } from './navigation';
import ApiKeys from './constants/ApiKeys';

export default class AppCore extends React.Component {
    
  constructor(props) {
    super(props);
    
    this.state = {
      isAuthenticated: false,       // True if an authenticated user is logged in
    };

    // Listen for firebase auth changes...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  
  // Occurs when Firebase AuthState has changed...
  onAuthStateChanged = (user) => {
    this.setState({isAuthenticated: !!user});
  }

  renderCore() {
    // Render based on authentication...
    return (
        <NavigationContainer>
            {(this.state.isAuthenticated) ? <MainTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/*Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />*/}
        {this.renderCore()}
      </View>
    );
  }    
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', },
  statusBarUnderlay: { height: 24, backgroundColor: 'rgba(0,0,0,0.2)', },
});