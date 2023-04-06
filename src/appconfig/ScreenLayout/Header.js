import {View, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from '../../customComponents/CustomIcon';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');
function Header() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          try {
            navigation.goBack();
          } catch (e) {
            console.log(e);
          }
        }}>
        <Icon
          name={'small-left'}
          style={{fontSize: 15, fontWeight: '900', color: 'black', left: '3%'}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
