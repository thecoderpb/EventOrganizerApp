import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { auth, db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import styles from './styles';

export default function EditEventScreen({ route, navigation }) {
  const { event } = route.params; // Get the event to edit
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [organizer, setOrganizer] = useState(event.organizer);

  const handleSave = async () => {
    if (!title || !description || !location || !date || !time || !organizer) {
      Alert.alert('All fields must be filled');
      return;
    }

    try {
      const eventRef = doc(db, 'events', event.id);
      await updateDoc(eventRef, {
        title,
        description,
        location,
        date,
        time,
        organizer,
      });
      Alert.alert('Event updated successfully');
      navigation.replace("HomeScreen");
    } catch (error) {
      Alert.alert('Error updating event: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        placeholder="Event Title"
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        value={description}
        placeholder="Event Description"
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        value={location}
        placeholder="Event Location"
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        value={date}
        placeholder="Event Date"
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        value={time}
        placeholder="Event Time"
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        value={organizer}
        placeholder="Organizer Name"
        onChangeText={setOrganizer}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Event</Text>
      </TouchableOpacity>
    </View>
  );
}
