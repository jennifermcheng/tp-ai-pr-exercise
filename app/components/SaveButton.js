import React from 'react';
import { Button } from 'react-native';

// PART 1, STEP 1: Finish this component.
//
// The client wants a "Save" button on every event so people can mark the
// events they're interested in. This component receives three props:
//   - eventId:  the id of the event this button belongs to
//   - saved:    true if the event is currently saved, false if not
//   - onToggle: a function to call when the button is pressed
//               (call it with eventId so App.js knows which event changed)
//
// To finish it:
//   1. Delete the "return null" line below.
//   2. Return a <Button /> (it's already imported from react-native above).
//   3. Set its title to "Saved" when saved is true, otherwise "Save".
//        Hint: title={saved ? 'Saved' : 'Save'}
//   4. Set its onPress to a function that calls onToggle with eventId.
//        Hint: onPress={() => onToggle(eventId)}
//
// When you're done, go to App.js for STEPS 2-4.
export default function SaveButton({ eventId, saved, onToggle }) {
  return null;
}
