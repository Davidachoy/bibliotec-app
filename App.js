import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import AdminMenuScreen from "./screens/admin/adminMenuScreen";
import ReservationsManagementScreen from "./screens/admin/reservationsManagementScreen";
import ReservationInfoScreen from "./screens/admin/reservationInfoScreen";
import UserMenuScreen from "./screens/user/userMenuScreen";
import UserReservationsScreen from "./screens/user/userReservationsScreen";
import UserReservationInfoScreen from "./screens/user/userReservationInfoScreen";
import StudentDetailScreen from "./screens/admin/studentDetailScreen";
import StudentDashboardScreen from "./screens/admin/studentDashboardScreen";
import CubiculeDashboardScreen from "./screens/admin/cubiculeDashboardScreen";
import CubiculeDetailScreen from "./screens/admin/cubiculeDetailScreen";
import CubiculeEditScreen from "./screens/admin/cubiculeEditScreen";

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
          name="ReservationsManagementScreen"
          component={ReservationsManagementScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReservationInfoScreen"
          component={ReservationInfoScreen}
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
          name="UserReservationScreen"
          component={UserReservationsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserReservationInfoScreen"
          component={UserReservationInfoScreen}
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
        
        <Stack.Screen
          name="CubiculeDashboardScreen"
          component={CubiculeDashboardScreen}
          options={{
            headerShown: false,
          }}
          
          />
            <Stack.Screen
          name="CubiculeDetailScreen"
          component={CubiculeDetailScreen}
          options={{
            headerShown: false,
          }}
          
          />
            <Stack.Screen
          name="CubiculeEditScreen"
          component={CubiculeEditScreen}
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
