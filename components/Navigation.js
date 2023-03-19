import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';

const HomeScreen = () => {
  return(
      <Home />
  );
}

const GameboardScreen  = () => {
  return(
      <Gameboard />
  );
}

const ScoreboardScreen = () => {
  return(
      <Scoreboard />
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {

  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused,color,size}) => {
              let iconName;
              let iconColor;
              let iconSize = 20;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home',
                iconColor = focused ? 'black' : 'gray'
              }
              else if (route.name === 'Gameboard') {
                iconName = focused ? 'dice' : 'dice'
                iconColor = focused ? 'black' : 'gray'
              }
              else if (route.name === 'Scoreboard') {
                iconName = focused ? 'list' : 'list'
                iconColor = focused ? 'black' : 'gray'
              }

              return <Icon name={iconName} size={iconSize} color={iconColor} />
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveBackgroundColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {position: 'absolute'}
          })}
        >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Gameboard' component={GameboardScreen} />
        <Tab.Screen name='Scoreboard' component={ScoreboardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  text: {
      fontSize:20,
  },
});