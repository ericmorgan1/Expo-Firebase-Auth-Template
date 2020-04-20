import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class TestScreen extends React.Component {
    
    constructor(props) { 
        super(props);
        this.state = { 
          
        };
    }
    
    render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={{paddingTop: 40 }} />
            <Text>Test Screen</Text>
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
