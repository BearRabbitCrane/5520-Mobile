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
            title: 'All My Goals',  // Custom title for the navigation bar
            headerStyle: { backgroundColor: '#4a148c' },  // Background color of the header
            headerTintColor: '#fff',  // Font color of the header text
          }}
        />
        
        {/* GoalDetails screen with dynamic title */}
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goal.text,  // Set the goal text as the header title
            headerStyle: { backgroundColor: '#4a148c' },  // Same header style
            headerTintColor: '#fff',  // White text for header
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
