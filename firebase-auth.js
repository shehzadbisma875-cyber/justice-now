import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* =====================================================
   FIREBASE CONFIG
   ===================================================== */
const firebaseConfig = {
    apiKey: "AIzaSyDqR4opYs45_yVoWV28vXmLLWYKbAKkrKw",
    authDomain: "justice-now-406e9.firebaseapp.com",
    projectId: "justice-now-406e9",
    storageBucket: "justice-now-406e9.firebasestorage.app",
    messagingSenderId: "651828513296",
    appId: "1:651828513296:web:41f7491a9e92fddb641895"
};

/* =====================================================
   INITIALIZE FIREBASE
   ===================================================== */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

/* =====================================================
   KEEP USER SIGNED IN
   ===================================================== */
setPersistence(auth, browserLocalPersistence).catch(function(error) {
    console.error("Firebase persistence error:", error);
});

/* =====================================================
   SAVE USER TO LOCALSTORAGE & FIRESTORE DATABASE
   ===================================================== */
async function saveJusticeUser(user, extraData = {}) {
    const userName = extraData.name || user.displayName || "User";
    const userEmail = user.email || "";
    const username = extraData.username || "";
    const photoURL = extraData.photoURL || user.photoURL || "";

    const profileData = {
        uid: user.uid,
        name: userName,
        username: username.toLowerCase(),
        email: userEmail,
        photoURL: photoURL,
        updatedAt: new Date()
    };

    // Save to LocalStorage
    localStorage.setItem("justiceUser", JSON.stringify(profileData));

    // Save to Firestore Database
    try {
        await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
        console.log("Profile successfully saved to Firestore!");
    } catch (err) {
        console.error("Firestore Save Error:", err);
    }
}

/* =====================================================
   SAVE PROFILE FORM FUNCTIONALITY (آپ کا پروفائل فارم)
   ===================================================== */
document.addEventListener("click", async function(event) {
    // اگر "Save Profile" بٹن پر کلک ہو
    const saveBtn = event.target.closest("#saveProfileBtn") || (event.target.tagName === "BUTTON" && event.target.textContent.includes("Save Profile"));
    
    if (!saveBtn) return;
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Please sign in first to save your profile!");
        return;
    }

    // Input Fields سے ویلیوز حاصل کریں
    const usernameInput = document.querySelector('input[placeholder*="username"], input[value*="bisma"]') || document.getElementById("profileUsername");
    const nameInput = document.querySelector('input[placeholder*="Name"], input[value*="Bisma"]') || document.getElementById("profileName");
    const fileInput = document.querySelector('input[type="file"]');

    const username = usernameInput ? usernameInput.value.trim() : "";
    const name = nameInput ? nameInput.value.trim() : "";

    let photoURL = currentUser.photoURL || "";

    // اگر یوزر نے تصویر اپ لوڈ کی ہے
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function(e) {
            photoURL = e.target.result; // Convert image to DataURL
            await saveJusticeUser(currentUser, { name, username, photoURL });
            alert("Profile saved successfully!");
        };
        reader.readAsDataURL(file);
    } else {
        await saveJusticeUser(currentUser, { name, username, photoURL });
        alert("Profile saved successfully!");
    }
});

/* =====================================================
   SEARCH USER FUNCTIONALITY (دوسرے یوزر کو سرچ کرنے کا فیچر)
   ===================================================== */
export async function searchUserByUsernameOrName(searchQuery) {
    if (!searchQuery) return [];

    const searchTerm = searchQuery.toLowerCase().trim();
    const usersRef = collection(db, "users");

    try {
        // Username کی بنیاد پر تلاش کریں
        const q1 = query(usersRef, where("username", "==", searchTerm));
        const snapshot1 = await getDocs(q1);

        let results = [];
        snapshot1.forEach((doc) => results.push(doc.data()));

        // اگر Username سے رزلٹ نہ ملے تو Full Name کی بنیاد پر بھی سرچ کریں
        if (results.length === 0) {
            const q2 = query(usersRef, where("name", "==", searchQuery));
            const snapshot2 = await getDocs(q2);
            snapshot2.forEach((doc) => results.push(doc.data()));
        }

        return results;
    } catch (error) {
        console.error("Search User Error:", error);
        return [];
    }
}

// Global scope میں سرچ فنکشن اٹیچ کریں تاکہ HTML/JS میں کہیں بھی استعمال ہو سکے
window.searchUserByUsernameOrName = searchUserByUsernameOrName;

