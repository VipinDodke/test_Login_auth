import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';

function ScreenConfig({routeData, ...rest}) {
  const {component: Component} = routeData;
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Component {...rest} />
    </SafeAreaView>
  );
}

export default ScreenConfig;
