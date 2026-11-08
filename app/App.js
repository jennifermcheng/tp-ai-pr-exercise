import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://localhost:3000';

function formatDate(iso) {
  return new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');

  const loadEvents = () => {
    fetch(`${API_URL}/events`)
      .then((r) => r.json())
      .then((data) => setEvents(data));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = () => {
    fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, location, date, capacity: Number(capacity) }),
    }).then(() => loadEvents());
  };

  const rsvp = (id) => {
    fetch(`${API_URL}/events/${id}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    }).then(() => loadEvents());
  };

  const visible = events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Berkeley Events</Text>
      <TextInput style={styles.input} placeholder="Search events" value={query} onChangeText={setQuery} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.half]} placeholder="Your name" value={name} onChangeText={setName} />
        <TextInput style={[styles.input, styles.half]} placeholder="Your email" value={email} onChangeText={setEmail} />
      </View>
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.location}</Text>
            <Text>{formatDate(item.date)}</Text>
            <Text>{item.rsvpCount}/{item.capacity} going</Text>
            <Button title="RSVP" onPress={() => rsvp(item.id)} />
          </View>
        )}
      />
      <Text style={styles.h2}>Add an event</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Date (ISO, e.g. 2026-12-01T19:00:00Z)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Capacity" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
      <Button title="Add event" onPress={addEvent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  h1: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  h2: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginVertical: 4 },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginVertical: 6 },
  title: { fontSize: 16, fontWeight: '600' },
});
