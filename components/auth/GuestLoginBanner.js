import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export function GuestLoginBanner(props) {
    return (
        <View style={styles.container}>
            <Text>You are logged in as a guest.</Text>
            <Text>Please register to save your data.</Text>
            <Button title="Create an Account" onPress={props.onSignupPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, borderRadius: 5, borderColor: "#ddd", 
        padding: 5, margin: 10, alignSelf: "stretch", alignItems: "center", 
        backgroundColor: "rgba(100, 221, 23, 0.6)",
        shadowOffset:{ width: 0, height: 5 }, shadowColor: 'black', shadowOpacity: 0.2,
    }
});