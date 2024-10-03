import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Import createNativeStackNavigator
import Home from './components/Home';  // Import Home component

// Call createNativeStackNavigator outside the App function
const Stack = createNativeStackNavigator();  // Create the Stack Navigator

// Define App as a functional component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define your screens inside Stack.Navigator */}
        <Stack.Screen name="Home" component={Home} /> 
        {/* You can add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
