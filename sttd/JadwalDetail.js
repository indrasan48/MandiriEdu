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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CustomListview = ({ itemList }) => (
  
  <View style={{paddingBottom:140}}>
      <FlatList
          style={{ flexGrow: 1}}
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

export default class JadwalDetail extends React.Component {
  static navigationOptions = {
    navigationOptions: ({navigation}) => ({ 
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    })
  };

  constructor(props){
    super(props);
  
    this.state = {
      isLoading : false,
      isshow : true,
      marked: null,
      jadwal : global.Variable.DATA_JADWAL,
      current_date : null,
      current_periode : global.Variable.CURRENT_PERIODE,
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
    if(!global.Variable.DATA_TANGGAL[0]){
      this.setState({current_date : this.state.current_periode.substring(0,4) + '-01-01'})
    }else{
      this.setState({current_date : global.Variable.DATA_TANGGAL[0]})
    }
    this.anotherFunc();
  }

  anotherFunc = () => {
    var obj = global.Variable.DATA_TANGGAL.reduce((c, v) => Object.assign(c, {[v]: {marked: true, textColor: Colors.defaultBackground, dotColor: Colors.defaultBackground}}), {});
    this.setState({ marked : obj});
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
          
          this.setState({jadwal: [], isshow: true});

          Object.keys(responseJSON.data.jadwal).map((key) => {
            console.log(responseJSON.data.jadwal[key]);
            this.state.jadwal.push(responseJSON.data.jadwal[key]);
          });

          
          
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
        <Calendar
          style={styles.calendar}
          current={this.state.current_date}
          theme={{
            calendarBackground: '#333248',
            textSectionTitleColor: 'white',
            dayTextColor: 'white',
            todayTextColor: 'white',
            selectedDayTextColor: 'red',
            monthTextColor: 'white',
            indicatorColor: 'white',
            selectedDayBackgroundColor: '#333248',
            arrowColor: 'white',
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }
            }
          }}
          markedDates={
            this.state.marked
          }
          hideArrows={false}
        />
         
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
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    margin: 10,
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
    paddingBottom:220,
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