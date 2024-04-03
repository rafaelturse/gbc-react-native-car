import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import Home from './view/Home'
import Reservations from './view/Reservations'

const Tab = createBottomTabNavigator()

export default function App() {

  return (
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
  )
}