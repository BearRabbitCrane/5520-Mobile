import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";  // Import the new GoalItem component

export default function App() {
  const appName = "My app";
  const [goals, setGoals] = useState([]);  // Array to store multiple goals
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback function when user adds a goal
  const handleInputData = (data) => {
    // Create a new goal object with text and random id
    const newGoal = {
      text: data,  // User input
      id: Math.random().toString(),  // Random number as id
    };

    // Add the new goal object to the goals array using the spread operator
    setGoals((currentGoals) => [
      ...currentGoals,
      newGoal,
    ]);

    setIsModalVisible(false);  // Close the modal after adding the goal
  };

  // Function to delete a goal by id
  const handleDeleteGoal = (id) => {
    // Update goals array by filtering out the goal with the matching id
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Close the modal without adding a goal
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topSection}>
        <Header name={appName} />
        <Button title="Add a goal" onPress={showModal} />
      </View>

      <View style={styles.bottomSection}>
        {/* Use FlatList to render the goals */}
        <FlatList
          data={goals}  // Pass the goals array as data
          renderItem={({ item }) => (
            <GoalItem 
              text={item.text} 
              id={item.id} 
              onDelete={handleDeleteGoal}  // Pass the delete handler to GoalItem
            />
          )}
          keyExtractor={(item) => item.id}  // Use id as the key extractor

          // Conditionally display the header if goals exist
          ListHeaderComponent={() => goals.length > 0 && (
            <View style={styles.header}>
              <Text style={styles.headerText}>My goals</Text>
            </View>
          )}

          // Display a message if no goals are present
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyText}>No goals to show</Text>
            </View>
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
}

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
    width: "100%",  // Make sure section takes full width
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
});
