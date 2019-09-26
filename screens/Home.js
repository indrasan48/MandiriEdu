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
  Dimensions,
  Alert,
} from 'react-native';
import * as Icon from '@expo/vector-icons'
import AnimatedLoader from "react-native-animated-loader";
import Customrow from '../constants/Customrow';
import Colors from '../constants/Colors';

let data = [
  /*{key: 'STTD01', name: 'Data Taruna', image: require('../images/sttd/icon_data_taruna.png')},*/
  {key: 'STTD02', name: 'KHS', image:  require('../images/sttd/icon_khs.png')},
  {key: 'STTD03', name: 'Jadwal', image:  require('../images/sttd/icon_jadwal.png')},
  {key: 'STTD04', name: 'Keuangan', image:  require('../images/sttd/icon_keuangan.png')},
  {key: 'STTD05', name: 'Transkrip', image:  require('../images/sttd/icon_transkrip.png')},
];

const formatData = (data, numColumns) => {
  const numberofFullRows = Math.floor(data.length / numColumns);

  let numberofElementsLastRow = data.length - (numberofFullRows * numColumns);
  while(numberofElementsLastRow !== numColumns && numberofElementsLastRow !==0){
    data.push({key: `blank-${numberofElementsLastRow}`, empty: true});
    numberofElementsLastRow = numberofElementsLastRow + 1;
  }

  return data;
};

const numColumns = 2;

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    this.state={
        isLoading:false,
    }
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

    if(global.Variable.LIST_SEMESTER==null){
      let formData = new FormData();
      formData.append('action', 'getListSemester');
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
            global.Variable.LIST_SEMESTER = responseJSON.data.semester;
            this.setState({isLoading : false});
            
          }else{
            Alert.alert(responseJSON.message);
          }
      }
      catch (error) {
          if(Colors.isdevelopment){console.log(error)};
          Alert.alert(error.toString());
      }
    }

    if(global.Variable.LIST_MONTH==null){
      let formData = new FormData();
      formData.append('action', 'getListMonth');
      formData.append('full', '1');
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
            global.Variable.LIST_MONTH = responseJSON.data.bulan;
            
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

  renderItem = ({item, index}) =>{
    if(item.empty===true){
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return(
      <TouchableOpacity style={styles.item} onPress={()=>
        {
          if(item.key=='STTD01'){
            this.props.navigation.navigate('DataTaruna');
          }else  if(item.key=='STTD02'){
            this.props.navigation.navigate('KHS');
          }else  if(item.key=='STTD03'){
            this.props.navigation.navigate('Jadwal');
          }else  if(item.key=='STTD04'){
            this.props.navigation.navigate('Keuangan');
          }else  if(item.key=='STTD05'){
            this.props.navigation.navigate('Transkrip');
          }else{
            Alert.alert(item.key)
          }
        }
      }>
        <Image
            style={styles.imageIcon}
            source={item.image} 
          />
        {item.name ? <Text style={styles.itemText}>{item.name}</Text> : null }
      </TouchableOpacity>
    )
  }
  
  render() {

    if(!this.state.isLoading){

      return (
        <View style={styles.container}>
        <View style={styles.bodyrow}>
          <View style={styles.card}>
            <Image
              style={styles.logo}
              source={require('../images/sttd/sttd.gif')} 
            />
            {global.Variable.AUTH.nama ? <Text style={styles.title2}>Welcome, {global.Variable.AUTH.nama}</Text>    : null}
              
          </View>

        
          <FlatList 
              data={formatData(data, numColumns)}
              style={styles.itemContainer}
              renderItem={this.renderItem}
              numColumns={numColumns}
              keyExtractor = {(item, index)=> item.key} />

        </View>
      </View>
      );
    }else{
      return (
        <View style={styles.container}>
        <View style={styles.bodyrow}>
          <View style={styles.card}>
            <Image
              style={styles.logo}
              source={require('../images/sttd/sttd.gif')} 
            />
            {global.Variable.AUTH.nama ? <Text style={styles.title2}>Welcome, {global.Variable.AUTH.nama}</Text>    : null}
          </View>
        </View>
      </View>
      );
    }
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
  card: {
    backgroundColor: Colors.defaultBackground,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin:10,
    padding:10,
    borderRadius: 10,
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
  item:{
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1,
    margin:5,
    borderRadius:10,
  },
  itemInvisible:{
    backgroundColor: 'transparent'
  },
  itemText:{
    color: Colors.defaultBackground,
    textAlign: 'center',
    fontSize: 18,
    marginTop:10,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding:10,
  },
  imageIcon:{
    width: Dimensions.get('window').width/4,  
    height: Dimensions.get('window').width/4, 
    resizeMode: 'contain',
  }, 
  logo: {
    width: Dimensions.get('window').width/4,  
    height: Dimensions.get('window').width/4, 
    resizeMode: 'contain',
  }
});