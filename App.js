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
import reserveCubiculeScreen from "./screens/user/reserveCubiculeScreen";
import AddCubiculeScreen from "./screens/admin/addCubiculeScreen";
import CubiculeDashboardScreen from "./screens/admin/cubiculeDashboardScreen";
import CubiculeDetailScreen from "./screens/admin/cubiculeDetailScreen";
import StudentEditScreen from "./screens/admin/studentEditScreen";
import TimeUsageManager from "./screens/admin/TimeUsageManager";
import TimeManagerDetail from "./screens/admin/TimeManagerDetail";
import UserEncuesta from "./screens/user/userEncuesta";
import CubiculeEditScreen from "./screens/admin/cubiculeEditScreen";

import BlockCubicule from "./screens/admin/BlockCubicule";

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
          name="BlockCubicule"
          component={BlockCubicule}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TimeManagerDetail"
          component={TimeManagerDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentEditScreen"
          component={StudentEditScreen}
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
          name="AddCubiculeScreen"
          component={AddCubiculeScreen}
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
          name="reserveCubiculeScreen"
          component={reserveCubiculeScreen}
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

        <Stack.Screen
          name="UserEncuesta"
          component={UserEncuesta}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TimeUsageManager"
          component={TimeUsageManager}
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
