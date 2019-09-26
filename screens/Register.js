import React from 'react';
import { Text, Image, TouchableWithoutFeedback,
    Button, StatusBar, TextInput,
    AsyncStorage, SafeAreaView, Keyboard,
    View, TouchableOpacity, KeyboardAvoidingView, ImageBackground,
    StyleSheet, position, Alert, ActivityIndicator, PermissionsAndroid, Picker
} from 'react-native';
import FormData from 'FormData';
import { createStackNavigator } from 'react-navigation';
import AnimatedLoader from "react-native-animated-loader";
import * as SecureStore from 'expo-secure-store';


export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  
    this.state = {
      isLoading:false,
      email: '',
      password: '',
      confirm_password: '',
      kode_sekolah: 'STTD',
      nomor_induk: '',
      nama: '',
      data_sekolah: '',
    }
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  _submit = async () => {
    this.showLoader();
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('confirm_password', this.state.confirm_password);
    formData.append('kode_sekolah', this.state.kode_sekolah);
    formData.append('nomor_induk', this.state.nomor_induk);
    formData.append('nama', this.state.nama);

    let data = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'SECRETKEY': global.Variable.SECRET_KEY,
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    }
    try {
        const response = await fetch(global.Variable.LINK_LICENSE + 'auth/register', data);
        const responseJSON = await response.json();
        this.setState({
            //isLoading: false,
            dataSource: responseJSON,
        });
        //await AsyncStorage.setItem('access_token', responseJSON.access_token);
        if(responseJSON.message == "Success"){
          SecureStore.setItemAsync('email', responseJSON.data.email); 
          this.props.navigation.navigate('Auth');
        }else if(responseJSON.message == "Email sudah terdaftar"){
          SecureStore.setItemAsync('email', responseJSON.data.email); 
          this.props.navigation.navigate('Auth');
        }else if(responseJSON.message == "Errors"){
          Alert.alert("Error", "Harap isi semua field dengan benar");
        }else{
          Alert.alert("Error", responseJSON.message);
        }
        this.hideLoader();
    }
    catch (error) {
        console.log(error);
        this.hideLoader();
        Alert.alert(error.toString());
    }
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <ImageBackground source={require('../images/background.jpeg')} style={styles.backgroundImage} >
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={require('../images/edu_mobile.png')}/>
                  <Text style={styles.title2}>Supported by Bank Mandiri</Text>             
                </View>
                <View style={styles.bodyrow}>
                  <Text style={styles.title}>Registrasi</Text>    
                  <Text style={styles.bodyText}>Email</Text>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder="Email"
                    keyboardType='email-address'
                    value= {this.state.email}
                    onChangeText={text => this.setState({email:text})}
                  />
                  <Text style={styles.bodyText}>Password</Text>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder="Password"
                    keyboardType='default'
                    secureTextEntry={true}
                    value= {this.state.password}
                    onChangeText={text => this.setState({password:text})}
                  />
                  <Text style={styles.bodyText}>Confirm Password</Text>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder="Confirm Password"
                    keyboardType='default'
                    secureTextEntry={true}
                    value= {this.state.confirm_password}
                    onChangeText={text => this.setState({confirm_password:text})}
                  />
                  <Text style={styles.bodyText}>Nama Sekolah</Text>
                  <Picker style={styles.bodyTextInput}
                    selectedValue={this.state.kode_sekolah}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({kode_sekolah: itemValue})
                    }>
                    <Picker.Item label={'STTD'} value={'STTD'}/>
                  </Picker>
                  <Text style={styles.bodyText}>Nomor Induk</Text>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder="Nomor Induk"
                    keyboardType='number-pad'
                    value= {this.state.nomor_induk}
                    onChangeText={text => this.setState({nomor_induk:text})}
                  />
                  <Text style={styles.bodyText}>Nama</Text>
                  <TextInput
                    style={styles.bodyTextInput}
                    placeholder="Nama"
                    keyboardType='default'
                    value= {this.state.nama}
                    onChangeText={text => this.setState({nama:text})}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this._submit} >
                      <Text style={styles.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                  
                  {this.state.isLoading &&
                    <AnimatedLoader
                      visible={true}
                      overlayColor="rgba(255,255,255,0.75)"
                      source={require("../constants/Loader.json")}
                      animationStyle={styles.lottie}
                      speed={1}
                    />
                  }
                </View>
                
              </View>
              </ImageBackground>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

          </SafeAreaView>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  logoContainer:{
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:23,
  },
  bodyrow: {
    flex: 8,
    backgroundColor: 'transparent',
  },
  logo:{
    width:100,
    height:100,
    resizeMode: 'contain'
  },
  title2:{
    color: '#002F63',
    fontSize: 12,
    textAlign: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  title:{
    color: '#002F63',
    fontSize: 25,
    textAlign: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer:{
    backgroundColor: '#459EDA',
    paddingVertical: 15,
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    paddingTop: 10,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight : 'bold',
    fontSize: 18
  },
  lottie: {
    width: 200,
    height: 200
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null,
  },
  bodyText: {
    color: 'black',
    fontSize: 15,
    margin: 5,
  },
  bodyTextInput: {
    fontSize: 15,
    margin: 5,
    height:30,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal : 10,
    borderRadius: 10,
  },
});