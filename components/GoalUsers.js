import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';

const GoalUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data (this function will run once after the component mounts)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // Set the fetched users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle sending the POST request
  const handlePostUser = async () => {
    const fakeUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',  // Example data to send
    };

    try {
      const response = await fetch('https://example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fakeUser), // Convert JS object to JSON string
      });

      if (response.ok) {
        Alert.alert('Success', 'User sent successfully!');
        const responseData = await response.json();
        console.log('Response from server:', responseData);
      } else {
        Alert.alert('Error', 'Failed to send user data.');
      }
    } catch (error) {
      console.error('Error sending user:', error);
      Alert.alert('Error', 'Failed to send user.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      {/* Add a button to trigger the POST request */}
      <Button title="Send User Data" onPress={handlePostUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default GoalUsers;
