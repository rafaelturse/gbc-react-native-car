import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './view/Home'
import Reservations from './view/Reservations'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>          
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Reservations" component={Reservations} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}