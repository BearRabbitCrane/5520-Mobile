import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "./Header";  // Import the Header component from the same folder
import { useState } from "react";
import Input from "./Input";  // Import the Input component
import GoalItem from "./GoalItem";  // Import the GoalItem component

const Home = ({ navigation }) => {
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

  // Function to show an alert and delete all goals if user confirms
  const handleDeleteAll = () => {
    Alert.alert(
      "Delete all goals",  // Alert title
      "Are you sure you want to delete all goals?",  // Alert message
      [
        {
          text: "No",  // No button
          style: "cancel",  // Cancel button style
        },
        {
          text: "Yes",  // Yes button
          onPress: () => {
            setGoals([]);  // Clear the goals array
          },
        },
      ],
      { cancelable: true }  // Alert can be dismissed by tapping outside
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Close the modal without adding a goal
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Callback to navigate to GoalDetails screen
  const handleNavigateToDetails = (goal) => {
    navigation.navigate('GoalDetails', { goal });  // Pass the entire goal object
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
              onNavigate={handleNavigateToDetails}  // Pass navigation callback to GoalItem
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

          // Conditionally display the footer if goals exist
          ListFooterComponent={() => goals.length > 0 && (
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteAllButton}>
                <Text style={styles.deleteAllText}>Delete All</Text>
              </TouchableOpacity>
            </View>
          )}

          // Separator between each item
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteAllButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  deleteAllText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#ac00e6",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Home;
