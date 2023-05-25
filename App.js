import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import AdminMenuScreen from "./screens/admin/adminMenuScreen";
import UserMenuScreen from "./screens/user/userMenuScreen";
import StudentDetailScreen from "./screens/admin/studentDetailScreen";
import StudentDashboardScreen from "./screens/admin/studentDashboardScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminMenuScreen"
          component={AdminMenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userMenuScreen"
          component={UserMenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentDashboardScreen"
          component={StudentDashboardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentDetailScreen"
          component={StudentDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
