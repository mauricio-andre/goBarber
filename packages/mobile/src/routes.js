import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

function Routes() {
  const signed = useSelector((state) => state.auth.signed);
  const Stack = createStackNavigator();
  // const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      {!signed ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeftContainerStyle: {
              marginLeft: 15,
            },
            headerBackImage: () => (
              <Icon name="chevron-left" size={20} color="#fff" />
            ),
          }}
        >
          <Stack.Screen
            options={{
              header: () => {},
            }}
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            options={{
              header: () => {},
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Selecione o prestador',
            }}
            name="SelectProvider"
            component={SelectProvider}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Selecione o horário',
            }}
            name="SelectDateTime"
            component={SelectDateTime}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Confirmar agendamento',
            }}
            name="Confirm"
            component={Confirm}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Routes;
