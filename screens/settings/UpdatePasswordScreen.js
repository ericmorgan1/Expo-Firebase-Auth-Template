import React from 'react';
import { StyleSheet, View, Text, ScrollView, Keyboard, KeyboardAvoidingView, Button, Alert, ActivityIndicator } from 'react-native';
import { PasswordTextInput } from './../../components/generic/TextInputs';
import { AuthFirebaseApi } from './../../api';

export default class UpdatePasswordScreen extends React.Component {

  constructor(props) {
    super(props);

    // Initialize state...
    this.state = {
      passwordCurrent: "",
      newPassword: "",
      newPasswordConfirm: "",
      isLoading: false
    }
  }

  // Sets up header buttons...
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />,
      headerRight: () => <Button title="Save" onPress={this.onUpdatePasswordPress} />
    });
  }


  // "Update Password" button...
  onUpdatePasswordPress = () => {
    // Validate the fields...
    if (!this.state.newPassword) { Alert.alert("Please enter a password."); return; }
    if (!this.state.newPasswordConfirm) { Alert.alert("Please enter a password."); return; }
    if (this.state.newPassword !== this.state.newPasswordConfirm) { Alert.alert("Passwords do not match"); return; }

    // Remove on-screen keyboard...
    Keyboard.dismiss();

    // Try to update password...
    this.setState({isLoading: true});
    AuthFirebaseApi.changeCurrentUserPassword(this.state.passwordCurrent, this.state.newPassword)
      .then(this.onUserSuccessfulPasswordChange)
      .catch(this.onUserFailedPasswordChange);
  }

  // Occurs when the user successfully updates the password...
  onUserSuccessfulPasswordChange = () => {
    // Clear loading, alert user, and go back...
    this.setState({ isLoading: false });
    Alert.alert("Your password has been updated", "", [
      { text: "Ok", onPress: () => { this.props.navigation.goBack(); } }
    ]);
  }

  // Occurs when the user fails the password update...
  onUserFailedPasswordChange = (error) => {
      this.setState({isLoading: false});
      Alert.alert(error.message);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "#fff" }}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>

          <View style={{paddingTop:20}} />
          <Text>Type your current password and a new one to update</Text>

          <View style={{paddingTop:20}} />
          <PasswordTextInput placeholder="Current password" onChangeText={(text) => this.setState({passwordCurrent: text})} topDivider bottomDivider />
          <PasswordTextInput placeholder="New password" onChangeText={(text) => this.setState({newPassword: text})} topDivider />
          <PasswordTextInput placeholder="New password, again" onChangeText={(text) => this.setState({newPasswordConfirm: text})} topDivider bottomDivider />

          <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
});
