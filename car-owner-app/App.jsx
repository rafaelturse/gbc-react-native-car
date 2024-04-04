import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "./view/Post";
import Login from "./view/Login";
import Main from "./view/Main";
import { UserContextProvider } from "./utils/UserContext";
import { OwnedVehicleContextProvider } from "./utils/OwnedVehicleContext";

const Stack = createNativeStackNavigator();

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
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </OwnedVehicleContextProvider>
    </UserContextProvider>
  );
}
