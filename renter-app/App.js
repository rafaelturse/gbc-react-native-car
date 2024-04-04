import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContextProvider } from './utils/UserContext'
import { OwnedVehicleContextProvider } from './utils/OwnedVehicleContext'

import Reservations from './view/Reservations'
import Main from './view/Main'
import Login from "./view/Login"

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <UserContextProvider>
    <OwnedVehicleContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Reservations" component={Reservations} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </OwnedVehicleContextProvider>
  </UserContextProvider>
    /*
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Reservations" component={Reservations}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="star" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    */
  )
}