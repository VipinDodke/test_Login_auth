import {StyleSheet,Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const loginStyles = StyleSheet.create({
  keyBoardStyle: {flex: 1, justifyContent: 'flex-start'},
  containe: {
    flex: 1,
    width: width - 40,
    height,
    backgroundColor: 'white',
  },
  headContainer: {flex: 0.25},
  logoStyle: {width: width / 2.5, height: width / 5.5},
  headerText: {
    fontSize: Platform.OS === 'ios' ? 20 : 35,
    lineHeight: Platform.OS === 'ios' ? 23 : 40,
    letterSpacing: 1.3,
    fontWeight: '700',
    color: 'black',
  },
  mainBodyContainer: {flex: 0.3, justifyContent: 'space-evenly'},
  lableStyle: {
    fontSize: Platform.OS === 'ios' ? 11 : 13,
    color: 'black',
    lineHeight: Platform.OS === 'ios' ? 13 : 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
  },
  buttonStyle: {
    width: width - 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0041C2',
    height: 40,
    top: '10%',
  },
  buttonText: {color: 'white', fontSize: 13, lineHeight: 13},
});

export default loginStyles;
