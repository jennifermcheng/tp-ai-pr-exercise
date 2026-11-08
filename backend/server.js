const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (swap for a real DB later)
let events = [
  { id: 'e1', title: 'MDB Info Session', location: 'Soda Hall 306', date: '2026-11-21T03:00:00Z', capacity: 3, rsvpCount: 2,
    rsvps: [{ name: 'Alice Wu', email: 'alice.wu@berkeley.edu' }, { name: 'Sam Patel', email: 'sam.patel@berkeley.edu' }] },
  { id: 'e2', title: 'Hackathon Kickoff', location: 'Moffitt Library', date: '2026-12-05T18:00:00Z', capacity: 50, rsvpCount: 1,
    rsvps: [{ name: 'Jo Lin', email: 'jo.lin@berkeley.edu' }] },
  { id: 'e3', title: 'Resume Workshop', location: 'Cory 540A', date: '2026-12-08T01:30:00Z', capacity: 20, rsvpCount: 0, rsvps: [] },
];

// List events
app.get('/events', (req, res) => {
  res.json(events);
});

// Create event
app.post('/events', (req, res) => {
  const { title, location, date, capacity } = req.body;
  const event = { id: uuid.generateShort(), title, location, date, capacity, rsvpCount: 0, rsvps: [] };
  events.push(event);
  res.status(201).json(event);
});

// RSVP
app.post('/events/:id/rsvp', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  if (event.rsvpCount > event.capacity) return res.status(400).json({ error: 'Event is full' });
  event.rsvps.push({ name: req.body.name, email: req.body.email });
  event.rsvpCount++;
  res.json(event);
});

app.listen(config.PORT, () => console.log(`API running on port ${config.PORT}`));
