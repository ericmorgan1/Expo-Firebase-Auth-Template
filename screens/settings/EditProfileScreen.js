import React from 'react';
import { StyleSheet, View, ScrollView, Text, Keyboard, KeyboardAvoidingView, Button, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyledTextInput, ListItem } from './../../components/generic';
import { AuthFirebaseApi, UserFirebaseApi } from './../../api';

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      userData: { },
    };
  }

  // Sets up header buttons and loads data...
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => <Button title="Close" onPress={() => this.props.navigation.goBack()} />,
      headerRight: () => <Button title="Save" onPress={this.onSavePress} />
    });

    // Watch user data so it updates if they change their email in another screen...
    var userID = AuthFirebaseApi.getCurrentUserID();
    UserFirebaseApi.watchUserData(userID, this.onLoadUserDataSuccess, this.onLoadUserDataFailure);
  }

  // Occurs when user data is loaded successfully...
  onLoadUserDataSuccess = (snapshot) => {
    // Get the user data, or else set it to a blank object...
    var userData = snapshot.val();
    if (!userData) { userData = { }; }

    this.setState({isLoading: false, userData: userData});
  }

  // Occurs when there is an error loading user data...
  onLoadUserDataFailure = (error) => {
    this.setState({isLoading: false});
    console.log(error);
  }

  // "Update Email" button...
  onUpdateEmailPress = () => {
    this.props.navigation.navigate("UpdateEmail");
  }

  // "Update Password" button...
  onUpdatePasswordPress = () => {
    this.props.navigation.navigate("UpdatePassword");
  }
  
  // "Save Profile" button...
  onSavePress = () => {
    // Remove on-screen keyboard...
    Keyboard.dismiss();

    // Try to update user data...
    this.setState({isLoading: true});
    var userID = AuthFirebaseApi.getCurrentUserID();
    UserFirebaseApi.updateUserData(userID, this.state.userData)
      .then(this.onUpdateUserDataSuccess)
      .catch(this.onUpdateUserDataFailure);
  }

  // "Logout" button...
  onLogoutPress = () => { AuthFirebaseApi.signOut(); }

  // Occurs when user data is successfully updated...
  onUpdateUserDataSuccess = () => {
    // Clear loading, alert user, and go back...
    this.setState({ isLoading: false });
    Alert.alert("User data was successfully updated");
  }

  // Occurs when user data fails to update...
  onUpdateUserDataFailure = () => {
    this.setState({ isLoading: false });
    Alert.alert("User data could not be updated");
  }

  // Renders a list item button...
  renderListItem(onPress, title) {
    return (
      <ListItem onPress={onPress}>
        <View style={styles.listItemLeft}>
          <Text>{title}</Text>
        </View>
        <View style={styles.listItemRight}>
          <Ionicons name="ios-arrow-forward" color="#ddd" size={20} />
        </View>
      </ListItem>
    );
  }

  // Renders the "Update Email" and "Update Password" buttons if user is Email/Password authenticated (so Guest accounts won't see this)...
  renderUpdateEmailPassword() {
    // If not Password authenticated, return a blank view...
    const isPasswordAuth = AuthFirebaseApi.isCurrentUserPasswordAuthenticated();
    if (!isPasswordAuth) { return <View />; }

    // Otherwise, return the buttons...
    return (
      <View style={{flex: 1, alignSelf: "stretch"}}>
        {this.renderListItem(this.onUpdateEmailPress, this.state.userData.email || "Update Email")}
        <View style={{paddingTop: 10}} />
        {this.renderListItem(this.onUpdatePasswordPress, "Update Password")}
      </View>
    );
  }

  render() {
    const isGuest = AuthFirebaseApi.isCurrentUserAnonymouslyAuthenticated();

    return (
      <ScrollView style={{backgroundColor: "#fff" }}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>

          <StyledTextInput
            placeholder="Display Name"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.userData.displayName}
            onChangeText={(text) => { 
              var userData = this.state.userData;
              userData.displayName = text;
              this.setState({userData: userData});
            }}
          />
        
          {this.renderUpdateEmailPassword()}
         
          <View style={{paddingTop: 20}} />
          <Button title="Logout" onPress={this.onLogoutPress} />

          <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  listItemLeft: {flex: 1, flexDirection: "row", justifyContent: "flex-start"},
  listItemRight: {flex: 1, flexDirection: "row", justifyContent: "flex-end"}
});