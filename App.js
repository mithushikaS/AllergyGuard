import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { AuthContext } from './contexts/AuthContext';

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ScanProductScreen from "./screens/ScanProductScreen";
import MyAllergiesScreen from "./screens/MyAllergiesScreen";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/SignupScreen";
import ExpertHelpScreen from "./screens/ExpertHelpScreen"
import SearchProductScreen from "./screens/SearchProductScreen"
import ProductResultScreen from "./screens/ProductResultScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import ScanHistoryScreen from "./screens/ScanHistoryScreen"
import HelpSupportScreen from './screens/HelpSupportScreen';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ScanProduct" component={ScanProductScreen} />
      <Stack.Screen name="MyAllergies" component={MyAllergiesScreen} />
      <Stack.Screen name="ExpertHelp" component={ExpertHelpScreen} />
      <Stack.Screen name="SearchProduct" component={SearchProductScreen} />
      <Stack.Screen name="ProductResult" component={ProductResultScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />

    </Stack.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <RootStack.Screen name="App" component={AppStack} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authContext = {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={styles.container}>
          <AuthContext.Provider value={authContext}>
            <Toaster />
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthContext.Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
  },
});


