import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; // Import your auth instance
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile'; 
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4a148c' },
          headerTintColor: '#fff',
        }}
      >
        {isAuthenticated ? (
          // App Stack for authenticated users
          <>
            <Stack.Screen 
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: 'All My Goals',
                headerRight: () => (
                  <Ionicons
                    name="person-circle"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Profile')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="GoalDetails"
              component={GoalDetails}
              options={({ route }) => {
                const isMoreDetails = route.params && route.params.isMoreDetails;
                return {
                  title: isMoreDetails ? 'More Details' : route.params.goal.text,
                };
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: 'Profile' }}
            />
          </>
        ) : (
          // Auth Stack for unauthenticated users
          <>
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
