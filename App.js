import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';  // Import Home component
import GoalDetails from './components/GoalDetails';  // Import GoalDetails component

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define the Home screen */}
        <Stack.Screen 
          name="Home"  // Name for the Home screen
          component={Home}  // Home component
          options={{ title: 'Home Page' }}  // Optional: Customize header title
        />
        
        {/* Define the GoalDetails screen */}
        <Stack.Screen 
          name="GoalDetails"  // Arbitrary name for the GoalDetails screen
          component={GoalDetails}  // GoalDetails component
          options={{ title: 'Goal Details' }}  // Optional: Customize header title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
