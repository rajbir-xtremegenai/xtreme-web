import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let messaging;
// Check for window existence for SSR
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

// Function to create or update a token on the server
export const createOrUpdateToken = async (newToken, oldToken) => {
  try {
    const url =`${process.env.NEXT_PUBLIC_API_BASE_URL}/fcm/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newToken, oldToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to save token to server');
    }

    // Save the new token to localStorage
    localStorage.setItem('fcmToken', newToken);
    console.log('Token saved to server successfully');
  } catch (error) {
    console.error('Error saving token to server:', error);
  }
};

// Function to delete a token from the server
export const deleteToken = async (token) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/fcm/token`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete token from server');
    }

    console.log('Token deleted from server successfully');
  } catch (error) {
    console.error('Error deleting token from server:', error);
  }
};


// ✅ MODIFIED: This function now handles token checking and updating
export const requestForToken = async () => {
  // Ensure messaging is initialized
  if (!messaging) {
    console.log("Firebase messaging is not available.");
    return;
  }

  try {
    const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });

    if (currentToken) {
      // 💡 Get the token you saved in localStorage
      const savedToken = localStorage.getItem('fcmToken');

      // 🔄 Check if the token is new or has changed
      if (savedToken !== currentToken) {
        console.log('New or updated FCM token found:', currentToken);

        // Send the new token and the old token (if it exists) to the server
        await createOrUpdateToken(currentToken, savedToken);

      } else {
        console.log('FCM token is already up-to-date:', currentToken);
      }
    } else {
      const savedToken = localStorage.getItem('fcmToken');
      if (savedToken) {
        // If there's no current token but we have a saved one, it might be invalid
        console.log('No registration token available, deleting old token.');
        await deleteToken(savedToken);
        localStorage.removeItem('fcmToken');
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }
  } catch (err) {
    console.log('An error occurred while retrieving token.', err);
    // If retrieving the token fails, it might be because the token is invalid.
    // Let's try to delete the saved token.
    const savedToken = localStorage.getItem('fcmToken');
    if (err.code === 'messaging/token-unsubscribe-failed' || err.code === 'messaging/permission-blocked' || err.code === 'messaging/permission-default') {
      if (savedToken) {
        await deleteToken(savedToken);
        localStorage.removeItem('fcmToken');
      }
    }
  }
};

export { messaging };