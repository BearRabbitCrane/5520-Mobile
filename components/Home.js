import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from "react-native";
import Header from "./Header";  
import { useState, useEffect } from "react";
import Input from "./Input";  
import GoalItem from "./GoalItem";  
import PressableButton from "./PressableButton";  // Import PressableButton
import { database } from "../Firebase/firebaseSetup";  
import { writeToDB } from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";  

const Home = ({ navigation }) => {
  console.log(database);
  const appName = "My app";
  const [goals, setGoals] = useState([]);  
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle adding goal input data to Firestore and updating local state
  const handleInputData = async (data) => {
    const newGoal = {
      text: data,
      timestamp: new Date(),
    };

    try {
      const docId = await writeToDB(newGoal, "goals"); // Write the goal to the Firestore "goals" collection
      console.log(`New goal added with ID: ${docId}`);
    } catch (error) {
      console.error('Failed to add goal:', error);
    }

    setIsModalVisible(false); // Close the modal after adding the goal
  };

  // Listen for changes in the "goals" collection in Firestore and update local state
  useEffect(() => {
    //querySnapshot is a list/array of documentSnapshots
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      const loadedGoals = [];
      //define an array
      querySnapshot.forEach((doc) => {
        // Push document data into the array, including Firestore-generated ID
        loadedGoals.push({ id: doc.id, ...doc.data() });
      });
      setGoals(loadedGoals); // Update the state with the goals from Firestore
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []); //the empty brackets make sure it Run only once on component mount


  const handleDeleteGoal = (id) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  };

  const handleDeleteAll = () => {
    Alert.alert("Delete all goals", "Are you sure you want to delete all goals?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => setGoals([]) },
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
        {/* Text button for "Add a goal" */}
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
              {/* Text-based delete all button */}
              <PressableButton title="Delete All" onPress={handleDeleteAll} isDelete={false} />
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
