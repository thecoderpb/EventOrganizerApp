import React from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import { auth, db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function ViewEventScreen({ route, navigation }) {
  const { event } = route.params;

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "events", event.id));
            alert("Event deleted successfully");
            navigation.goBack(); // Go back to the previous screen after deletion
          } catch (error) {
            alert("Error deleting event: " + error.message);
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    Alert.alert("Edit Event", "Are you sure you want to edit this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Edit",
        onPress: () => {
          navigation.navigate("EditEvent", { event });
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{event.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{event.description}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{event.location}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{event.date}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{event.time}</Text>

        <Text style={styles.label}>Organizer</Text>
        <Text style={styles.value}>{event.organizer}</Text>
      </ScrollView>

      {auth.currentUser?.uid === event.userId && (
        <View style={styles.deleteContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButtonRed}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
