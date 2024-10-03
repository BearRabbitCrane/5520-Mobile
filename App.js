import React from 'react';
import { Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home screen */}
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            title: 'All My Goals',
            headerStyle: { backgroundColor: '#4a148c' },
            headerTintColor: '#fff',
          }}
        />

        {/* GoalDetails screen */}
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route }) => {
            // Set title to 'More Details' if navigating from the "More Details" button
            const isMoreDetails = route.params && route.params.isMoreDetails;

            return {
              title: isMoreDetails ? 'More Details' : route.params.goal.text,  // Fixed title if from "More Details", otherwise dynamic
              headerRight: () => (
                <Button
                  onPress={() => Alert.alert('More Info', 'You pressed the header button!')}
                  title="Info"
                  color="#fff"
                />
              ),
              headerStyle: { backgroundColor: '#4a148c' },
              headerTintColor: '#fff',
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
