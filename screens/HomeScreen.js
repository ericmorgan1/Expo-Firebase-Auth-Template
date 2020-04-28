import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native';
import { AuthFirebaseApi } from './../api';
import { GuestLoginBanner } from './../components/auth';

export default class HomeScreen extends React.Component {
    
    constructor(props) { 
        super(props);
        this.state = { };
    }

    renderGuestBanner() {
      const isGuest = AuthFirebaseApi.isCurrentUserAnonymouslyAuthenticated();
      if (!isGuest) { return <View />; }

      return (
        <GuestLoginBanner onSignupPress={() => {
          this.props.navigation.push("GuestSignup");
        }} />
      )
    }
    
    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.renderGuestBanner()}
                <View style={{paddingTop: 40 }} />
                <Text>Home Screen</Text>
            </ScrollView>
          </View>
        );
    }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 30,
    alignItems: "center"
  },
});
