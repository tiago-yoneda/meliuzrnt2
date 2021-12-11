import React from 'react';

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store from './store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from './screens/onboarding';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Dash from './screens/dash';

const Tabs = createBottomTabNavigator();
// const {Navigator, Screen} = createStackNavigator();

const BottomNavigation: React.FC = () => {
  return (
    <Provider store={store}>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF0055EA',
          tabBarInactiveTintColor: '#212121EA',
        }}>
        <Tabs.Screen
          name="Onboard"
          component={Onboarding}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cadastre-se"
          component={SignUp}
          options={{
            tabBarLabel: 'Cadastro',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Logar"
          component={SignIn}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-tie"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="dash"
          component={Dash}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-edit"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </Provider>
  );
};

const Stack: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
};

export default Stack;
