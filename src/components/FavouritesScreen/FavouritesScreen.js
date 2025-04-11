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
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.favouritedBy?.includes(auth.currentUser.uid)) {
          favs.push({ id: doc.id, ...data });
        }
      });
      setFavouriteEvents(favs);
    });

    return unsubscribe;
  }, []);

  const toggleFavourite = async (eventId) => {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();

    let newFavourites = [...eventData.favouritedBy];

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
      style={{
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: '#777' }}>{item.date}</Text>
      <Text style={{ fontSize: 14, color: '#777' }}>{item.organizer}</Text>
      <MaterialIcons
        name="favorite"
        size={24}
        color="#FF0000"
        style={{ position: 'absolute', top: 15, right: 15 }}
        onPress={() => toggleFavourite(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />
    </View>
  );
}
