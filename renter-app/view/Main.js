import { useNavigation } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useUserContext } from "../utils/UserContext"

import StyledButton from "../components/StyledButton"
import { logout } from "../data/AuthActions"
import { showAlert } from "../utils/alertUtils"

import Home from "./Home"
import Reservations from "./Reservations"

const Tab = createBottomTabNavigator()

export default function Main() {
    const pilot = useNavigation()
    const { user, setUser } = useUserContext()

    const handleManagementTabPress = (e) => {
        if (user) {
            pilot.navigate("Reservations")
        } else {
            e.preventDefault()
            showAlert("Access denied", "You must be logged in", () =>
                pilot.navigate("Login")
            )
        }
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
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
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Reservation"
                component={Reservations}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="star"
                            color={color}
                            size={size}
                        />
                    ),
                }}
                listeners={{ tabPress: handleManagementTabPress, }}
            />
        </Tab.Navigator>
    )
}
