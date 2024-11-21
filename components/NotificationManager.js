import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// Function to verify notification permissions
const verifyPermission = async () => {
    try {
      // Get current permission status
      const permissionStatus = await Notifications.getPermissionsAsync();
      if (permissionStatus.granted) {
        return true; // Permission already granted
      }
  
      // Request permission if not granted
      const requestResult = await Notifications.requestPermissionsAsync();
      return requestResult.granted; // Return whether permission was granted
    } catch (error) {
      console.error("Error verifying notification permission:", error);
      return false; // In case of error, assume permission is not granted
    }
  };

// Function to schedule a notification
const scheduleNotificationHandler = async () => {
  const hasPermission = await verifyPermission();

  if (!hasPermission) {
    Alert.alert(
      "Permission Required",
      "You need to allow notifications to set a reminder."
    );
    return;
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
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
      <Button title="Remind me to add my daily goals" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default NotificationManager;
