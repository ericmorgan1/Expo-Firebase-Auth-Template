import React from 'react';
import { StyleSheet, View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { EmailTextInput } from './../../components/generic/TextInputs';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "", isLoading: false };
    }

    // "Reset Password" button...
    onResetPasswordPress = () => {
        this.setState({ isLoading: true });
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({ isLoading: false });
                Alert.alert("Password reset email has been sent.");
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
                <Text>Please type your email to reset your password</Text> 
                <View style={{paddingTop: 50}} />

                <EmailTextInput value={this.state.email} onChangeText={(text) => { this.setState({email: text}) }} placeholder="Email" />
                <Button title="Reset Password" onPress={this.onResetPasswordPress} />
                <Button title="Back to Login..." onPress={this.onBackToLoginPress} />

                <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appTitle: { fontSize: 18, fontWeight: "bold" }
});