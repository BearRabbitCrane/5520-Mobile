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
        {/* Define the Home screen with customized header options */}
        <Stack.Screen 
          name="Home"  // Screen name
          component={Home}  // Home component
          options={{
            title: 'Welcome to My Goals App',  // Custom title for the navigation bar
            headerStyle: { backgroundColor: '#4a148c' },  // Background color of the header
            headerTintColor: '#fff',  // Font color of the header text
          }}
        />
        
        {/* Define the GoalDetails screen */}
        <Stack.Screen 
          name="GoalDetails"  // Arbitrary name for the GoalDetails screen
          component={GoalDetails}  // GoalDetails component
          options={{ title: 'Details' }}  // Optional: Customize header title for GoalDetails
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
