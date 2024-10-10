import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from "react-native";
import Header from "./Header";  
import { useState } from "react";
import Input from "./Input";  
import GoalItem from "./GoalItem";  
import PressableButton from "./PressableButton";  // Import PressableButton

const Home = ({ navigation }) => {
  const appName = "My app";
  const [goals, setGoals] = useState([]);  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (data) => {
    const newGoal = {
      text: data,
      id: Math.random().toString(),
    };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setIsModalVisible(false);
  };

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
                highlighted && { backgroundColor: '#FF6347' },  // Separator color change on highlight
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
    height: 1,
    width: "90%",
    backgroundColor: "#ac00e6",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Home;