/* =====================================================
   SIGN UP
   ===================================================== */
document.addEventListener("submit", function(event) {
    const form = event.target;
    if (!form || form.id !== "signupForm") return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const message = document.getElementById("signupMessage");

    if (!name || !email || !password || !confirmPassword) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    message.textContent = "Creating your account...";

    createUserWithEmailAndPassword(auth, email, password)
        .then(async function(result) {
            await saveJusticeUser(result.user, { name });
            message.textContent = "Account created successfully!";
            form.reset();

            setTimeout(function() {
                if (typeof openAuthPage === "function") openAuthPage("signinPage");
                else if (typeof showPage === "function") showPage("signin");
            }, 1000);
        })
        .catch(function(error) {
            console.error("Firebase Sign Up Error:", error);
            message.textContent = "Account creation failed: " + error.code;
        });
}, true);

/* =====================================================
   SIGN IN
   ===================================================== */
document.addEventListener("submit", function(event) {
    const form = event.target;
    if (!form || form.id !== "signinForm") return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const nameInput = document.getElementById("fullName");
    const name = nameInput ? nameInput.value.trim() : "";
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const message = document.getElementById("signinMessage");

    if (!email || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    message.textContent = "Signing in...";

    signInWithEmailAndPassword(auth, email, password)
        .then(async function(result) {
            await saveJusticeUser(result.user, { name });
            message.textContent = "Sign in successful!";

            setTimeout(function() {
                if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                else if (typeof showPage === "function") showPage("welcome");
            }, 700);
        })
        .catch(function(error) {
            console.error("Firebase Sign In Error:", error);
            message.textContent = "Sign in failed: " + error.code;
        });
}, true);

/* =====================================================
   GOOGLE SIGN IN
   ===================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const signinForm = document.getElementById("signinForm");
    if (!signinForm) return;

    let googleButton = document.getElementById("googleSignInButton");

    if (!googleButton) {
        googleButton = document.createElement("button");
        googleButton.type = "button";
        googleButton.id = "googleSignInButton";
        googleButton.className = "google-signin-button";
        googleButton.innerHTML = "🌐 Continue with Google";

        const divider = document.createElement("div");
        divider.className = "auth-divider";
        divider.textContent = "OR";

        signinForm.after(divider);
        divider.after(googleButton);
    }

    googleButton.onclick = function(event) {
        event.preventDefault();

        googleButton.disabled = true;
        googleButton.textContent = "Opening Google...";

        signInWithPopup(auth, googleProvider)
            .then(async function(result) {
                await saveJusticeUser(result.user, { name: result.user.displayName });

                const message = document.getElementById("signinMessage");
                if (message) message.textContent = "Google sign in successful!";

                setTimeout(function() {
                    if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                    else if (typeof showPage === "function") showPage("welcome");
                }, 700);
            })
            .catch(function(error) {
                console.error("GOOGLE SIGN-IN ERROR:", error);
                const message = document.getElementById("signinMessage");
                if (message) message.textContent = "Google Sign-In error: " + error.code;

                googleButton.disabled = false;
                googleButton.innerHTML = "🌐 Continue with Google";
            });
    };
});

/* =====================================================
   FORGOT PASSWORD
   ===================================================== */
document.addEventListener("click", function(event) {
    const button = event.target.closest("#resetPasswordButton");
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const emailInput = document.getElementById("resetEmail");
    const message = document.getElementById("resetMessage");
    const email = emailInput.value.trim().toLowerCase();

    if (!email) {
        message.textContent = "Please enter your email address.";
        return;
    }

    message.textContent = "Sending password reset email...";

    sendPasswordResetEmail(auth, email)
        .then(function() {
            message.textContent = "Password reset link has been sent to your email.";
        })
        .catch(function(error) {
            console.error("Password Reset Error:", error);
            message.textContent = "Unable to send reset email: " + error.code;
        });
}, true);

/* =====================================================
   KEEP USER INFORMATION UPDATED
   ===================================================== */
onAuthStateChanged(auth, async function(user) {
    if (user) {
        // فائر بیس سے یوزر کا ڈیٹا حاصل کریں تاکہ پرانی معلومات ضائع نہ ہوں
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            localStorage.setItem("justiceUser", JSON.stringify(data));
        } else {
            saveJusticeUser(user, { name: user.displayName });
        }
    }
});