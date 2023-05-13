import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/loginScreen";
import registerScreen from "./screens/registerScreen";
import AdminMenuScreen from "./screens/admin/adminMenuScreen";
import UserMenuScreen from "./screens/user/userMenuScreen";
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
          name="UserMenuScreen"
          component={UserMenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registerScreen"
          component={registerScreen}
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
