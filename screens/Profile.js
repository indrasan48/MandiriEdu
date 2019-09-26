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
  Image,
} from 'react-native';
import * as Icon from '@expo/vector-icons'
import AnimatedLoader from "react-native-animated-loader";
import Customrow from '../constants/Customrow';
import Colors from '../constants/Colors';

const CustomListview = ({ itemList }) => (
  <View style={styles.container}>
      <FlatList
          data={itemList}
          renderItem={({ item, index }) => <Customrow
              title={item.title}
              description={item.description}
              color={index}
          />}
      />

  </View>
);

export default class DataTaruna extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  
    this.state = {
      data:  [{title: '', description: ''}],
      /*data:  [{title: 'NIM', description: global.Variable.AUTH.nim},
              {title: 'Nama', description: global.Variable.AUTH.nama},
              {title: 'Fakultas', description: global.Variable.AUTH.nama},
              {title: 'Prodi', description: global.Variable.AUTH.nama},
              {title: 'Jurusan', description: global.Variable.AUTH.nama},
            ],
            */
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
    formData.append('action', 'getDataTaruna');
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
          global.Variable.DATA_TARUNA = responseJSON.data;
          this.setState({data:  [
            /*{title: 'NIM', description: global.Variable.DATA_TARUNA.nim},
            {title: 'Nama', description: global.Variable.DATA_TARUNA.nama},*/
            {title: 'Fakultas', description: global.Variable.DATA_TARUNA.fakultas},
            {title: 'Program Studi', description: global.Variable.DATA_TARUNA.prodi},
            {title: 'Jurusan', description: global.Variable.DATA_TARUNA.jurusan},
            {title: 'Periode Masuk', description: global.Variable.DATA_TARUNA.periodemasuk},
            {title: 'Tahun Kurikulum', description: global.Variable.DATA_TARUNA.tahunkurikulum},
            {title: 'Sistem Kuliah', description: global.Variable.DATA_TARUNA.sistemkuliah},
            {title: 'Status Taruna', description: global.Variable.DATA_TARUNA.statusmhs},
            {title: 'Pembimbing Akademik', description: global.Variable.DATA_TARUNA.pembimbing},
            {title: 'Semester/IP', description: global.Variable.DATA_TARUNA.ips},
            {title: 'Semester/IPK', description: global.Variable.DATA_TARUNA.ipk},
          ]});
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
      <View style={styles.bodyrow}>

        <View style={styles.containerLogo}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../images/profile.png')} 
          />
          {global.Variable.AUTH.nim ? <Text style={styles.title2}>{global.Variable.AUTH.nim}</Text>    : null}
          {global.Variable.AUTH.nama ? <Text style={styles.title2}>{global.Variable.AUTH.nama}</Text>    : null}
        </View>
        {(this.state.data) &&
          <CustomListview
            itemList={this.state.data}
          />
        }

        <TouchableOpacity style={styles.buttonContainer} onPress={this._signOutAsync} >
            <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:23,
    backgroundColor: Colors.defaultBackground,
  },
  headerrow: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
    alignItems: 'center',
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
  title2:{
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    margin:5,
  },
});