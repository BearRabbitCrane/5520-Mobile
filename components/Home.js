import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from "react-native";
import Header from "./Header";  
import Input from "./Input";  
import GoalItem from "./GoalItem";  
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetup";  
import { writeToDB, deleteFromDB, deleteAllFromDB } from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";  

const Home = ({ navigation }) => {
  const appName = "My app";
  const [goals, setGoals] = useState([]);  
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle adding goal input data to Firestore and updating local state
  // Inside the component that handles goal submission
const handleInputData = async (data) => {
  const newGoal = {
    text: data,
    timestamp: new Date(),
  };

  try {
    // Add the goal to Firestore and get the goal ID
    const goalId = await writeToDB(newGoal, "goals"); 
    console.log(`New goal added with ID: ${goalId}`);

    // Fetch users from API and add them to the sub-collection for this goal
    const usersArray = [
      { id: "1", name: "User 1", email: "user1@example.com", phone: "123456789" },
      { id: "2", name: "User 2", email: "user2@example.com", phone: "987654321" }
    ];

    await writeUsersToSubcollection(goalId, usersArray);  // Add users to the sub-collection for this goal
    console.log('Users added to the subcollection successfully.');

  } catch (error) {
    console.error('Failed to add goal and users:', error);
  }

  setIsModalVisible(false); // Close the modal after adding the goal
};


  // Listen for changes in the "goals" collection in Firestore and update local state
  useEffect(() => {
    // Create a Firestore listener on the "goals" collection
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      const loadedGoals = [];
      querySnapshot.forEach((doc) => {
        // Push document data into the array, including Firestore-generated ID
        loadedGoals.push({ id: doc.id, ...doc.data() });
      });
      setGoals(loadedGoals); // Update the state with the goals from Firestore
    });

    // Detach the Firestore listener when the component unmounts or when the effect runs again
    return () => {
      unsubscribe(); // Clean up the Firestore listener
      console.log('Firestore listener detached');
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle goal deletion from Firestore and local state
  const handleDeleteGoal = async (id) => {
    try {
      await deleteFromDB(id, "goals"); // Delete the goal from Firestore
      setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id)); // Remove the goal locally
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  // Handle deleting all goals from Firestore and local state
  const handleDeleteAll = async () => {
    Alert.alert("Delete all goals", "Are you sure you want to delete all goals?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: async () => {
          try {
            await deleteAllFromDB("goals"); // Delete all goals from Firestore
            setGoals([]); // Clear the local state
          } catch (error) {
            console.error('Failed to delete all goals:', error);
          }
        } 
      },
    ]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topSection}>
        <Header name={appName} />
        {/* Button to trigger "Add a goal" modal */}
        <PressableButton title="Add a goal" onPress={showModal} isDelete={false} />
      </View>

      <View style={styles.bottomSection}>
        <FlatList
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem 
              text={item.text} 
              id={item.id} 
              onDelete={handleDeleteGoal}  
              separators={separators}  // Pass separators to GoalItem for press handling
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => goals.length > 0 && (
            <View style={styles.header}>
              <Text style={styles.headerText}>My goals</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No goals to show</Text>
            </View>
          )}
          ListFooterComponent={() => goals.length > 0 && (
            <View style={styles.footer}>
              {/* Delete All button */}
              <PressableButton title="Delete All" onPress={handleDeleteAll} isDelete={true} />
            </View>
          )}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && { backgroundColor: '#32CD32' },  // Change color when highlighted
              ]}
            />
          )}
        />
      </View>

      {/* Modal for inputting a new goal */}
      <Input
        textInputFocus={true}
        onConfirm={handleInputData}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 3.5,
    backgroundColor: "pink",
    width: "100%",
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "purple",
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#00b377",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    height: 5,  // Increase thickness
    width: "50%",  // Shorten the length (play with percentage to get desired length)
    backgroundColor: "#6a0dad",  // Purple color to match the theme
    alignSelf: "center",  // Center the separator
    marginVertical: 10,
  },
});

export default Home;
