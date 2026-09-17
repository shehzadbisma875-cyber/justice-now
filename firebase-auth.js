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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

window.auth = auth;
window.db = db;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

setPersistence(auth, browserLocalPersistence).catch(err => console.error("Persistence Error:", err));

/* =====================================================
   SAVE & UPDATE USER PROFILE (PERMANENT SAVE)
   ===================================================== */
async function saveJusticeUser(user, extraData = {}) {
    if (!user) return;

    // LocalStorage سے پرانا ڈیٹا لے کر چیک کریں تاکہ تصویر ڈلیٹ نہ ہو
    const localData = JSON.parse(localStorage.getItem("justiceUser") || "{}");

    const userName = extraData.name || localData.name || user.displayName || "User";
    const userEmail = user.email || localData.email || "";
    const username = extraData.username || localData.username || "";
    const photoURL = extraData.photoURL || localData.photoURL || user.photoURL || "";

    const profileData = {
        uid: user.uid,
        name: userName,
        username: username.toLowerCase(),
        email: userEmail,
        photoURL: photoURL,
        updatedAt: new Date().toISOString()
    };

    // 1. LocalStorage میں سیو کریں (تاکہ ہر بار ایپ اوپن ہونے پر فوراً مل جائے)
    localStorage.setItem("justiceUser", JSON.stringify(profileData));

    // UI میں تصویر اپ ڈیٹ کریں
    updateUIProfilePicture(photoURL, userName);

    // 2. Firestore میں سیو کریں
    try {
        await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
        console.log("Profile permanently saved!");
    } catch (err) {
        console.error("Firestore Save Error:", err);
    }
}

/* UI میں پروفائل پکچر دکھانے کا فنکشن */
function updateUIProfilePicture(photoURL, name = "User") {
    const avatarImgs = document.querySelectorAll('.profile-img, #profileImg, .avatar-img, #userAvatar');
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f39c12&color=fff`;

    const finalSrc = (photoURL && photoURL.trim().length > 5) ? photoURL : defaultAvatar;

    avatarImgs.forEach(img => {
        if (img) img.src = finalSrc;
    });
}

/* =====================================================
   SAVE PROFILE FORM CLICK HANDLER
   ===================================================== */
document.addEventListener("click", async function(event) {
    const saveBtn = event.target.closest("#saveProfileBtn") || 
                    (event.target.tagName === "BUTTON" && event.target.textContent.includes("Save Profile"));
    
    if (!saveBtn) return;
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Please sign in first!");
        return;
    }

    const usernameInput = document.querySelector('input[placeholder*="username"], input[value*="bisma"]') || document.getElementById("profileUsername");
    const nameInput = document.querySelector('input[placeholder*="Name"], input[value*="Bisma"]') || document.getElementById("profileName");
    const fileInput = document.querySelector('input[type="file"]');

    const username = usernameInput ? usernameInput.value.trim() : "";
    const name = nameInput ? nameInput.value.trim() : "";

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function(e) {
            const photoURL = e.target.result; // Base64 Image
            await saveJusticeUser(currentUser, { name, username, photoURL });
            alert("Profile & Picture saved successfully!");
        };
        reader.readAsDataURL(file);
    } else {
        await saveJusticeUser(currentUser, { name, username });
        alert("Profile saved successfully!");
    }
});

/* =====================================================
   SEARCH USER & SHOW PICTURE + WORKING CHAT BUTTON
   ===================================================== */
export async function searchUserByUsernameOrName(searchQuery) {
    if (!searchQuery) return [];
    const searchLower = searchQuery.trim().toLowerCase();
    const usersRef = collection(db, "users");

    try {
        const querySnapshot = await getDocs(usersRef);
        let results = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const uName = (data.username || "").toLowerCase();
            const fName = (data.name || "").toLowerCase();
            if (uName.includes(searchLower) || fName.includes(searchLower)) {
                results.push(data);
            }
        });
        return results;
    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
}
window.searchUserByUsernameOrName = searchUserByUsernameOrName;

/* سرچ ان پٹ کا ایونٹ */
document.addEventListener("keydown", async function (event) {
    const input = event.target;
    if (event.key === "Enter" && input && input.placeholder && input.placeholder.toLowerCase().includes("search username")) {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) return;

        const results = await searchUserByUsernameOrName(query);
        let targetBox = input.parentElement.querySelector('.search-results') || document.querySelector('.chat-list') || input.nextElementSibling;

        if (results.length > 0) {
            let userCards = "";
            results.forEach(user => {
                const displayName = user.name || "User";
                const displayUsername = user.username ? `@${user.username}` : "";
                
                // تصویر کا درست چیک
                const photoSrc = (user.photoURL && user.photoURL.length > 10) 
                    ? user.photoURL 
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f39c12&color=fff`;

                userCards += `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(255, 255, 255, 0.1); margin-top: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${photoSrc}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #f39c12;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f39c12&color=fff'">
                            <div style="text-align: left;">
                                <div style="font-weight: bold; color: white; font-size: 15px;">${displayName}</div>
                                <div style="font-size: 12px; color: #bbb;">${displayUsername}</div>
                            </div>
                        </div>
                        <button type="button" class="action-chat-btn" data-uid="${user.uid}" data-name="${displayName}" style="padding: 8px 16px; background: #f39c12; border: none; border-radius: 6px; color: white; font-weight: bold; cursor: pointer;">Chat</button>
                    </div>
                `;
            });

            if (targetBox) targetBox.innerHTML = userCards;
        } else {
            alert("No user found with name: " + query);
        }
    }
});

/* چیٹ بٹن پر کلک کا فنکشن */
document.addEventListener("click", function(e) {
    const btn = e.target.closest(".action-chat-btn");
    if (btn) {
        e.preventDefault();
        const name = btn.getAttribute("data-name");
        
        // چیٹ کا پیج اوپن کرنا
        if (typeof showPage === "function") {
            showPage("chat");
        } else if (typeof openAuthPage === "function") {
            openAuthPage("chatPage");
        }
    }
});

/* =====================================================
   AUTH STATE & AUTO-LOAD PHOTO ON APP OPEN
   ===================================================== */
onAuthStateChanged(auth, async function(user) {
    if (user) {
        // پہلے LocalStorage سے دیکھ کر فوراً تصویر لوڈ کریں
        const localData = JSON.parse(localStorage.getItem("justiceUser") || "{}");
        if (localData.photoURL) {
            updateUIProfilePicture(localData.photoURL, localData.name);
        }

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                localStorage.setItem("justiceUser", JSON.stringify(data));
                updateUIProfilePicture(data.photoURL, data.name);
            } else {
                saveJusticeUser(user, { name: user.displayName });
            }
        } catch (err) {
            console.error("Auth Load Error:", err);
        }
    }
});