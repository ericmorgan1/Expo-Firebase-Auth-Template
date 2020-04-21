import React from 'react';
import { StyleSheet, View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { AuthFirebaseApi } from './../../api';
import { EmailTextInput, PasswordTextInput } from './../../components/generic/TextInputs';

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", passwordConfirm: "", isLoading: false };
    }

    // "Signup" button...
    onSignupPress = () => {
        // Validate the inputs...
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        // Create a user...
        this.setState({ isLoading: true });
        AuthFirebaseApi.createUserWithEmailAndPassword(this.state.email, this.state.password, false)
            .then(() => {
                this.setState({ isLoading: false });
            }, (error) => {
                this.setState({ isLoading: false });
                Alert.alert(error.message);
            });
    }

    // "Back to Login" button...
    onBackToLoginPress = () => {
        this.props.navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    }

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <View style={{paddingTop: 50}} />
                <Text style={styles.appTitle}>My App</Text>
                <Text>Please choose an email and password to sign up</Text> 
                <View style={{paddingTop: 50}} />

                <EmailTextInput value={this.state.email} onChangeText={(text) => { this.setState({email: text}) }} placeholder="Email" />
                <PasswordTextInput value={this.state.password} onChangeText={(text) => { this.setState({password: text}) }} placeholder="Password" />
                <PasswordTextInput value={this.state.passwordConfirm} onChangeText={(text) => { this.setState({passwordConfirm: text}) }} placeholder="Password (confirm)" />

                <Button title="Signup" onPress={this.onSignupPress} />
                <Button title="Back to Login" onPress={this.onBackToLoginPress} />

                <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appTitle: { fontSize: 18, fontWeight: "bold" }
});