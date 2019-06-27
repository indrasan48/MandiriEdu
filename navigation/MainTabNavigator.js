import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DataTaruna from '../screens/DataTaruna';
import KHS from '../screens/KHS';
import Jadwal from '../screens/Jadwal';
import Keuangan from '../screens/Keuangan';
import Transkrip from '../screens/Transkrip';

const DataTarunaStack = createStackNavigator({
  DataTaruna: DataTaruna,
});

DataTarunaStack.navigationOptions = {
  tabBarLabel: 'Data Taruna',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

const KHSStack = createStackNavigator({
  KHS: KHS,
});

KHSStack.navigationOptions = {
  tabBarLabel: 'KHS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};

const JadwalStack = createStackNavigator({
  Jadwal: Jadwal,
});

JadwalStack.navigationOptions = {
  tabBarLabel: 'Jadwal',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
    />
  ),
};

const KeuanganStack = createStackNavigator({
  Keuangan: Keuangan,
});

KeuanganStack.navigationOptions = {
  tabBarLabel: 'Keuangan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-card' : 'md-card'}
    />
  ),
};

const TranskripStack = createStackNavigator({
  Transkrip: Transkrip,
});

TranskripStack.navigationOptions = {
  tabBarLabel: 'Transkrip',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

export default createBottomTabNavigator({
  DataTarunaStack,
  KHSStack,
  JadwalStack,
  KeuanganStack,
  TranskripStack,
});
