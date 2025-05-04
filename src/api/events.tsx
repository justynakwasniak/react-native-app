import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CalendarEvent } from '../components/Schedule/types';

const firebaseConfig = { //
  authDomain: 'react-native.firebaseapp.com',
  projectId: 'react-native-423ce',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const db = getFirestore(firebaseApp); 
    const snapshot = await getDocs(collection(db, 'events'));

    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        dateStart: data.dateStart.seconds, 
        dateEnd: data.dateEnd.seconds,
        title: data.title,
      };
    });

    console.log('Fetched events:', events);
    return events;
  } catch (error) {
    console.error('Błąd podczas pobierania eventów:', error);
    return [];
  }
};
