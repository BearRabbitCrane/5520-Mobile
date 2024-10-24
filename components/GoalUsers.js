import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { writeUsersToSubcollection } from '../Firebase/firestoreHelper'; // Assuming this helper exists
import { collection, getDocs } from 'firebase/firestore'; // For checking existing data in Firestore
import { database } from '../Firebase/firebaseSetup'; // Firestore instance setup

const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]); // State for user data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(database, "goals", goalId, "users");

      try {
        const querySnapshot = await getDocs(usersCollectionRef);

        if (querySnapshot.empty) {
          console.log("No users found in Firestore, fetching from API...");
          
          // Fetching users from API if not found in Firestore
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const fetchedUsers = await response.json();

          // Using forEach to add each user to Firestore
          fetchedUsers.forEach(async (user) => {
            await writeUsersToSubcollection(goalId, [user]); // Writes each user into Firestore
          });

          setUsers(fetchedUsers); // Set the users fetched from the API
        } else {
          // If users already exist in Firestore, load them
          const loadedUsers = [];
          querySnapshot.forEach((doc) => {
            loadedUsers.push({ id: doc.id, ...doc.data() });
          });
          setUsers(loadedUsers); // Set the users from Firestore
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers(); // Fetch users once the component is mounted
  }, [goalId]);

  if (isLoading) {
    return <Text>Loading users...</Text>; // Loader while fetching users
  }

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalUsers;
