import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Import createNativeStackNavigator
import Home from './components/Home';  // Import Home component

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Nest Stack.Navigator inside NavigationContainer */}
      <Stack.Navigator>
        {/* Define the Home screen */}
        <Stack.Screen 
          name="Home"  // Screen name
          component={Home}  // Component to render (do not use JSX here)
          options={{ title: 'Home Page' }}  // Optional: Customize header title
        />
        {/* You can add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
