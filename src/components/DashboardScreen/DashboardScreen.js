import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { db, auth } from '../../config/firebase';
import { collection, onSnapshot, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import styles from './styles';

export default function DashboardScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventList = [];
      const favList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        eventList.push({ id: doc.id, ...data });
        if (data.favouritedBy?.includes(auth.currentUser.uid)) {
          favList.push(doc.id);
        }
      });
      setEvents(eventList);
      setFavourites(favList);
    });
    return unsubscribe;
  }, []);

  const toggleFavourite = async (eventId) => {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();

    let newFavourites = [...eventData.favouritedBy];

    if (newFavourites.includes(auth.currentUser.uid)) {
      newFavourites = newFavourites.filter((id) => id !== auth.currentUser.uid); // Remove from favourites
    } else {
      newFavourites.push(auth.currentUser.uid); // Add to favourites
    }

    try {
      await updateDoc(eventRef, {
        favouritedBy: newFavourites,
      });
    } catch (error) {
      console.error('Error updating favourite:', error);
    }
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ViewEvent', { event: item })}>
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventText}>{item.date}</Text>
        <Text style={styles.eventText}>{item.organizer}</Text>
        <MaterialIcons
          name={favourites.includes(item.id) ? "favorite" : "favorite-border"} // Toggle icon
          size={24}
          color="#FF0000"
          style={styles.favoriteIcon}
          onPress={() => toggleFavourite(item.id)} // Toggle favourite on press
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />
    </View>
  );
}
