import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// Function to schedule a notification
const scheduleNotificationHandler = async () => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder!",
        body: "This is your scheduled reminder.",
        data: { info: "Reminder notification data" },
      },
      trigger: {
        seconds: 10, // Notification will trigger in 10 seconds
      },
    });

    Alert.alert("Notification Scheduled", `Your notification ID: ${notificationId}`);
  } catch (error) {
    console.error("Error scheduling notification:", error);
    Alert.alert("Error", "Failed to schedule notification.");
  }
};

const NotificationManager = () => {
  return (
    <View style={styles.container}>
      <Button title="Set Reminder" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default NotificationManager;
