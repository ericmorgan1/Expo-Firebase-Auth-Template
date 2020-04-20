import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {

    constructor(props) { 
        super(props);
    }

    // "Edit Profile" button...
    onEditProfilePress = () => {
      this.props.navigation.navigate("EditProfile");
    }
    
    render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Button title="Edit Profile" onPress={this.onEditProfilePress} />
          </ScrollView>
        </View>
      );
    }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  contentContainer: {
    paddingTop: 30,
    alignItems: "center"
  },
});
