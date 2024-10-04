import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4a148c' },  // Global header background color
          headerTintColor: '#fff',  // Global header text color
        }}
      >
        {/* Home screen with unique title */}
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{ title: 'All My Goals' }}  // Only set unique title here
        />

        {/* GoalDetails screen with dynamic title */}
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route }) => {
            const isMoreDetails = route.params && route.params.isMoreDetails;
            return {
              title: isMoreDetails ? 'More Details' : route.params.goal.text,  // Dynamic title
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
