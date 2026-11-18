# Berkeley Events Board

A campus event board: browse events, RSVP, and add new events.

## Setup
1. `cd backend && npm install && npm start` (API on port 3000)
2. In a second terminal: `cd app && npm install && npx expo start --web`
3. Tests: `npm test` in `backend/` (all passing)

## Features
- Browse and search events
- RSVP to events (with capacity limits)
- Create events
- Cancel an RSVP
- Save events (in progress, see below)

## Not finished yet
The client also wants people to be able to **save events** they're interested in.
I started on it (`app/components/SaveButton.js` and a few TODO comments in `app/App.js`)
but didn't get to finish. The comments in those files explain what's left.
