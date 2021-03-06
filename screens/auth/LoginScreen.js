import React from 'react';
import { StyleSheet, View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { AuthFirebaseApi } from './../../api';
import { EmailTextInput, PasswordTextInput } from './../../components/generic/TextInputs';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", isLoading: false };
    }

    // "Login" button...
    onLoginPress = () => {
        this.setState({ isLoading: true });
        AuthFirebaseApi.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ isLoading: false });
            }, (error) => {
                this.setState({ isLoading: false });
                Alert.alert(error.message);
            });
    }

    // "Create Account" button...
    onCreateAccountPress = () => {
        this.props.navigation.reset({ index: 0, routes: [{ name: "Signup" }] });
    }

    // "Forgot Password" button...
    onForgotPasswordPress = () => {
        this.props.navigation.reset({ index: 0, routes: [{ name: "ForgotPassword" }] });
    }
    
    // "Try as Guest" button...
    onTryAsGuestPress = () => {
        this.setState({ isLoading: true });
        AuthFirebaseApi.signInAnonymously()
            .then(() => {
                this.setState({ isLoading: false });
            }, (error) => {
                this.setState({ isLoading: false });
                Alert.alert(error.message);
            });
    }

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>
                
                <View style={{paddingTop: 50}} />
                <Text style={styles.appTitle}>My App</Text>
                <Text>Please login to continue</Text> 
                <View style={{paddingTop: 50}} />

                <EmailTextInput value={this.state.email} onChangeText={(text) => { this.setState({email: text}) }} placeholder="Email" />
                <PasswordTextInput value={this.state.password} onChangeText={(text) => { this.setState({password: text}) }} placeholder="Password" />

                <Button title="Login" onPress={this.onLoginPress} />
                <Button title="Create Account..." onPress={this.onCreateAccountPress} />
                <Button title="Forgot Password..." onPress={this.onForgotPasswordPress} />
                <Button title="Try as Guest..." onPress={this.onTryAsGuestPress} />

                <ActivityIndicator animating={this.state.isLoading} size="large" style={{paddingTop:20}} color="black" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appTitle: { fontSize: 18, fontWeight: "bold" }
});