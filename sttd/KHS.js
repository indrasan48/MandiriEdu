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
import * as Icon from '@expo/vector-icons'
import AnimatedLoader from "react-native-animated-loader";
import Customrowkhs from '../constants/Customrowkhs';
import Customrowkhp from '../constants/Customrowkhp';
import Colors from '../constants/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';


const CustomListview = ({ itemList }) => (
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item }) => <Customrowkhs
              kodemk={item.kodemk}
              namamk={item.namamk}
              sks= {'SKS : ' + item.sks}
              nilai={'Nilai : ' + item.nilaiangka + ' ('+item.nilaihuruf+')'}
          />}
      />

  </View>
);

const CustomListviewKHP = ({ itemList }) => (
  <View style={styles.list}>
      <FlatList
          data={itemList}
          renderItem={({ item }) => <Customrowkhp
              jenis={item.jenis}
              nilai={item.nilai}
              grade={item.grade}  
          />}
      />

  </View>
);

const CustomListviewPAS = ({ itemList }) => (
  <View style={styles.list}>
      <FlatList
          data={itemList}
          renderItem={({ item }) => <Customrowkhp
              jenis={item.jenis}
              nilai={item.nilai}
          />}
      />

  </View>
);

const FirstRoute = ({ itemList }) => (
  (itemList.length===0)?
  <View>
    <Text style={styles.bodyText}>
      Data tidak tersedia
    </Text>
  </View>
  :
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item, index }) => <Customrowkhs
              kodemk={item.kodemk}
              namamk={item.namamk}
              sks= {'SKS : ' + item.sks}
              nilai={'Nilai : ' + item.nilaiangka + ' ('+item.nilaihuruf+')'}
              color={index}
          />}
      />
  </View>
);

const SecondRoute = ({ itemList }) => (
  (itemList.length===0)?
  <View>
    <Text style={styles.bodyText}>
      Data tidak tersedia
    </Text>
  </View>
  :
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item, index }) => <Customrowkhp
              jenis={item.jenis}
              nilai={item.nilai}
              grade={item.grade}  
              color={index}
          />}
      />
  </View>
);

const ThirdRoute = ({ itemList}) => (
  (itemList.length===0)?
  <View>
    <Text style={styles.bodyText}>
      Data tidak tersedia
    </Text>
  </View>
  :
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item, index  }) => <Customrowkhp
              jenis={item.jenis}
              nilai={item.nilai}
              color={index}
          />}
      />
  </View>
);

export default class DataTaruna extends React.Component {
  static navigationOptions = {
    navigationOptions: ({navigation}) => ({ 
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    })
  };

  constructor(props){
    super(props);
  
    this.state = {
      isLoading:false,
      isshow:false,
      periode: '',
      idx_periode: '',
      list_periode:  [],
      data_khs: [{
        "kodemk": "",
        "namamk": "",
        "sks": "",
        "nilaihuruf": "",
        "nilaiangka": ""
      },],
      data_khp: [{
        "jenis": "",
        "nilai": "",
        "grade": ""
      },],
      data_pas: [{
        "jenis": "",
        "nilai": "",
      },],
      index: 0,
      routes: [
        { key: 'khs', title: 'KHS' },
        { key: 'khp', title: 'KHP' },
        { key: 'pas', title: 'PAS' },
      ],
      };
  }

  async componentDidMount(){
    
    if(global.Variable.LIST_PERIODE==null){
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
            global.Variable.LIST_PERIODE = responseJSON.data.periode;
            
          }else{
            Alert.alert(responseJSON.message);
          }
      }
      catch (error) {
          if(Colors.isdevelopment){console.log(error)};
          Alert.alert(error.toString());
      }
    }
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
          this.setState({list_periode: responseJSON.data.periode});
          
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

  selectdata = async () => {
    this.showLoader();
    let formData = new FormData();
    formData.append('action', 'getListKHS');
    formData.append('token', global.Variable.AUTH.token);
    formData.append('idperiode', this.state.periode.toString());
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
          global.Variable.DATA_KHS = responseJSON.data;
          this.setState({ data_khs: global.Variable.DATA_KHS.khs, data_khp :  global.Variable.DATA_KHS.khp, data_pas :  global.Variable.DATA_KHS.pas });
          this.setState({ isshow: true });
          
        }else{
          //Alert.alert(responseJSON.message);
          this.setState({ isshow: false });
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
    
    
    renderModalStatePicker = () => {
      const pickerItems = Object.keys(this.state.list_periode).map((key) => {
          let id = Object.keys(this.state.list_periode[key]);
          let val = this.state.list_periode[key][Object.keys(this.state.list_periode[key])];
          return (<Picker.Item label={val} value={id.toString()} key={key}/>)
          
      })     
      //pickerItems.unshift(<Picker.Item key="" label="Pilih Periode" value="" />)

      return(
          <View>
              <Picker
                  placeholder="Pilih Periode"
                  selectedValue={this.state.periode.toString()}
                  onValueChange={(itemValue, index) =>
                    this.setState({periode: itemValue.toString(), idx_periode:index},
                    this.selectdata)
                  }>
                  {pickerItems}
                </Picker>
          </View>
      );
    }

    

    return (
      <View style={styles.container}>
      <View style={styles.headerrow}>
        <Text style={styles.headerText}>
          KHS
        </Text>
      </View>
      <View style={styles.bodyrow}>
          <Text style={styles.bodyText}>Pilih Periode</Text>
          {renderModalStatePicker()}

          {this.state.isshow ? ( 
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              khs: () => <FirstRoute itemList={this.state.data_khs}/>,
              khp: () => <SecondRoute itemList={this.state.data_khp}/>,
              pas: () => <ThirdRoute itemList={this.state.data_pas}/>,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
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
  fl:{
    margin: 5,
    padding: 10,
    paddingBottom:80,
  },
  list:{
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight : 'bold',
    fontSize: 18
  },
  bodyTextInput: {
    fontSize: 20,
    margin: 5,
    height:40,
    paddingHorizontal : 10,
    borderRadius: 10,
  },
  bodyText: {
    color: Colors.defaultBackground,
    fontSize: 20,
    margin: 5,
  },
  item:{
    backgroundColor: Colors.defaultBackground,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    margin:5,
    height: 50,
    borderRadius:10,
  },
  itemInvisible:{
    backgroundColor: 'transparent'
  },
  itemText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  scene: {
    flex: 1,
  },
});