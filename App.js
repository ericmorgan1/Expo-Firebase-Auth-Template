import React from 'react';
import { SplashScreen, AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import ApiKeys from './constants/ApiKeys';
import AppCore from './AppCore';
import useLinking from './navigation/useLinking';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialNavigationState: null,
            isLoadingComplete: false,               // Tracks loading the app
            isAuthenticationReady: false,           // Tracks firebase checking authentication
        }

        // Listen for firebase auth changes...
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }
    
    // Occurs when Firebase AuthState has changed...
    onAuthStateChanged = (user) => {
        this.setState({isAuthenticationReady: true});  
    }
    
     // Returns true if we are currently loading...
    isLoading = () => {
        // True if loading is incomplete...
        if (!this.state.isLoadingComplete) { return true; }

        // True if authentication is not ready...
        if (!this.state.isAuthenticationReady) { return true; }

        // I guess we're done loading...
        return false;
    }
  
    // Load all resources...
    _loadResourcesAsync = async () => {
        //const { getInitialState } = useLinking(containerRef);
        
        try {
            //this.setState({ initialNavigationState: await getInitialState() }); // Load our initial navigation state
            await Font.loadAsync({ ...Ionicons.font });             // Load fonts
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            this.setState({ isLoadingComplete: true });
            SplashScreen.hide();
        }
    }

    // Handle logging error (may want to use a reporting service)...
    _handleLoadingError = error => {
        console.warn(error);
    }

    // Handle finished loading...
    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    }

    render() {
        // Show AppLoading if not ready...
        if (this.isLoading()) {
            return <AppLoading 
                startAsync={this._loadResourcesAsync} 
                onError={this._handleLoadingError} 
                onFinish={this._handleFinishLoading} 
                autoHideSplash={false}
            />
        }
        
        return <AppCore />; 
    }
}
