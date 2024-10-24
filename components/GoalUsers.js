import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

const GoalUsers = () => {
  const [users, setUsers] = useState([]); // Initialize users state as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data from a fake API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json(); // Parse the response into JSON
        setUsers(data); // Set the users state with the data received from the API
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers(); // Call the async function inside useEffect
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loader while fetching data
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Users</Text>
      {/* Render a FlatList of user names */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            {/* Render user name */}
            <Text style={styles.userName}>{item.name}</Text> 
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  userItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalUsers;
