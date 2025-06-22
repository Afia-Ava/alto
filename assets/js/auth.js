// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7ea0aGE3rAUylcNePSHKD00R3N2MFmww",
  authDomain: "the-alto.firebaseapp.com",
  projectId: "the-alto",
  storageBucket: "the-alto.appspot.com",
  messagingSenderId: "810447970631",
  appId: "1:810447970631:web:dc8c8347bf1af79e5d2a25"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Handle auth state changes
function handleAuthStateChanged() {
  firebase.auth().onAuthStateChanged(user => {
    const joinBtn = document.getElementById('join-btn');
    const userMenu = document.getElementById('user-menu');
    const profilePic = document.getElementById('profile-pic');
    
    if (user) {
      // User is signed in, show profile picture
      if (joinBtn) joinBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'inline-block';
      
      // Set profile picture
      if (profilePic) {
        if (user.photoURL) {
          profilePic.src = user.photoURL;
        } else {
          // Default profile picture if user doesn't have one
          profilePic.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email) + '&background=4ecb8f&color=fff';
        }
      }
    } else {
      // User is signed out, show join button
      if (joinBtn) joinBtn.style.display = 'block';
      if (userMenu) userMenu.style.display = 'none';
    }
  });
}

// Handle logout
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      firebase.auth().signOut().then(() => {
        // Sign-out successful
        window.location.href = 'homepage.html';
      }).catch((error) => {
        // An error happened
        console.error('Logout error:', error);
      });
    });
  }
}

// Initialize auth handling
document.addEventListener('DOMContentLoaded', function() {
  handleAuthStateChanged();
  setupLogoutButton();
});
