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
    getDocs,
    addDoc,
    query,
    where,
    updateDoc
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
   INITIALIZE FIREBASE & GLOBAL EXPORTS
   ===================================================== */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

window.auth = auth;
window.db = db;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

setPersistence(auth, browserLocalPersistence).catch(err => console.error("Firebase persistence error:", err));

/* =====================================================
   UI PROFILE PICTURE RENDER
   ===================================================== */
function renderProfilePictures(photoURL, displayName = "User") {
    const avatarElements = document.querySelectorAll('.profile-img, #profileImg, .avatar-img, #userAvatar, img[alt*="profile"]');
    const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f39c12&color=fff`;
    const finalPhoto = (photoURL && photoURL.trim().length > 10) ? photoURL : fallbackSrc;

    avatarElements.forEach(img => {
        if (img && img.tagName === "IMG") {
            img.src = finalPhoto;
        }
    });
}

/* =====================================================
   SAVE USER TO LOCALSTORAGE & FIRESTORE DATABASE
   ===================================================== */
async function saveJusticeUser(user, extraData = {}) {
    if (!user) return;

    const existingLocal = JSON.parse(localStorage.getItem("justiceUser") || "{}");

    const userName = extraData.name || existingLocal.name || user.displayName || "User";
    const userEmail = user.email || existingLocal.email || "";
    const username = extraData.username || existingLocal.username || "";
    const photoURL = extraData.photoURL || existingLocal.photoURL || user.photoURL || "";

    const profileData = {
        uid: user.uid,
        name: userName,
        username: username.toLowerCase(),
        email: userEmail,
        photoURL: photoURL,
        updatedAt: new Date().toISOString()
    };

    // Save locally and render UI immediately
    localStorage.setItem("justiceUser", JSON.stringify(profileData));
    renderProfilePictures(photoURL, userName);

    try {
        await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
        console.log("Profile successfully saved to Firestore!");
    } catch (err) {
        console.error("Firestore Save Error:", err);
    }
}

/* =====================================================
   SAVE PROFILE FORM FUNCTIONALITY
   ===================================================== */
document.addEventListener("click", async function(event) {
    const saveBtn = event.target.closest("#saveProfileBtn") || (event.target.tagName === "BUTTON" && event.target.textContent.includes("Save Profile"));
    
    if (!saveBtn) return;
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Please sign in first to save your profile!");
        return;
    }

    const usernameInput = document.querySelector('input[placeholder*="username"], input[value*="bisma"]') || document.getElementById("profileUsername");
    const nameInput = document.querySelector('input[placeholder*="Name"], input[value*="Bisma"]') || document.getElementById("profileName");
    const fileInput = document.querySelector('input[type="file"]');

    const username = usernameInput ? usernameInput.value.trim() : "";
    const name = nameInput ? nameInput.value.trim() : "";

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function(e) {
            const photoURL = e.target.result;
            await saveJusticeUser(currentUser, { name, username, photoURL });
            saveBtn.disabled = false;
            saveBtn.textContent = "Save Profile";
            alert("Profile & Picture saved successfully!");
        };
        reader.readAsDataURL(file);
    } else {
        await saveJusticeUser(currentUser, { name, username });
        saveBtn.disabled = false;
        saveBtn.textContent = "Save Profile";
        alert("Profile saved successfully!");
    }
});

/* =====================================================
   SEARCH USER FUNCTIONALITY
   ===================================================== */
export async function searchUserByUsernameOrName(searchQuery) {
    if (!searchQuery) return [];

    const searchTerm = searchQuery.trim();
    const searchLower = searchTerm.toLowerCase();
    const usersRef = collection(db, "users");

    try {
        const querySnapshot = await getDocs(usersRef);
        let results = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const uName = (data.username || "").toLowerCase();
            const fName = (data.name || "").toLowerCase();

            if ((uName.includes(searchLower) || fName.includes(searchLower)) && data.uid !== auth.currentUser?.uid) {
                results.push(data);
            }
        });

        return results;
    } catch (error) {
        console.error("Search User Error:", error);
        return [];
    }
}
window.searchUserByUsernameOrName = searchUserByUsernameOrName;

/* =====================================================
   TIKTOK STYLE 1-MESSAGE CHAT REQUEST
   ===================================================== */
window.sendChatRequest = async function(targetUid, targetName, targetPhoto) {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("Please sign in first!");

    const firstMsg = prompt(`Send a chat request message to ${targetName}:`);
    if (!firstMsg || !firstMsg.trim()) return;

    try {
        const requestsRef = collection(db, "requests");
        const q = query(requestsRef, where("senderUid", "==", currentUser.uid), where("receiverUid", "==", targetUid));
        const snap = await getDocs(q);

        if (!snap.empty) {
            alert("Chat request already sent to this user!");
            return;
        }

        const senderData = JSON.parse(localStorage.getItem("justiceUser") || "{}");

        await addDoc(requestsRef, {
            senderUid: currentUser.uid,
            senderName: senderData.name || currentUser.displayName || "User",
            senderPhoto: senderData.photoURL || "",
            receiverUid: targetUid,
            receiverName: targetName,
            initialMessage: firstMsg.trim(),
            status: "pending",
            createdAt: new Date().toISOString()
        });

        alert("Request sent successfully! Once accepted, you can chat.");
    } catch (err) {
        console.error("Error sending request:", err);
        alert("Failed to send request.");
    }
};

window.respondToChatRequest = async function(requestId, action, senderUid, senderName, senderPhoto) {
    try {
        const reqRef = doc(db, "requests", requestId);
        if (action === "accept") {
            await updateDoc(reqRef, { status: "accepted" });
            alert("Request accepted!");
            window.openDirectChatWindow(senderUid, senderName, senderPhoto);
        } else {
            await updateDoc(reqRef, { status: "rejected" });
            alert("Request declined.");
        }
        location.reload();
    } catch (err) {
        console.error("Respond Error:", err);
    }
};

window.openDirectChatWindow = function(uid, name, photo) {
    sessionStorage.setItem("activeChatUser", JSON.stringify({ uid, name, photo }));

    if (typeof openAuthPage === "function") {
        openAuthPage("chatPage");
    } else if (typeof showPage === "function") {
        showPage("chat");
    } else {
        const chatSection = document.getElementById("chatPage") || document.getElementById("chatSection") || document.querySelector('.chat-section');
        if (chatSection) {
            document.querySelectorAll('section, .page').forEach(p => p.style.display = 'none');
            chatSection.style.display = 'block';
        }
    }

    const chatTitleHeader = document.querySelector("#chatHeaderTitle, .chat-header h3, .chat-user-name");
    if (chatTitleHeader) {
        chatTitleHeader.textContent = name;
    }
};

/* =====================================================
   SIGN UP & SIGN IN
   ===================================================== */
document.addEventListener("submit", function(event) {
    const form = event.target;
    if (!form || (form.id !== "signupForm" && form.id !== "signinForm")) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const isSignUp = form.id === "signupForm";
    const email = document.getElementById(isSignUp ? "signupEmail" : "email").value.trim().toLowerCase();
    const password = document.getElementById(isSignUp ? "signupPassword" : "password").value;
    const message = document.getElementById(isSignUp ? "signupMessage" : "signinMessage");

    if (isSignUp) {
        const name = document.getElementById("signupName").value.trim();
        const confirmPassword = document.getElementById("signupConfirmPassword").value;

        if (password !== confirmPassword) {
            if (message) message.textContent = "Passwords do not match.";
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async function(result) {
                await saveJusticeUser(result.user, { name });
                if (message) message.textContent = "Account created successfully!";
                setTimeout(() => {
                    if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                    else if (typeof showPage === "function") showPage("welcome");
                }, 1000);
            })
            .catch(err => { if (message) message.textContent = "Sign up failed: " + err.code; });
    } else {
        const nameInput = document.getElementById("fullName");
        const name = nameInput ? nameInput.value.trim() : "";

        signInWithEmailAndPassword(auth, email, password)
            .then(async function(result) {
                await saveJusticeUser(result.user, { name });
                if (message) message.textContent = "Sign in successful!";
                setTimeout(() => {
                    if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                    else if (typeof showPage === "function") showPage("welcome");
                }, 700);
            })
            .catch(err => { if (message) message.textContent = "Sign in failed: " + err.code; });
    }
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
        signInWithPopup(auth, googleProvider)
            .then(async function(result) {
                await saveJusticeUser(result.user, { name: result.user.displayName, photoURL: result.user.photoURL });
                setTimeout(() => {
                    if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                    else if (typeof showPage === "function") showPage("welcome");
                }, 700);
            })
            .catch(err => console.error("Google Auth Error:", err));
    };
});

/* =====================================================
   FORGOT PASSWORD
   ===================================================== */
document.addEventListener("click", function(event) {
    const button = event.target.closest("#resetPasswordButton");
    if (!button) return;

    event.preventDefault();
    const emailInput = document.getElementById("resetEmail");
    const message = document.getElementById("resetMessage");
    if (!emailInput) return;

    const email = emailInput.value.trim().toLowerCase();
    if (!email) return;

    sendPasswordResetEmail(auth, email)
        .then(() => { if (message) message.textContent = "Reset link sent to your email."; })
        .catch(err => { if (message) message.textContent = "Reset error: " + err.code; });
}, true);

/* =====================================================
   SEARCH UI & CHAT EVENT HANDLERS
   ===================================================== */
document.addEventListener("keydown", async function (event) {
    const input = event.target;
    
    if (event.key === "Enter" && input && (input.placeholder?.toLowerCase().includes("faiqi") || input.placeholder?.toLowerCase().includes("search"))) {
        event.preventDefault();

        const queryStr = input.value.trim();
        if (!queryStr) return;

        const results = await searchUserByUsernameOrName(queryStr);
        let targetBox = input.parentElement.parentElement.querySelector('.chat-list') || input.parentElement.querySelector('.chat-list') || input.nextElementSibling;

        if (results.length > 0) {
            let userCards = "";
            results.forEach(user => {
                const displayName = user.name || "User";
                const displayUsername = user.username ? `@${user.username}` : "";
                const photoSrc = (user.photoURL && user.photoURL.length > 10) ? user.photoURL : `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f39c12&color=fff`;

                userCards += `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(255, 255, 255, 0.1); margin-top: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${photoSrc}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid #f39c12;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=f39c12&color=fff'">
                            <div style="text-align: left;">
                                <div style="font-weight: bold; color: white; font-size: 15px;">${displayName}</div>
                                <div style="font-size: 12px; color: #bbb;">${displayUsername}</div>
                            </div>
                        </div>
                        <button type="button" class="action-chat-btn" data-uid="${user.uid}" data-name="${displayName}" data-photo="${photoSrc}" style="padding: 8px 16px; background: #f39c12; border: none; border-radius: 6px; color: white; font-weight: bold; cursor: pointer;">Chat</button>
                    </div>
                `;
            });

            if (targetBox) targetBox.innerHTML = userCards;
        } else {
            alert("No user found with name: " + queryStr);
        }
    }
});

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".action-chat-btn");
    if (btn) {
        e.preventDefault();
        e.stopPropagation();

        const targetUid = btn.getAttribute("data-uid");
        const targetName = btn.getAttribute("data-name");
        const targetPhoto = btn.getAttribute("data-photo");

        window.sendChatRequest(targetUid, targetName, targetPhoto);
    }
});

/* =====================================================
   FETCH INCOMING REQUESTS
   ===================================================== */
async function loadUserChatRequests(currentUserUid) {
    try {
        const q = query(
            collection(db, "requests"),
            where("receiverUid", "==", currentUserUid),
            where("status", "==", "pending")
        );
        const snapshot = await getDocs(q);

        const reqContainer = document.querySelector("#chatRequests, .chat-requests-box, #requestList");
        if (!reqContainer) return;

        if (snapshot.empty) {
            reqContainer.innerHTML = "<p style='color: #888; padding: 10px; text-align:center;'>No pending chat requests.</p>";
            return;
        }

        let reqHTML = "";
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const photo = data.senderPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.senderName)}&background=f39c12&color=fff`;

            reqHTML += `
                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(20, 20, 20, 0.85); padding: 12px; border-radius: 10px; margin-bottom: 10px; border: 1px solid rgba(255, 255, 255, 0.1); color: white;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${photo}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <div style="font-weight: bold; font-size: 14px;">${data.senderName}</div>
                            <div style="font-size: 12px; color: #ccc;">"${data.initialMessage}"</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                        <button onclick="respondToChatRequest('${docSnap.id}', 'accept', '${data.senderUid}', '${data.senderName}', '${photo}')" style="background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Accept</button>
                        <button onclick="respondToChatRequest('${docSnap.id}', 'reject')" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer;">Delete</button>
                    </div>
                </div>
            `;
        });

        reqContainer.innerHTML = reqHTML;
    } catch (err) {
        console.error("Error loading chat requests:", err);
    }
}

/* =====================================================
   AUTH STATE CHANGED (AUTO-LOAD PROFILE & REQUESTS)
   ===================================================== */
onAuthStateChanged(auth, async function(user) {
    if (user) {
        // Load local data immediately to prevent flickering
        const localData = JSON.parse(localStorage.getItem("justiceUser") || "{}");
        if (localData.photoURL) {
            renderProfilePictures(localData.photoURL, localData.name);
        }

        loadUserChatRequests(user.uid);

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const data = userDoc.data();
                localStorage.setItem("justiceUser", JSON.stringify(data));
                renderProfilePictures(data.photoURL, data.name);
            } else {
                saveJusticeUser(user, { name: user.displayName, photoURL: user.photoURL });
            }
        } catch (err) {
            console.error("Auth state update error:", err);
        }
    }
});