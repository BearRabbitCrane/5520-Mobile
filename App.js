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
import Map from './components/Map'; // Import the Map component
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// Set the notification handler globally
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true, // Show alert for the notification
      shouldPlaySound: true, // Play sound for the notification
      shouldSetBadge: false, // Do not set app badge for the notification
    };
  },
});

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

    // Listener for notifications received while the app is running
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
      alert(`Notification: ${notification.request.content.title}`);
    });

    // Listener for user interaction with notifications
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
      if (response.notification.request.content.data?.goalId) {
        console.log('Navigating to goal details:', response.notification.request.content.data.goalId);
        // Add navigation logic here if necessary
      }
    });

    // Clean up listeners on unmount
    return () => {
      unsubscribe();
      subscription.remove();
      responseSubscription.remove();
    };
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
            <Stack.Screen
              name="Map"
              component={Map}
              options={{ title: 'Map' }}
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
