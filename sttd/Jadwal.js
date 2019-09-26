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
          renderItem={({ item, index }) => <Customrowjadwal
              hari={item.hari}
              tgl={item.tgl}
              mulai={item.mulai}
              selesai={item.selesai}
              jenis={item.jenis}
              kuliah={item.kuliah}
              materi={item.materi}
              ruang={item.ruang}
              color={index}
          />}
      />

  </View>
);

export default class Jadwal extends React.Component {
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
      periode : '',
      list_periode : '',
      idx_periode: '',
      month : '00',
      list_month : '',
      idx_month: '',
      jadwal:[],
      tanggal:[],
      };
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };
  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  async componentDidMount(){
    //this.setState({list_periode : global.Variable.LIST_PERIODE, list_month : global.Variable.LIST_MONTH});
    //console.log(this.state.list_month);
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

  selectdata = async () => {
    console.log(this.state.periode + " --- " + this.state.month);
    this.showLoader();
    let formData = new FormData();
    formData.append('action', 'getJadwalSemester');
    formData.append('idperiode', this.state.periode);
    formData.append('bulan', this.state.month);
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
          
          this.setState({jadwal: [], tanggal: [], isshow: false});

          Object.keys(responseJSON.data.jadwal).map((key) => {
            console.log(responseJSON.data.jadwal[key]);
            this.state.jadwal.push(responseJSON.data.jadwal[key]);
            this.state.tanggal.push(responseJSON.data.jadwal[key].tgl);
          });

          global.Variable.DATA_JADWAL = this.state.jadwal;
          global.Variable.DATA_TANGGAL = this.state.tanggal;
          global.Variable.CURRENT_PERIODE = this.state.periode;

          //this.props.navigation.state.params.JadwalDetail.setState({'jadwal': this.state.jadwal});
          this.props.navigation.navigate('JadwalDetail');
          
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
      const pickerItems = Object.keys(global.Variable.LIST_PERIODE).map((key) => {
          let id = Object.keys(global.Variable.LIST_PERIODE[key]);
          let val = global.Variable.LIST_PERIODE[key][Object.keys(global.Variable.LIST_PERIODE[key])];
          return (<Picker.Item label={val} value={id.toString()} key={key}/>)
          
      })
      pickerItems.unshift(<Picker.Item key="" label="Pilih Periode" value="" />)
      return(
        <View>
            <Picker
                placeholder="Pilih Periode"
                selectedValue={this.state.periode.toString()}
                onValueChange={(itemValue, index) =>
                  this.setState({periode: itemValue.toString(), idx_periode:index})
                }>
                {pickerItems}
            </Picker>
        </View>
      );
    }

    renderModalStatePickerMonth = () => {
      const pickerItems = Object.keys(global.Variable.LIST_MONTH).map((key) => {
          //console.log( key +" --- "+global.Variable.LIST_MONTH[key]);
          return (<Picker.Item label={global.Variable.LIST_MONTH[key]} value={key} key={key}/>)
          
      })
      pickerItems.unshift(<Picker.Item key="00" label="Semua Bulan" value="00" />)
      return(
          <View>
              <Picker
                  placeholder="Pilih Bulan"
                  selectedValue={this.state.month.toString()}
                  onValueChange={(itemValue, index) =>
                    this.setState({month: itemValue.toString(), idx_month:index})
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
            Jadwal
          </Text>
        </View>
        <View style={styles.bodyrow}>

          <Text style={styles.bodyText}>Pilih Periode</Text>
          {renderModalStatePicker()}

          <Text style={styles.bodyText}>Pilih Bulan</Text>
          {renderModalStatePickerMonth()}

          <TouchableOpacity style={styles.buttonContainer} onPress={this.selectdata} >
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

         
          {this.state.isshow ? ( 
            (this.state.jadwal.length===0)?
            <View>
              <Text style={styles.bodyText}>
                Data tidak tersedia
              </Text>
            </View>
            :
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