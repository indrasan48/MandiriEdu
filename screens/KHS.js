import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import * as Icon from '@expo/vector-icons'
import AnimatedLoader from "react-native-animated-loader";
import Customrow from '../constants/Customrow';
import Colors from '../constants/Colors';



export default class DataTaruna extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  
    this.state = {
      isLoading:false,
      };
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };
  hideLoader = () => {
    this.setState({ isLoading: false });
  };
  
  async componentDidMount(){
    this.showLoader();
    let formData = new FormData();
    formData.append('action', 'getListPeriode');
    formData.append('token', global.Variable.AUTH.token);
    let data = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'SECRETKEY': global.Variable.SECRET_KEY,
        },
        body: formData
    }
    try {
        const response = await fetch(global.Variable.LINK_WS, data);
        const responseJSON = await response.json();
        if(Colors.isdevelopment){console.log(JSON.stringify(responseJSON, null, 2))};
        if(responseJSON.message=="Success"){
          //this.setState({data: responseJSON.data});
          global.Variable.LIST_PERIODE = responseJSON.data;
        }else{
          Alert.alert(responseJSON.message);
        }
        this.hideLoader();
    }
    catch (error) {
        if(Colors.isdevelopment){console.log(error)};
        Alert.alert(error.toString());
        this.hideLoader();
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.headerrow}>
        <Text style={styles.headerText}>
          Data KHS Taruna
        </Text>
      </View>
      <View style={styles.bodyrow}>
        

      </View>
    </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:23,
  }, 
  headerrow: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyrow: {
    flex: 9,
    backgroundColor: "#fff"
  },
  headerText: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 25,
    margin: 10,
  },
  buttonContainer:{
    backgroundColor: Colors.defaultBackground,
    margin: 5,
    padding: 10,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight : 'bold',
    fontSize: 18
  },
});