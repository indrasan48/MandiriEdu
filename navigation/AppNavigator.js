import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthStack from '../screens/SignIn';
import RegisterStack from '../screens/Register';

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainTabNavigator,
    Auth: AuthStack,
    Register: RegisterStack,
  },
  {
    initialRouteName: 'Auth',
  }

));