import { FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '@env';
import { format, fromUnixTime } from 'date-fns';

export const formatTime = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), 'HH:mm');
};
export const firebaseConfig = {
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
};
