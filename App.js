import React from 'react';
import { View } from 'react-native';
import styles from './style/style';
import Navigation from "./components/Navigation";

export default function App() {

  return (
    <View style={styles.container}>
      <Navigation />  
    </View>
  )
}
