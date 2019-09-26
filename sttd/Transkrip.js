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
import Customrowtranskrip from '../constants/Customrowtranskrip';

const CustomListview = ({ itemList }) => (
  <View>
      <FlatList
          data={itemList}
          renderItem={({ item, index }) => 
          /*<View style={{ backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF" }}>*/
            <Customrowtranskrip
              kodemk={item.kodemk}
              namamk={item.namamk}
              semester={item.semester}
              sks={item.sks}
              grade={item.grade}
              bobot={item.bobot}
              color={index}
            />
          }
      />

  </View>
);

export default class Transkrip extends React.Component {
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
      list_periode : '',
      idx_periode: '',
      transkrip:[],
      };
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };
  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  async componentDidMount(){

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

  }

  selectdata = async () => {
    this.showLoader();
    let formData = new FormData();
    formData.append('action', 'getListTranskrip');
    formData.append('semester', this.state.periode);
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
          this.setState({transkrip: responseJSON.data.transkrip, isshow: true});
          
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

    renderModalStatePicker = () => {
      const pickerItems = Object.keys(global.Variable.LIST_SEMESTER).map((key) => {
        return (<Picker.Item label={global.Variable.LIST_SEMESTER[key]} value={key} key={key}/>)
      })
      pickerItems.unshift(<Picker.Item key="" label="Pilih Semester" value="" />)

      return(
          <View>
              <Picker
                  placeholder="Pilih Semester"
                  selectedValue={this.state.periode.toString()}
                  onValueChange={(itemValue, index) =>
                    this.setState({periode: itemValue.toString(), idx_periode:index})
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
            Transkrip
          </Text>
        </View>
        <View style={styles.bodyrow}>

          <Text style={styles.bodyText}>Pilih Semester</Text>
          {renderModalStatePicker()}

          <TouchableOpacity style={styles.buttonContainer} onPress={this.selectdata} >
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>


          {this.state.isshow ? ( 
            (this.state.transkrip.length===0)?
            <View>
              <Text style={styles.bodyText}>
                Data tidak tersedia
              </Text>
            </View>
            :
            <CustomListview 
              itemList={this.state.transkrip}
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
    fontSize: 20,
    margin: 5,
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