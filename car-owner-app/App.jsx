import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "./view/Post";
import Login from "./view/Login";
import Main from "./view/Main";
import { UserContextProvider } from "./utils/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
