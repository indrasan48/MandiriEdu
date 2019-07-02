import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert,BackHandler , PermissionsAndroid, PermissionAwareActivity, Text, Button} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator';
import Global from './constants/Global';
import UserInactivity from 'react-native-user-inactivity';
export default class App extends React.Component {

  constructor(){
 
    super();
    global.Variable = Global;
  }

  state = {
    isLoadingComplete: false,
    active: true,
    timer: 10000,
    device_IMEI: '',
  };

  onAction = (active) => {
    this.setState({
      active,
    });
  }

  render() {
    if(!this.state.active){
      //console.log('idle');
      //BackHandler.exitApp();
      //System.exit(0);
    }
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <UserInactivity
          timeForInactivity={this.state.timer}
          onAction={this.onAction}
        >
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
        </UserInactivity>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
