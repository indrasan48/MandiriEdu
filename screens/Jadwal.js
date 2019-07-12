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
  Picker,
  Alert,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import Customrowjadwal from '../constants/Customrowjadwal';

const CustomListview = ({ itemList }) => (
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item }) => <Customrowjadwal
              hari={item.hari}
              tgl={item.tgl}
              mulai={item.mulai}
              selesai={item.selesai}
              jenis={item.jenis}
              kuliah={item.kuliah}
              materi={item.materi}
              ruang={item.ruang}
          />}
      />

  </View>
);

export default class Jadwal extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  
    this.state = {
      isLoading:false,
      isshow:false,
      jadwal:[
        {
            "hari": "",
            "tgl": "",
            "mulai": "",
            "selesai": "",
            "jenis": "",
            "kuliah": "",
            "materi": "",
            "ruang": ""
        },],
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
    formData.append('action', 'getJadwalSemester');
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
          global.Variable.DATA_MIX = responseJSON.data;
          this.setState({jadwal: responseJSON.data.jadwal, isshow: true});
          
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
            Jadwal
          </Text>
        </View>
        <View style={styles.bodyrow}>

          {this.state.isshow ? ( 
            <Text style={styles.bodyText}>
              {'Periode             : ' + global.Variable.DATA_MIX.periode}
            </Text>
          ) : null}

          {this.state.isshow ? ( 
            <Text style={styles.bodyText}>
              {'Semester/IPK  : ' + global.Variable.DATA_MIX.semmhs + '/' + global.Variable.DATA_MIX.ipk}
            </Text>
          ) : null}

          {this.state.isshow ? ( 
            <CustomListview 
              itemList={this.state.jadwal}
            />
          ) : null}

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
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: "#fff",
    paddingBottom:140,
  },
  headerText: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 25,
    margin: 10,
  },
  bodyText: {
    color: Colors.defaultBackground,
    fontSize: 18,
    margin: 20,
    borderBottomColor: Colors.defaultBackground,
    borderBottomWidth: 1,
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