import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';

//------------- Menu STTD -------------------//
import DataTaruna from '../sttd/DataTaruna';
import KHS from '../sttd/KHS';
import Jadwal from '../sttd/Jadwal';
import JadwalDetail from '../sttd/JadwalDetail';
import Keuangan from '../sttd/Keuangan';
import Transkrip from '../sttd/Transkrip';

const HomeStack = createStackNavigator({
  Home: Home,
  DataTaruna: DataTaruna,
  KHS: KHS,
  Jadwal: Jadwal,
  JadwalDetail: JadwalDetail,
  Keuangan: Keuangan,
  Transkrip: Transkrip,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};


const NotificationStack = createStackNavigator({
  Notification: Notification,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: Profile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationStack,
  ProfileStack,
});
