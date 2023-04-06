import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import ScreenLayout from '../../appconfig/ScreenLayout';
import Logo from '../../assets/images/logo.png';
import CustomInput from '../../customComponents/customInput';
import loginStyles from './Styles';
import {verifyEmail, verifyPhone} from '../../helperFunctions';
import {api} from '../../ApiServices/ApiConfig';
import {ApiURl} from '../../ApiServices/config';
import asyncStorage from '../../customComponents/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../appconfig/Routes/RouteConst';

const LOG_LOGIN_SCREEN = ' LOG_LOGIN_SCREEN: ';
const {width} = Dimensions.get('screen');

function Login() {
  const navigation = useNavigation();
  const [Email, setEmail] = useState(''); //'eve.holt@reqres.in');
  const [passWord, setPSWD] = useState('');
  const [eyeSecurity, setEyeSecurity] = useState(true);
  const [errorState, setErrorState] = useState([]);

  const loginApiCall = () => {
    const payload = {
      email: Email,
      password: passWord,
    };
    api
      .post(ApiURl.login, payload)
      .then(userData => {
        console.log(LOG_LOGIN_SCREEN, userData);
        asyncStorage.setItem('auth_token', userData).then(() => {
          Alert.alert('User login successful... ');
          navigation.navigate(SCREEN_NAMES.home);
        });
      })
      .catch(error => {
        console.error(LOG_LOGIN_SCREEN, error);
        Alert.alert(error?.data?.error || 'Something want wrong!');
      });
  };

  const validation = useMemo(() => {
    if (
      !(
        (verifyEmail(Email.toString()) || verifyPhone(Email)) &&
        passWord.trim() !== ''
      )
    )
      return false;
    else return true;
  }, [Email, passWord]);
  const onEmailBluer = () => {
    if (!(verifyEmail(Email.toString()) || verifyPhone(Email, 'email', {}))) {
      let msg = 'Please enter a valid mail or phone.';
      if (Email === '') {
        msg = 'email or phone is required field.';
      }
      setErrorState([...errorState, {msg: msg, email: true}]);
    } else if (errorState.find(err => err.email)) {
      const newErrorState = errorState.filter(err => !err.email);
      setErrorState(newErrorState);
    }
  };

  const onPswdBluer = () => {
    if (passWord === '') {
      setErrorState([
        ...errorState,
        {msg: 'password is required field.', password: true},
      ]);
    } else if (errorState.find(err => err.password)) {
      const newErrorState = errorState.filter(err => !err.password);
      setErrorState(newErrorState);
    }
  };

  return (
    <ScreenLayout header>
      <KeyboardAvoidingView
        style={loginStyles.keyBoardStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
        enabled={false}>
        <View style={loginStyles.containe}>
          <View style={loginStyles.headContainer}>
            <Image
              source={Logo}
              resizeMode={'contain'}
              style={loginStyles.logoStyle}
            />
            <Text style={loginStyles.headerText}>
              {'Welcome to\nMega Mall'}
            </Text>
          </View>
          <View style={loginStyles.mainBodyContainer}>
            <Text style={loginStyles.lableStyle}>Email/Phone</Text>
            <CustomInput
              lable={'Email'}
              value={Email}
              type={'emailAddress'}
              placeholder={'Enter Mobile / Phone'}
              width={width / 1.11}
              onChange={val => {
                setEmail(val.toLowerCase());
              }}
              height={40}
              onBlur={onEmailBluer}
            />
            <Text style={loginStyles.lableStyle}>Password</Text>
            <CustomInput
              lable={'Email'}
              value={passWord}
              type={'password'}
              placeholder={'Enter Password'}
              width={width / 1.11}
              onChange={setPSWD}
              endIcon
              endIconValue={eyeSecurity}
              onBlur={onPswdBluer}
              endIconPress={() => setEyeSecurity(!eyeSecurity)}
              height={40}
            />
            {Boolean(errorState.length) && (
              <Text
                style={{
                  width: width / 1.2,
                  alignSelf: 'center',
                  color: 'red',
                  textAlign: 'center',
                }}>
                Error: {errorState[0].msg}
              </Text>
            )}
          </View>
          <TouchableOpacity
            disabled={!validation}
            onPress={loginApiCall}
            style={loginStyles.buttonStyle}>
            <Text style={loginStyles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

export default Login;
