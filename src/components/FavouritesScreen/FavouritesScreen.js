import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { db, auth } from '../../config/firebase';
import { collection, query, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default function FavouritesScreen({ navigation }) {
  const [favouriteEvents, setFavouriteEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const favs = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const favList = data.favouritedBy ?? [];
        if (favList.includes(auth.currentUser.uid)) {
          favs.push({ id: docSnap.id, ...data });
        }
      });
      setFavouriteEvents(favs);
    });

    return unsubscribe;
  }, []);

  const toggleFavourite = async (eventId) => {
    const eventRef = doc(db, 'events', eventId);
    const eventSnap = await getDoc(eventRef);
    const eventData = eventSnap.data();
    let favs = eventData.favouritedBy ?? [];

    if (favs.includes(auth.currentUser.uid)) {
      favs = favs.filter((id) => id !== auth.currentUser.uid);
    } else {
      favs.push(auth.currentUser.uid);
    }

    try {
      await updateDoc(eventRef, { favouritedBy: favs });
    } catch (err) {
      console.error("Error updating favourites:", err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewEvent', { event: item })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <MaterialIcons
          name="favorite"
          size={24}
          color="#FF0000"
          onPress={() => toggleFavourite(item.id)}
        />
      </View>
      <Text style={styles.subtitle}>{item.date}</Text>
      <Text style={styles.subtitle}>{item.organizer}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favouriteEvents.length === 0 ? (
        <Text style={styles.emptyText}>No favourite events yet.</Text>
      ) : (
        <FlatList
          data={favouriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
