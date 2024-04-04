import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { UserContextProvider } from './utils/UserContext'

import Reservations from './view/Reservations'
import Main from './view/Main'
import Login from "./view/Login"

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <UserContextProvider>
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
    </UserContextProvider>
  )
}