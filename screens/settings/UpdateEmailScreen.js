import React from 'react';
import { StyleSheet, View, Text, ScrollView, Keyboard, KeyboardAvoidingView, Button, Alert, ActivityIndicator } from 'react-native';
import { PasswordTextInput, EmailTextInput } from './../../components/generic/TextInputs';
import { AuthFirebaseApi } from './../../api';

export default class UpdateEmailScreen extends React.Component {

  constructor(props) {
    super(props);

    // Initialize state...
    this.state = {
      passwordCurrent: "",
      email: "",
      emailConfirm: "",
      isLoading: false
    }
  }

  // Sets up header buttons...
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />,
      headerRight: () => <Button title="Save" onPress={this.onUpdateEmailPress} />
    });
  }

  // "Update Email" button...
  onUpdateEmailPress = () => {
    // Validate the fields...
    if (!this.state.email) { Alert.alert("Please enter an email."); return; }
    if (!this.state.emailConfirm) { Alert.alert("Please enter an email."); return; }
    if (this.state.email !== this.state.emailConfirm) { Alert.alert("Emails do not match"); return; }

    // Remove on-screen keyboard...
    Keyboard.dismiss();

    // Try to update email...
    this.setState({isLoading: true});
    AuthFirebaseApi.changeCurrentUserEmail(this.state.passwordCurrent, this.state.email)
      .then(this.onUserSuccessfulEmailChange)
      .catch(this.onUserFailedEmailChange);
  }

  // Occurs when the user successfully updates the email...
  onUserSuccessfulEmailChange = () => {
    // Clear loading, alert user, and go back...
    this.setState({ isLoading: false });
    Alert.alert("Your email has been updated updated", "", [
      { text: "Ok", onPress: () => { this.props.navigation.goBack(); } }
    ]);
  }

  // Occurs when the user fails the email update...
  onUserFailedEmailChange = (error) => {
      this.setState({isLoading: false});
      Alert.alert(error.message);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "#fff" }}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          
          <View style={{paddingTop:20}} />
          <Text>Type your password and a new email to update</Text>

          <View style={{paddingTop:20}} />
          <PasswordTextInput placeholder="Current password" onChangeText={(text) => this.setState({passwordCurrent: text})} topDivider bottomDivider />
          <EmailTextInput placeholder="New email" onChangeText={(text) => this.setState({email: text})} topDivider />
          <EmailTextInput placeholder="New email, again" onChangeText={(text) => this.setState({emailConfirm: text})} topDivider bottomDivider />

          <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
});
