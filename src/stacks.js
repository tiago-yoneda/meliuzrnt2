import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './screens/signin';
import SignUp from './screens/signup';

const {Navigator, Screen} = createStackNavigator();
export default function Stack() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Cadastre-se" component={SignUp} />
        <Screen name="Logar" component={SignIn} />
      </Navigator>
    </NavigationContainer>
  );
}
