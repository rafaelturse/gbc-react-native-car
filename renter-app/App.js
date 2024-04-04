import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./view/Home";
import Reservations from "./view/Reservations";

const Tab = createBottomTabNavigator();

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
  )
}
