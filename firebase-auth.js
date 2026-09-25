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
    addDoc,
    updateDoc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    getDocs,
    serverTimestamp
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

// State tracking variables for real-time messaging
let currentActiveChatId = null;
let messageUnsubscribe = null;
let selectedUserForRequest = null;

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
    const username = extraData.username ? extraData.username.toLowerCase().replace(/^@/, "") : "";
    const photoURL = extraData.photoURL || user.photoURL || "";

    const profileData = {
        uid: user.uid,
        name: userName,
        profileName: userName,
        username: username,
        email: userEmail,
        photoURL: photoURL,
        profileImage: photoURL,
        updatedAt: serverTimestamp()
    };

    localStorage.setItem("justiceUser", JSON.stringify(profileData));

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
    const saveBtn = event.target.closest("#saveProfileBtn") || 
                    event.target.closest("#jnSaveProfile") || 
                    (event.target.tagName === "BUTTON" && event.target.textContent.includes("Save Profile"));
    
    if (!saveBtn) return;
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Please sign in first to save your profile!");
        return;
    }

    const usernameInput = document.getElementById("jnMyUsername") || 
                          document.querySelector('input[placeholder*="username"], input[value*="bisma"]') || 
                          document.getElementById("profileUsername");
                          
    const nameInput = document.getElementById("jnMyProfileName") || 
                      document.querySelector('input[placeholder*="Name"], input[value*="Bisma"]') || 
                      document.getElementById("profileName");
                      
    const fileInput = document.querySelector('input[type="file"]');

    const username = usernameInput ? usernameInput.value.trim() : "";
    const name = nameInput ? nameInput.value.trim() : "";

    let photoURL = currentUser.photoURL || "";

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function(e) {
            photoURL = e.target.result;
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
   SEARCH USER FUNCTIONALITY
   ===================================================== */
export async function searchUserByUsernameOrName(searchQuery) {
    if (!searchQuery) return [];

    const searchTerm = searchQuery.trim().toLowerCase().replace(/^@/, "");
    const usersRef = collection(db, "users");

    try {
        const querySnapshot = await getDocs(usersRef);
        let results = [];

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (auth.currentUser && docSnap.id === auth.currentUser.uid) return;

            const uName = (data.username || "").toLowerCase();
            const fName = (data.name || data.profileName || "").toLowerCase();

            if (uName.includes(searchTerm) || fName.includes(searchTerm)) {
                results.push({ id: docSnap.id, ...data });
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
   CHAT SYSTEM: USER SEARCH UI & MODALS
   ===================================================== */
let searchTimer = null;
document.getElementById("jnUsernameSearch")?.addEventListener("input", function (e) {
    clearTimeout(searchTimer);
    const queryStr = e.target.value;
    const resultsContainer = document.getElementById("jnSearchResults");

    if (!queryStr.trim()) {
        if (resultsContainer) resultsContainer.innerHTML = "";
        return;
    }

    searchTimer = setTimeout(async function () {
        if (!resultsContainer) return;
        resultsContainer.innerHTML = '<div class="jn-empty-state">Searching...</div>';

        const users = await searchUserByUsernameOrName(queryStr);
        if (users.length === 0) {
            resultsContainer.innerHTML = '<div class="jn-empty-state">No users found.</div>';
            return;
        }

        resultsContainer.innerHTML = "";
        users.forEach(user => {
            const item = document.createElement("div");
            item.className = "jn-user-result";
            item.innerHTML = `
                <div class="jn-user-info">
                    <img class="jn-user-avatar" src="${user.photoURL || user.profileImage || 'https://via.placeholder.com/120'}">
                    <div>
                        <strong>${escapeText(user.name || user.profileName || "User")}</strong>
                        <small>@${escapeText(user.username || "")}</small>
                    </div>
                </div>
                <button class="jn-orange-button" type="button">Add</button>
            `;
            item.querySelector("button").addEventListener("click", () => openUserModal(user.id, user));
            resultsContainer.appendChild(item);
        });
    }, 400);
});

function openUserModal(uid, user) {
    selectedUserForRequest = { uid, ...user };
    const details = document.getElementById("jnUserDetails");
    if (details) {
        details.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <img src="${escapeAttribute(user.photoURL || user.profileImage || 'https://via.placeholder.com/120')}" style="width:90px; height:90px; border-radius:50%; object-fit:cover;">
                <h3>${escapeText(user.name || user.profileName || "User")}</h3>
                <p>@${escapeText(user.username || "")}</p>
            </div>
        `;
    }
    document.getElementById("jnUserModal")?.classList.add("active");
}

document.getElementById("jnCloseUserModal")?.addEventListener("click", () => {
    document.getElementById("jnUserModal")?.classList.remove("active");
});

/* =====================================================
   CHAT SYSTEM: CHAT REQUESTS (SEND, ACCEPT, REJECT)
   ===================================================== */
document.getElementById("jnSendRequestButton")?.addEventListener("click", async function () {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("Please sign in first.");
    if (!selectedUserForRequest) return;

    try {
        await addDoc(collection(db, "chatRequests"), {
            senderId: currentUser.uid,
            receiverId: selectedUserForRequest.uid,
            senderUsername: currentUser.displayName || "User",
            receiverUsername: selectedUserForRequest.username || "",
            status: "pending",
            createdAt: serverTimestamp()
        });
        document.getElementById("jnUserModal")?.classList.remove("active");
        alert("Chat request sent.");
    } catch (error) {
        console.error("Request Error:", error);
        alert("Could not send chat request.");
    }
});

export async function loadRequests() {
    const currentUser = auth.currentUser;
    const list = document.getElementById("jnRequestsList");
    if (!list || !currentUser) return;

    try {
        const q = query(
            collection(db, "chatRequests"),
            where("receiverId", "==", currentUser.uid),
            where("status", "==", "pending")
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            list.innerHTML = '<div class="jn-empty-state">No requests yet.</div>';
            return;
        }

        list.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const req = docSnap.data();
            const item = document.createElement("div");
            item.className = "jn-request-item";
            item.innerHTML = `
                <strong>@${escapeText(req.senderUsername || "User")}</strong>
                <p>wants to connect with you.</p>
                <div class="jn-request-buttons">
                    <button class="jn-orange-button accept-btn" type="button">Accept</button>
                    <button class="jn-orange-button reject-btn" type="button">Reject</button>
                </div>
            `;
            item.querySelector(".accept-btn").addEventListener("click", () => acceptRequest(docSnap.id, req));
            item.querySelector(".reject-btn").addEventListener("click", () => rejectRequest(docSnap.id));
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Load Requests Error:", error);
    }
}

async function acceptRequest(requestId, req) {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
        const chatId = [currentUser.uid, req.senderId].sort().join("_");
        await updateDoc(doc(db, "chatRequests", requestId), { status: "accepted" });
        await setDoc(doc(db, "chats", chatId), {
            members: [currentUser.uid, req.senderId],
            updatedAt: serverTimestamp()
        }, { merge: true });

        alert("Request accepted.");
        loadRequests();
        loadChats();
    } catch (error) {
        console.error("Accept Error:", error);
    }
}

async function rejectRequest(requestId) {
    try {
        await updateDoc(doc(db, "chatRequests", requestId), { status: "rejected" });
        loadRequests();
    } catch (error) {
        console.error("Reject Error:", error);
    }
}

/* =====================================================
   CHAT SYSTEM: LOAD CONVERSATIONS LIST
   ===================================================== */
export async function loadChats() {
    const currentUser = auth.currentUser;
    const list = document.getElementById("jnChatList");
    if (!list || !currentUser) return;

    try {
        const q = query(collection(db, "chats"), where("members", "array-contains", currentUser.uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            list.innerHTML = `
                <div class="jn-empty-state">
                    <h3>No chats yet</h3>
                    <p>Search a username to start a chat.</p>
                </div>`;
            return;
        }

        list.innerHTML = "";
        for (const docSnap of snapshot.docs) {
            const chat = docSnap.data();
            const otherUid = chat.members.find(uid => uid !== currentUser.uid);
            if (!otherUid) continue;

            const userDoc = await getDoc(doc(db, "users", otherUid));
            if (!userDoc.exists()) continue;

            const user = userDoc.data();
            const item = document.createElement("div");
            item.className = "jn-chat-item";
            item.innerHTML = `
                <img src="${user.photoURL || user.profileImage || 'https://via.placeholder.com/120'}">
                <div class="jn-chat-item-content">
                    <strong>${escapeText(user.name || user.profileName || "User")}</strong>
                    <small>@${escapeText(user.username || "")}</small>
                </div>
            `;
            item.addEventListener("click", () => openConversation(docSnap.id, user));
            list.appendChild(item);
        }
    } catch (error) {
        console.error("Load Chats Error:", error);
    }
}

/* =====================================================
   CHAT SYSTEM: REAL-TIME MESSAGING
   ===================================================== */
function openConversation(chatId, otherUser) {
    currentActiveChatId = chatId;
    const page = document.getElementById("jnConversationPage");
    const convName = document.getElementById("jnConversationName");
    const convUser = document.getElementById("jnConversationUsername");

    if (convName) convName.textContent = otherUser.name || otherUser.profileName || "User";
    if (convUser) convUser.textContent = "@" + (otherUser.username || "");
    if (page) page.classList.add("active");

    listenForMessages(chatId);
}

function listenForMessages(chatId) {
    const messagesContainer = document.getElementById("jnMessages");
    if (!messagesContainer) return;

    if (typeof messageUnsubscribe === "function") messageUnsubscribe();

    const q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    );

    messageUnsubscribe = onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const msg = docSnap.data();
            const isMine = auth.currentUser && msg.senderId === auth.currentUser.uid;

            const bubble = document.createElement("div");
            bubble.style.cssText = `
                background: ${isMine ? '#f37021' : '#0d294b'};
                color: #ffffff;
                padding: 10px 14px;
                border-radius: 14px;
                margin-bottom: 8px;
                max-width: 75%;
                margin-left: ${isMine ? 'auto' : '0'};
                margin-right: ${isMine ? '0' : 'auto'};
                word-break: break-word;
            `;
            bubble.textContent = msg.text || "";
            messagesContainer.appendChild(bubble);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

async function sendMessage() {
    const input = document.getElementById("jnMessageInput");
    if (!input) return;

    const text = input.value.trim();
    const currentUser = auth.currentUser;

    if (!text || !currentUser || !currentActiveChatId) return;

    input.value = "";
    try {
        await addDoc(collection(db, "chats", currentActiveChatId, "messages"), {
            text: text,
            senderId: currentUser.uid,
            createdAt: serverTimestamp()
        });

        await updateDoc(doc(db, "chats", currentActiveChatId), {
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Send Message Error:", error);
    }
}

document.getElementById("jnSendMessage")?.addEventListener("click", sendMessage);
document.getElementById("jnMessageInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

document.getElementById("jnConversationBack")?.addEventListener("click", () => {
    document.getElementById("jnConversationPage")?.classList.remove("active");
    currentActiveChatId = null;
    if (typeof messageUnsubscribe === "function") {
        messageUnsubscribe();
        messageUnsubscribe = null;
    }
});

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
   AUTH STATE OBSERVER
   ===================================================== */
onAuthStateChanged(auth, async function(user) {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            localStorage.setItem("justiceUser", JSON.stringify(data));
        } else {
            saveJusticeUser(user, { name: user.displayName });
        }

        loadChats();
        loadRequests();
    }
});

/* =====================================================
   HELPERS
   ===================================================== */
function escapeText(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
}

function escapeAttribute(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
