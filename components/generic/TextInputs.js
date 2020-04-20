import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

// StyledTextInput
export function StyledTextInput(props) {
    return <TextInput style={styles.textInput} {...props} />
}

// EmailTextInput
export function EmailTextInput(props) {
    return <TextInput style={styles.textInput}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
    />
}

// PasswordTextInput
export function PasswordTextInput(props) {
    return <TextInput style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
    />
}

const styles = StyleSheet.create({
    textInput: {
        height: 40, alignSelf: "stretch",
        borderWidth: 1, borderColor: "#DDDDDD",
        padding: 10, marginTop: 10, marginBottom: 10
    }
});