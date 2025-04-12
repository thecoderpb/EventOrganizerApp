import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../../config/firebase';
import { collection, onSnapshot, query, doc, updateDoc, getDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

    let newFavourites = [...(eventData.favouritedBy || [])];

    if (newFavourites.includes(auth.currentUser.uid)) {
      newFavourites = newFavourites.filter((id) => id !== auth.currentUser.uid);
    } else {
      newFavourites.push(auth.currentUser.uid);
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
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewEvent', { event: item })}
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.date}</Text>
          <Text style={styles.subtitle}>Organized by {item.organizer}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
          <MaterialIcons
            name={favourites.includes(item.id) ? "favorite" : "favorite-border"}
            size={26}
            color={favourites.includes(item.id) ? "#E91E63" : "#B0B0B0"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
