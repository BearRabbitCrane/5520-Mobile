import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, SafeAreaView, FlatList } from "react-native";
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
          renderItem={({ item }) => <GoalItem text={item.text} />}  // Render GoalItem component for each goal
          keyExtractor={(item) => item.id}  // Use id as the key extractor
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
});
