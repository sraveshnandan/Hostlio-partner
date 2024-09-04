
import { Colors, tintColorLight } from "@/constants"
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Text, View } from "react-native"
export default function TabsLayout() {

    return (
        <Tabs screenOptions={{
            headerShown: false, tabBarHideOnKeyboard: true,
            tabBarAllowFontScaling: true,
            tabBarActiveTintColor: Colors.Primary,
            tabBarShowLabel: false,
        }}>
            {/* home screen  */}
            <Tabs.Screen name="Home" options={{
                tabBarAccessibilityLabel: "red",
                tabBarIcon: ({ focused, color, }) => (
                    <Octicons name={focused ? "home" : "home"} size={25} color={color} />
                ),

            }} />

            <Tabs.Screen name="Notifications" options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Octicons name={focused ? "bell" : "bell"} color={color} size={25} />
                )
            }} />
            <Tabs.Screen name="Profile" options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Octicons name={focused ? "person" : "person"} color={color} size={25} />
                )
            }} />

        </Tabs>
    )
}