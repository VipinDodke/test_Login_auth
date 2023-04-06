import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_ROUTES} from './RouteConst';
import ScreenConfig from '../ScrensConfig';
import asyncStorage from '../../customComponents/AsyncStorage';

function Route() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    if (initialRoute === null) {
      SplashScreen.hide();
      asyncStorage
        .getItem('auth_token')
        .then(result => {
          if (result) {
            setInitialRoute(
              SCREEN_ROUTES.find(route => route.key === 'home_screen'),
            );
          } else {
            setInitialRoute(SCREEN_ROUTES.find(route => route.initial));
          }
        })
        .catch(error => {
          setInitialRoute(SCREEN_ROUTES.find(route => route.initial));
        });
    }
  }, [initialRoute]);

  if (initialRoute === null) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName={initialRoute.name}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          gestureEnabled: false,
          stackAnimation: 'none',
        }}>
        {SCREEN_ROUTES.map(route => {
          return (
            <Stack.Screen key={route.key} name={route.name}>
              {props => <ScreenConfig {...props} routeData={{...route}} />}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
