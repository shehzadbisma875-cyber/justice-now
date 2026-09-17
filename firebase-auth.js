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
    updateDoc,
    onSnapshot
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

    localStorage.setItem("justiceUser", JSON.stringify(profileData));
    renderProfilePictures(photoURL, userName);

    try {
        await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
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
    if (!currentUser) return alert("Please sign in first!");

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

    const searchLower = searchQuery.trim().toLowerCase();
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
   TIKTOK STYLE CHAT PAGE OPEN & REQUEST SENDING
   ===================================================== */
window.openTikTokStyleChat = function(targetUid, targetName, targetPhoto) {
    sessionStorage.setItem("activeChatUser", JSON.stringify({ uid: targetUid, name: targetName, photo: targetPhoto }));

    // Switch view to chat section
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

    // Render Full Profile Banner inside Chat View
    const chatContainer = document.querySelector("#chatPage, #chatSection, .chat-section");
    if (chatContainer) {
        const existingBanner = document.getElementById("tiktokProfileHeader");
        if (existingBanner) existingBanner.remove();

        const banner = document.createElement("div");
        banner.id = "tiktokProfileHeader";
        banner.style.cssText = "background: rgba(255, 255, 255, 0.05); padding: 20px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 15px;";
        banner.innerHTML = `
            <img src="${targetPhoto}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #f39c12; margin-bottom: 10px;">
            <h3 style="color: white; margin: 0; font-size: 18px;">${targetName}</h3>
            <p style="color: #bbb; font-size: 13px; margin: 5px 0 15px 0;">Send a message request to start chatting</p>
            <div id="requestInputBox" style="display: flex; gap: 8px; max-width: 400px; margin: 0 auto;">
                <input type="text" id="initialChatMsgInput" placeholder="Send a chat request message..." style="flex: 1; padding: 10px 14px; border-radius: 20px; border: 1px solid #444; background: #222; color: white;">
                <button id="sendRequestBtn" style="padding: 10px 18px; background: #f39c12; color: white; border: none; border-radius: 20px; font-weight: bold; cursor: pointer;">Send</button>
            </div>
        `;

        chatContainer.insertBefore(banner, chatContainer.firstChild);

        document.getElementById("sendRequestBtn").onclick = async function() {
            const input = document.getElementById("initialChatMsgInput");
            const msgText = input.value.trim();
            if (!msgText) return alert("Please type a message first.");

            await sendChatRequest(targetUid, targetName, targetPhoto, msgText);
            input.value = "";
        };
    }
};

window.sendChatRequest = async function(targetUid, targetName, targetPhoto, messageText) {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("Please sign in first!");

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
            initialMessage: messageText,
            status: "pending",
            createdAt: new Date().toISOString()
        });

        alert("Chat request sent successfully!");
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
            window.openTikTokStyleChat(senderUid, senderName, senderPhoto);
        } else {
            await updateDoc(reqRef, { status: "rejected" });
            alert("Request declined.");
        }
    } catch (err) {
        console.error("Respond Error:", err);
    }
};

/* =====================================================
   SEARCH UI HANDLERS
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
                    <div class="user-profile-card" data-uid="${user.uid}" data-name="${displayName}" data-photo="${photoSrc}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(255, 255, 255, 0.1); margin-top: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;">
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
    const card = e.target.closest(".user-profile-card");
    if (card) {
        e.preventDefault();
        const targetUid = card.getAttribute("data-uid");
        const targetName = card.getAttribute("data-name");
        const targetPhoto = card.getAttribute("data-photo");

        window.openTikTokStyleChat(targetUid, targetName, targetPhoto);
    }
});

/* =====================================================
   LIVE TikTok-STYLE REQUEST COUNTER & LIST
   ===================================================== */
function listenForIncomingRequests(currentUserUid) {
    const q = query(
        collection(db, "requests"),
        where("receiverUid", "==", currentUserUid),
        where("status", "==", "pending")
    );

    onSnapshot(q, (snapshot) => {
        const count = snapshot.size;

        // 1. Update Request Badge Count on Header / Menu Option
        const requestTabs = document.querySelectorAll("#requestBadge, .request-count, #chatRequestsHeader, [data-tab='requests']");
        requestTabs.forEach(el => {
            let badge = el.querySelector(".badge-count");
            if (!badge) {
                badge = document.createElement("span");
                badge.className = "badge-count";
                badge.style.cssText = "background: #e74c3c; color: white; font-size: 11px; padding: 2px 7px; border-radius: 10px; margin-left: 6px; font-weight: bold;";
                el.appendChild(badge);
            }
            badge.textContent = count > 0 ? count : "";
            badge.style.display = count > 0 ? "inline-block" : "none";
        });

        // 2. Render Request Cards List
        const reqContainer = document.querySelector("#chatRequests, .chat-requests-box, #requestList");
        if (!reqContainer) return;

        if (snapshot.empty) {
            reqContainer.innerHTML = "<p style='color: #888; padding: 10px; text-align:center;'>No pending chat requests</p>";
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
    });
}

/* =====================================================
   AUTH STATE LISTEN
   ===================================================== */
onAuthStateChanged(auth, async function(user) {
    if (user) {
        const localData = JSON.parse(localStorage.getItem("justiceUser") || "{}");
        if (localData.photoURL) renderProfilePictures(localData.photoURL, localData.name);

        listenForIncomingRequests(user.uid);

        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                localStorage.setItem("justiceUser", JSON.stringify(data));
                renderProfilePictures(data.photoURL, data.name);
            } else {
                saveJusticeUser(user, { name: user.displayName, photoURL: user.photoURL });
            }
        } catch (err) {
            console.error("Auth state error:", err);
        }
    }
});