import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Listings from "./view/Listings";
import Post from "./view/Post";
import Login from "./view/Login";
import AuthButton from "./components/AuthButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Listings"
          component={Listings}
          options={{ headerRight: AuthButton }}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
