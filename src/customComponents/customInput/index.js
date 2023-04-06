import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from '../CustomIcon';

function CustomInput({
  value,
  width,
  height,
  placeholder,
  endIcon,
  endIconValue,
  endIconPress,
  onChange,
  onBlur,
  type
}) {
  return (
    <View
      style={{
        width,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: height + 10,
        }}>
        <TextInput
        textContentType={type}
          secureTextEntry={endIconValue}
          onChange={evt => {
            onChange(evt.nativeEvent.text, evt.nativeEvent);
          }}
          onBlur={onBlur}
          style={{
            heigth: height,
            width: width - 40,
          }}
          value={value}
          placeholder={placeholder}
        />
        {endIcon && (
          <TouchableOpacity
            onPress={endIconPress}
            style={{height, alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name={'eye'}
              style={{
                fontSize: 25,
                lineHeight: 27,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default CustomInput;
