import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import SaveButton from './components/SaveButton'; // PART 1: already imported for you

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

  // ===============================================================
  // PART 1: SAVED EVENTS (the freelancer started this and didn't finish)
  // The client wants people to be able to save events they're interested in.
  // Do STEP 1 in components/SaveButton.js first, then STEPS 2-4 in this file.
  // ===============================================================

  // STEP 2: Add a piece of state that remembers which events are saved.
  //   - Name it savedIds and start it as an empty array.
  //   - Use useState, just like the state variables above.
  //   - Hint: const [savedIds, setSavedIds] = useState([]);

  // STEP 3: Write a function called toggleSaved(id) that saves or un-saves an event.
  //   - If id is already in savedIds, remove it.
  //       Hint: savedIds.filter((savedId) => savedId !== id)
  //   - Otherwise, add it.
  //       Hint: [...savedIds, id]
  //   - Pass the new array to setSavedIds.

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
            {/* STEP 4: Render <SaveButton /> here, under the RSVP button.
                Pass it three props:
                  eventId={item.id}
                  saved={savedIds.includes(item.id)}
                  onToggle={toggleSaved}
                When you're done, tapping Save should change the button to
                "Saved", and tapping it again should change it back. */}
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
