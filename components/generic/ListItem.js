import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function(props) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.viewContainer}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { alignSelf: "stretch", },
    viewContainer: {
        height: 40, alignSelf: "stretch", flexDirection: "row",
        borderWidth: 1, borderColor: "#DDDDDD",
        padding: 10,
      }
});