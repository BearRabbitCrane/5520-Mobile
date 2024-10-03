import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer
import Home from './components/Home';  // Import Home component

// Define App as a functional component
const App = () => {
  return (
    <NavigationContainer>
      <Home />  {/* Render the Home component inside NavigationContainer */}
    </NavigationContainer>
  );
};

export default App;
