import {View, Text, StyleSheet, Keyboard} from 'react-native';
import React from 'react';
import Header from './Header';

function ScreenLayout({children, header, ...props}) {
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => Keyboard.dismiss()}>
      {Boolean(header) && <Header />}
      <View style={styles.mainContainer}>{children}</View>
    </View>
  );
}

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
