import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { db, auth } from '../../config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import styles from './styles';

export default function CreateEventScreen({ route, navigation }) {
  const event = route.params?.event;
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [location, setLocation] = useState(event ? event.location : '');
  const [date, setDate] = useState(event ? event.date : '');
  const [time, setTime] = useState(event ? event.time : '');
  const [organizer, setOrganizer] = useState(event ? event.organizer : '');

  const handleSubmit = async () => {
    if (!title || !description || !location || !date || !time || !organizer) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      if (event) {
        const eventRef = doc(db, 'events', event.id);
        await updateDoc(eventRef, { title, description, location, date, time, organizer });
      } else {
        await addDoc(collection(db, 'events'), {
          title,
          description,
          location,
          date,
          time,
          organizer,
          userId: auth.currentUser.uid,
          favouritedBy: [],
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Organizer Name"
        value={organizer}
        onChangeText={setOrganizer}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{event ? 'Update Event' : 'Create Event'}</Text>
      </TouchableOpacity>
    </View>
  );
}
