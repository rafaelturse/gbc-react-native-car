import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Listings from "./Listings";
import Management from "./Management";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../utils/UserContext";
import { logout } from "../utils/AuthActions";

const Tab = createBottomTabNavigator();

export default function Main() {
  const pilot = useNavigation();
  const { user, setUser } = useUserContext();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Listings"
        component={Listings}
        options={{
          headerRight: () => (
            <StyledButton
              text={user ? "Logout" : "Login"}
              action={
                user ? () => logout(setUser) : () => pilot.navigate("Login")
              }
              small
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Management"
        component={Management}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="pencil-box-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
