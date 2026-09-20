/* =========================================================
   JUSTICE NOW - FIREBASE CHAT
   Firebase Auth file is NOT modified.
   Uses auth + db from firebase-auth.js
   ========================================================= */

import {
    auth,
    db,
    searchUserByUsernameOrName
} from "./firebase-auth.js";

import {
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

import {
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


/* =========================================================
   FIREBASE STORAGE
   ========================================================= */

const storage = getStorage();


/* =========================================================
   GLOBAL CHAT VARIABLES
   ========================================================= */

let currentUser = null;

let activeChatId = null;
let activeChatType = null; // private / group
let activeChatUser = null;
let activeGroup = null;

let messagesUnsubscribe = null;
let chatsUnsubscribe = null;
let requestsUnsubscribe = null;
let groupsUnsubscribe = null;
let callsUnsubscribe = null;

let mediaRecorder = null;
let recordedChunks = [];
let recordingTimer = null;
let recordingSeconds = 0;

let selectedCall = null;
let peerConnection = null;
let localStream = null;
let remoteStream = null;

const pendingListeners = new Map();


/* =========================================================
   AUTH STATE
   ========================================================= */

auth.onAuthStateChanged(function (user) {

    currentUser = user;

    if (!user) {
        console.log("Chat: user is not signed in.");
        return;
    }

    console.log("Chat Firebase connected:", user.uid);

    initializeChat();

});


/* =========================================================
   INITIALIZE CHAT
   ========================================================= */

function initializeChat() {

    loadMyProfile();

    listenForRequests();

    listenForChats();

    listenForGroups();

    listenForIncomingCalls();

    setupChatEvents();

}


/* =========================================================
   HELPER
   ========================================================= */

function $(id) {
    return document.getElementById(id);
}

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getInitial(name) {

    if (!name) {
        return "U";
    }

    return name.charAt(0).toUpperCase();
}


function getTime(timestamp) {

    if (!timestamp) {
        return "";
    }

    try {

        const date = timestamp.toDate
            ? timestamp.toDate()
            : new Date(timestamp);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    } catch (error) {

        return "";

    }
}


function makeChatId(uid1, uid2) {

    return [uid1, uid2]
        .sort()
        .join("_");

}


function showMessage(message) {
    alert(message);
}


/* =========================================================
   OPEN / CLOSE CHAT
   ========================================================= */

function openChatSection() {

    const chatSection = $("chatSection");

    if (chatSection) {

        chatSection.style.display = "block";

        chatSection.classList.remove("hidden");

        chatSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function closeChatSection() {

    const chatSection = $("chatSection");

    if (chatSection) {

        chatSection.style.display = "none";

        chatSection.classList.add("hidden");

    }

}


function setupChatEvents() {

    document.addEventListener("click", function (event) {

        const target = event.target;

        /* -----------------------------------------
           OPEN CHAT
        ----------------------------------------- */

        if (
            target.closest("#chatTopBtn") ||
            target.closest("[data-open-chat]")
        ) {

            event.preventDefault();

            openChatSection();

        }


        /* -----------------------------------------
           CLOSE CHAT
        ----------------------------------------- */

        if (target.closest("#closeChatBtn")) {

            event.preventDefault();

            closeChatSection();

        }


        /* -----------------------------------------
           CHAT TABS
        ----------------------------------------- */

        const tab = target.closest(".chat-tab");

        if (tab) {

            const tabName = tab.dataset.chatTab;

            if (tabName) {

                switchChatTab(tabName);

            }

        }


        /* -----------------------------------------
           SEARCH
        ----------------------------------------- */

        if (target.closest("#searchUserBtn")) {

            event.preventDefault();

            searchUsers();

        }


        /* -----------------------------------------
           NEW CHAT
        ----------------------------------------- */

        if (target.closest("#newChatBtn")) {

            event.preventDefault();

            const input = $("usernameSearch");

            if (input) {

                input.focus();

            }

        }


        /* -----------------------------------------
           SEND MESSAGE
        ----------------------------------------- */

        if (target.closest("#sendMessageBtn")) {

            event.preventDefault();

            sendTextMessage();

        }


        /* -----------------------------------------
           EMOJI
        ----------------------------------------- */

        if (target.closest("#emojiBtn")) {

            event.preventDefault();

            toggleEmojiPanel();

        }


        /* -----------------------------------------
           IMAGE
        ----------------------------------------- */

        if (target.closest("#imageBtn")) {

            event.preventDefault();

            const input = $("imageInput");

            if (input) {

                input.click();

            }

        }


        /* -----------------------------------------
           VOICE MESSAGE
        ----------------------------------------- */

        if (target.closest("#voiceMessageBtn")) {

            event.preventDefault();

            startVoiceRecording();

        }


        /* -----------------------------------------
           CANCEL RECORDING
        ----------------------------------------- */

        if (target.closest("#cancelRecordingBtn")) {

            cancelVoiceRecording();

        }


        /* -----------------------------------------
           SEND RECORDING
        ----------------------------------------- */

        if (target.closest("#sendRecordingBtn")) {

            sendVoiceRecording();

        }


        /* -----------------------------------------
           CHAT MENU
        ----------------------------------------- */

        if (target.closest("#chatMenuBtn")) {

            const menu = $("chatMenu");

            if (menu) {

                menu.classList.toggle("hidden");

            }

        }


        /* -----------------------------------------
           PROFILE
        ----------------------------------------- */

        if (target.closest("#chatProfileBtn")) {

            if (activeChatUser) {

                openUserProfile(activeChatUser);

            }

        }


        if (target.closest("#viewUserProfileBtn")) {

            if (activeChatUser) {

                openUserProfile(activeChatUser);

            }

        }


        /* -----------------------------------------
           MUTE
        ----------------------------------------- */

        if (target.closest("#muteChatBtn")) {

            toggleMuteChat();

        }


        /* -----------------------------------------
           DELETE CHAT
        ----------------------------------------- */

        if (target.closest("#deleteChatBtn")) {

            deleteCurrentChat();

        }


        /* -----------------------------------------
           BLOCK
        ----------------------------------------- */

        if (target.closest("#blockUserBtn")) {

            blockCurrentUser();

        }


        /* -----------------------------------------
           VOICE CALL
        ----------------------------------------- */

        if (target.closest("#voiceCallBtn")) {

            startCall("audio");

        }


        /* -----------------------------------------
           VIDEO CALL
        ----------------------------------------- */

        if (target.closest("#videoCallBtn")) {

            startCall("video");

        }


        /* -----------------------------------------
           CREATE GROUP
        ----------------------------------------- */

        if (target.closest("#createGroupBtn")) {

            openGroupModal();

        }


        /* -----------------------------------------
           CLOSE GROUP MODAL
        ----------------------------------------- */

        if (target.closest("#closeGroupModal")) {

            closeGroupModal();

        }


        /* -----------------------------------------
           SAVE GROUP
        ----------------------------------------- */

        if (target.closest("#saveGroupBtn")) {

            createGroup();

        }


        /* -----------------------------------------
           CHANGE PROFILE PICTURE
        ----------------------------------------- */

        if (target.closest("#changeProfilePictureBtn")) {

            const input = $("profilePictureInput");

            if (input) {

                input.click();

            }

        }


        /* -----------------------------------------
           SAVE CHAT PROFILE
        ----------------------------------------- */

        if (target.closest("#saveMyChatProfileBtn")) {

            saveChatProfile();

        }


        /* -----------------------------------------
           DELETE ACCOUNT
        ----------------------------------------- */

        if (target.closest("#deleteAccountBtn")) {

            deleteMyAccount();

        }


        /* -----------------------------------------
           CLOSE PROFILE MODAL
        ----------------------------------------- */

        if (target.closest("#closeUserProfileModal")) {

            closeUserProfileModal();

        }


        /* -----------------------------------------
           MODAL MESSAGE
        ----------------------------------------- */

        if (target.closest("#modalMessageBtn")) {

            if (activeChatUser) {

                closeUserProfileModal();

                openPrivateChat(activeChatUser);

            }

        }


        /* -----------------------------------------
           MODAL BLOCK
        ----------------------------------------- */

        if (target.closest("#modalBlockBtn")) {

            blockCurrentUser();

        }


        /* -----------------------------------------
           GROUP ACTIONS
        ----------------------------------------- */

        const groupOpen = target.closest("[data-group-open]");

        if (groupOpen) {

            const groupId = groupOpen.dataset.groupOpen;

            openGroupChat(groupId);

        }


        const groupAdd = target.closest("[data-group-add]");

        if (groupAdd) {

            addMemberToGroup(groupAdd.dataset.groupAdd);

        }


        const groupRemove = target.closest("[data-group-remove]");

        if (groupRemove) {

            removeMemberFromGroup(groupRemove.dataset.groupRemove);

        }


        const groupDelete = target.closest("[data-group-delete]");

        if (groupDelete) {

            deleteGroup(groupDelete.dataset.groupDelete);

        }


        const groupLeave = target.closest("[data-group-leave]");

        if (groupLeave) {

            leaveGroup(groupLeave.dataset.groupLeave);

        }

    });


    /* -----------------------------------------
       ENTER TO SEND
    ----------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (
            event.target &&
            event.target.id === "messageInput" &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendTextMessage();

        }

        if (
            event.target &&
            event.target.id === "usernameSearch" &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            searchUsers();

        }

    });


    /* -----------------------------------------
       IMAGE INPUT
    ----------------------------------------- */

    const imageInput = $("imageInput");

    if (imageInput) {

        imageInput.addEventListener("change", function () {

            if (this.files && this.files[0]) {

                sendImageMessage(this.files[0]);

            }

        });

    }


    /* -----------------------------------------
       PROFILE IMAGE
    ----------------------------------------- */

    const profileInput = $("profilePictureInput");

    if (profileInput) {

        profileInput.addEventListener("change", function () {

            if (this.files && this.files[0]) {

                uploadProfilePicture(this.files[0]);

            }

        });

    }

}


/* =========================================================
   CHAT TABS
   ========================================================= */

function switchChatTab(tabName) {

    document.querySelectorAll(".chat-tab").forEach(function (tab) {

        tab.classList.toggle(
            "active",
            tab.dataset.chatTab === tabName
        );

    });


    document.querySelectorAll(".chat-tab-content").forEach(function (content) {

        content.classList.remove("active");

    });


    const content = $(tabName + "Tab");

    if (content) {

        content.classList.add("active");

    }

}


/* =========================================================
   SEARCH USER
   ========================================================= */

async function searchUsers() {

    if (!currentUser) {

        showMessage("Please sign in first.");

        return;

    }

    const input = $("usernameSearch");

    const resultBox = $("searchResult");

    if (!input || !resultBox) {

        return;

    }

    const searchText = input.value.trim();

    if (!searchText) {

        resultBox.innerHTML =
            "<p>Please enter a username or name.</p>";

        return;

    }

    resultBox.innerHTML =
        "<p>Searching Firebase...</p>";

    try {

        const results =
            await searchUserByUsernameOrName(searchText);

        if (!results || results.length === 0) {

            resultBox.innerHTML =
                "<p>No user found.</p>";

            return;

        }

        let html = "";

        results.forEach(function (user) {

            if (user.uid === currentUser.uid) {

                return;

            }

            html += `
                <div class="firebase-search-user">

                    <div class="firebase-user-avatar">
                        ${
                            user.photoURL
                            ? `<img src="${escapeHTML(user.photoURL)}">`
                            : escapeHTML(getInitial(user.name))
                        }
                    </div>

                    <div class="firebase-user-details">

                        <strong>
                            ${escapeHTML(user.name || "User")}
                        </strong>

                        <span>
                            @${escapeHTML(user.username || "username")}
                        </span>

                    </div>

                    <button
                        class="primary-chat-btn firebase-request-btn"
                        data-request-user="${escapeHTML(user.uid)}"
                    >
                        Send Request
                    </button>

                </div>
            `;

        });

        resultBox.innerHTML = html;

        resultBox.querySelectorAll(
            "[data-request-user]"
        ).forEach(function (button) {

            button.addEventListener("click", function () {

                sendFriendRequest(
                    this.dataset.requestUser
                );

            });

        });

    } catch (error) {

        console.error("Search error:", error);

        resultBox.innerHTML =
            "<p>Unable to search users.</p>";

    }

}


/* =========================================================
   SEND FRIEND REQUEST
   ========================================================= */

async function sendFriendRequest(receiverId) {

    if (!currentUser || !receiverId) {

        return;

    }

    if (receiverId === currentUser.uid) {

        showMessage("You cannot send a request to yourself.");

        return;

    }

    try {

        const blocked1 = await getDoc(
            doc(
                db,
                "blockedUsers",
                `${currentUser.uid}_${receiverId}`
            )
        );

        const blocked2 = await getDoc(
            doc(
                db,
                "blockedUsers",
                `${receiverId}_${currentUser.uid}`
            )
        );

        if (blocked1.exists() || blocked2.exists()) {

            showMessage("Request cannot be sent because this user is blocked.");

            return;

        }


        const requestId =
            `${currentUser.uid}_${receiverId}`;

        const existingRequest = await getDoc(
            doc(db, "chatRequests", requestId)
        );

        if (
            existingRequest.exists() &&
            existingRequest.data().status === "pending"
        ) {

            showMessage("Request already sent.");

            return;

        }


        const myProfile =
            await getDoc(
                doc(db, "users", currentUser.uid)
            );

        const myData = myProfile.exists()
            ? myProfile.data()
            : {
                uid: currentUser.uid,
                name: currentUser.displayName || "User",
                username: "",
                photoURL: currentUser.photoURL || ""
            };


        const receiverProfile =
            await getDoc(
                doc(db, "users", receiverId)
            );

        if (!receiverProfile.exists()) {

            showMessage("User profile not found.");

            return;

        }

        const receiverData =
            receiverProfile.data();


        await setDoc(
            doc(db, "chatRequests", requestId),
            {
                senderId: currentUser.uid,
                receiverId: receiverId,

                senderName:
                    myData.name || "User",

                senderUsername:
                    myData.username || "",

                senderPhotoURL:
                    myData.photoURL || "",

                receiverName:
                    receiverData.name || "User",

                receiverUsername:
                    receiverData.username || "",

                status: "pending",

                createdAt: serverTimestamp()
            }
        );


        showMessage("Friend request sent successfully.");

    } catch (error) {

        console.error(
            "Send Request Error:",
            error
        );

        showMessage(
            "Unable to send request: " +
            error.code
        );

    }

}


/* =========================================================
   REQUESTS
   ========================================================= */

function listenForRequests() {

    if (!currentUser) {

        return;

    }

    const requestsQuery = query(
        collection(db, "chatRequests"),
        where(
            "receiverId",
            "==",
            currentUser.uid
        )
    );


    requestsUnsubscribe = onSnapshot(
        requestsQuery,
        function (snapshot) {

            const requests = [];

            snapshot.forEach(function (item) {

                const data = item.data();

                if (data.status === "pending") {

                    requests.push({
                        id: item.id,
                        ...data
                    });

                }

            });


            renderRequests(requests);


            const count = $("requestCount");

            if (count) {

                count.textContent = requests.length;

            }

        },
        function (error) {

            console.error(
                "Requests listener error:",
                error
            );

        }
    );

}


function renderRequests(requests) {

    const list = $("requestsList");

    if (!list) {

        return;

    }

    if (requests.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <span>👥</span>
                <h3>No requests</h3>
                <p>You don't have any pending requests.</p>
            </div>
        `;

        return;

    }


    let html = "";

    requests.forEach(function (request) {

        html += `
            <div class="firebase-request-card">

                <div class="firebase-user-avatar">
                    ${
                        request.senderPhotoURL
                        ? `<img src="${escapeHTML(request.senderPhotoURL)}">`
                        : escapeHTML(
                            getInitial(request.senderName)
                        )
                    }
                </div>

                <div class="firebase-user-details">

                    <strong>
                        ${escapeHTML(
                            request.senderName || "User"
                        )}
                    </strong>

                    <span>
                        @${escapeHTML(
                            request.senderUsername || ""
                        )}
                    </span>

                </div>

                <div class="request-buttons">

                    <button
                        class="primary-chat-btn"
                        data-accept-request="${request.id}"
                    >
                        Accept
                    </button>

                    <button
                        class="danger-chat-btn"
                        data-reject-request="${request.id}"
                    >
                        Reject
                    </button>

                </div>

            </div>
        `;

    });


    list.innerHTML = html;


    list.querySelectorAll(
        "[data-accept-request]"
    ).forEach(function (button) {

        button.addEventListener("click", function () {

            acceptRequest(
                this.dataset.acceptRequest
            );

        });

    });


    list.querySelectorAll(
        "[data-reject-request]"
    ).forEach(function (button) {

        button.addEventListener("click", function () {

            rejectRequest(
                this.dataset.rejectRequest
            );

        });

    });

}


async function acceptRequest(requestId) {

    try {

        const requestRef =
            doc(db, "chatRequests", requestId);

        const requestSnap =
            await getDoc(requestRef);

        if (!requestSnap.exists()) {

            showMessage("Request no longer exists.");

            return;

        }

        const request =
            requestSnap.data();

        if (
            request.receiverId !==
            currentUser.uid
        ) {

            return;

        }


        const chatId =
            makeChatId(
                request.senderId,
                request.receiverId
            );


        await setDoc(
            doc(db, "chats", chatId),
            {
                participants: [
                    request.senderId,
                    request.receiverId
                ],

                type: "private",

                deletedFor: [],

                mutedBy: [],

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp(),

                lastMessage: ""

            },
            {
                merge: true
            }
        );


        await updateDoc(
            requestRef,
            {
                status: "accepted",
                acceptedAt: serverTimestamp()
            }
        );


        showMessage("Request accepted.");

    } catch (error) {

        console.error(
            "Accept request error:",
            error
        );

        showMessage(
            "Unable to accept request."
        );

    }

}


async function rejectRequest(requestId) {

    try {

        await updateDoc(
            doc(db, "chatRequests", requestId),
            {
                status: "rejected",
                rejectedAt: serverTimestamp()
            }
        );

    } catch (error) {

        console.error(
            "Reject request error:",
            error
        );

    }

}


/* =========================================================
   PRIVATE CHATS
   ========================================================= */

function listenForChats() {

    if (!currentUser) {

        return;

    }


    const chatsQuery = query(
        collection(db, "chats"),
        where(
            "participants",
            "array-contains",
            currentUser.uid
        )
    );


    chatsUnsubscribe = onSnapshot(
        chatsQuery,
        async function (snapshot) {

            const chats = [];

            snapshot.forEach(function (item) {

                const data = item.data();

                if (
                    Array.isArray(data.deletedFor) &&
                    data.deletedFor.includes(
                        currentUser.uid
                    )
                ) {

                    return;

                }

                chats.push({
                    id: item.id,
                    ...data
                });

            });


            chats.sort(function (a, b) {

                const aTime =
                    a.updatedAt?.toMillis
                        ? a.updatedAt.toMillis()
                        : 0;

                const bTime =
                    b.updatedAt?.toMillis
                        ? b.updatedAt.toMillis()
                        : 0;

                return bTime - aTime;

            });


            await renderConversationList(chats);

        },
        function (error) {

            console.error(
                "Chats listener error:",
                error
            );

        }
    );

}


async function renderConversationList(chats) {

    const list = $("conversationList");

    if (!list) {

        return;

    }

    if (chats.length === 0) {

        list.innerHTML = `
            <div class="empty-chat-list">
                <span>💬</span>
                <p>No chats yet</p>
                <small>Accept a request to start chatting.</small>
            </div>
        `;

        return;

    }


    let html = "";

    for (const chat of chats) {

        const otherId =
            chat.participants.find(
                function (id) {
                    return id !== currentUser.uid;
                }
            );

        if (!otherId) {

            continue;

        }

        const userSnap =
            await getDoc(
                doc(db, "users", otherId)
            );

        if (!userSnap.exists()) {

            continue;

        }

        const user =
            userSnap.data();


        html += `
            <button
                class="firebase-conversation"
                data-private-chat="${escapeHTML(
                    otherId
                )}"
            >

                <div class="firebase-user-avatar">

                    ${
                        user.photoURL
                        ? `<img src="${escapeHTML(
                            user.photoURL
                        )}">`
                        : escapeHTML(
                            getInitial(user.name)
                        )
                    }

                </div>

                <div class="firebase-conversation-info">

                    <strong>
                        ${escapeHTML(
                            user.name || "User"
                        )}
                    </strong>

                    <span>
                        ${
                            chat.lastMessage
                            ? escapeHTML(
                                chat.lastMessage
                            )
                            : "Start chatting"
                        }
                    </span>

                </div>

                ${
                    Array.isArray(chat.mutedBy) &&
                    chat.mutedBy.includes(
                        currentUser.uid
                    )
                    ? "<small>🔇</small>"
                    : ""
                }

            </button>
        `;

    }


    list.innerHTML = html;


    list.querySelectorAll(
        "[data-private-chat]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                openPrivateChat(
                    this.dataset.privateChat
                );

            }
        );

    });

}


async function openPrivateChat(otherUserId) {

    if (!currentUser) {

        return;

    }


    const userSnap =
        await getDoc(
            doc(db, "users", otherUserId)
        );

    if (!userSnap.exists()) {

        showMessage("User profile not found.");

        return;

    }


    activeChatUser = {
        uid: otherUserId,
        ...userSnap.data()
    };


    activeChatType = "private";

    activeChatId =
        makeChatId(
            currentUser.uid,
            otherUserId
        );

    activeGroup = null;


    showActiveChat();


    listenForMessages();

}


function showActiveChat() {

    const noChat = $("noChatSelected");
    const active = $("activeChat");

    if (noChat) {

        noChat.classList.add("hidden");

    }

    if (active) {

        active.classList.remove("hidden");

    }


    const name = $("activeChatName");
    const username = $("activeChatUsername");
    const avatar = $("activeChatAvatar");


    if (activeChatType === "private" && activeChatUser) {

        if (name) {

            name.textContent =
                activeChatUser.name || "User";

        }

        if (username) {

            username.textContent =
                "@" +
                (
                    activeChatUser.username ||
                    "username"
                );

        }

        if (avatar) {

            if (activeChatUser.photoURL) {

                avatar.innerHTML =
                    `<img src="${escapeHTML(
                        activeChatUser.photoURL
                    )}">`;

            } else {

                avatar.textContent =
                    getInitial(
                        activeChatUser.name
                    );

            }

        }

    }


    if (activeChatType === "group" && activeGroup) {

        if (name) {

            name.textContent =
                activeGroup.name || "Group";

        }

        if (username) {

            username.textContent =
                `${activeGroup.members?.length || 0} members`;

        }

        if (avatar) {

            avatar.textContent = "👥";

        }

    }

}


/* =========================================================
   MESSAGES REAL TIME
   ========================================================= */

function listenForMessages() {

    if (!activeChatId) {

        return;

    }


    if (messagesUnsubscribe) {

        messagesUnsubscribe();

        messagesUnsubscribe = null;

    }


    let messagesRef;


    if (activeChatType === "private") {

        messagesRef =
            collection(
                db,
                "chats",
                activeChatId,
                "messages"
            );

    } else {

        messagesRef =
            collection(
                db,
                "groups",
                activeChatId,
                "messages"
            );

    }


    const messagesQuery = query(
        messagesRef,
        orderBy("createdAt", "asc")
    );


    messagesUnsubscribe = onSnapshot(
        messagesQuery,
        function (snapshot) {

            const messages = [];

            snapshot.forEach(function (item) {

                messages.push({
                    id: item.id,
                    ...item.data()
                });

            });


            renderMessages(messages);

        },
        function (error) {

            console.error(
                "Messages listener error:",
                error
            );

        }
    );

}


function renderMessages(messages) {

    const list = $("messageList");

    if (!list) {

        return;

    }


    if (messages.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <span>💬</span>
                <p>No messages yet.</p>
                <small>Send the first message.</small>
            </div>
        `;

        return;

    }


    let html = "";


    messages.forEach(function (message) {

        const mine =
            message.senderId === currentUser.uid;


        let content = "";


        if (message.type === "image") {

            content = `
                <img
                    class="message-image"
                    src="${escapeHTML(
                        message.fileUrl || ""
                    )}"
                    alt="Image"
                    loading="lazy"
                >
            `;

        } else if (message.type === "audio") {

            content = `
                <audio
                    controls
                    src="${escapeHTML(
                        message.fileUrl || ""
                    )}"
                ></audio>
            `;

        } else {

            content =
                `<span>${escapeHTML(
                    message.text || ""
                )}</span>`;

        }


        html += `
            <div
                class="message ${
                    mine
                    ? "sent"
                    : "received"
                }"
            >

                <div class="message-bubble">

                    ${content}

                    <small class="message-time">
                        ${getTime(
                            message.createdAt
                        )}
                    </small>

                </div>

            </div>
        `;

    });


    list.innerHTML = html;

    list.scrollTop =
        list.scrollHeight;

}


/* =========================================================
   CHECK BLOCK
   ========================================================= */

async function isBlocked(otherUid) {

    if (!currentUser || !otherUid) {

        return false;

    }


    const one =
        await getDoc(
            doc(
                db,
                "blockedUsers",
                `${currentUser.uid}_${otherUid}`
            )
        );


    const two =
        await getDoc(
            doc(
                db,
                "blockedUsers",
                `${otherUid}_${currentUser.uid}`
            )
        );


    return one.exists() || two.exists();

}


/* =========================================================
   SEND TEXT
   ========================================================= */

async function sendTextMessage() {

    if (!currentUser || !activeChatId) {

        showMessage("Please select a chat first.");

        return;

    }


    const input = $("messageInput");

    if (!input) {

        return;

    }


    const text =
        input.value.trim();


    if (!text) {

        return;

    }


    if (
        activeChatType === "private" &&
        activeChatUser
    ) {

        if (
            await isBlocked(
                activeChatUser.uid
            )
        ) {

            showMessage(
                "You cannot message this user because they are blocked."
            );

            return;

        }

    }


    try {

        const messageData = {

            senderId: currentUser.uid,

            type: "text",

            text: text,

            createdAt: serverTimestamp()

        };


        if (activeChatType === "private") {

            await addDoc(
                collection(
                    db,
                    "chats",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "chats",
                    activeChatId
                ),
                {
                    lastMessage: text,
                    updatedAt: serverTimestamp()
                }
            );

        } else {

            await addDoc(
                collection(
                    db,
                    "groups",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "groups",
                    activeChatId
                ),
                {
                    lastMessage: text,
                    updatedAt: serverTimestamp()
                }
            );

        }


        input.value = "";

    } catch (error) {

        console.error(
            "Send text error:",
            error
        );

        showMessage(
            "Message could not be sent."
        );

    }

}


/* =========================================================
   SEND IMAGE
   ========================================================= */

async function sendImageMessage(file) {

    if (!currentUser || !activeChatId || !file) {

        return;

    }


    if (
        activeChatType === "private" &&
        activeChatUser &&
        await isBlocked(activeChatUser.uid)
    ) {

        showMessage(
            "You cannot send messages to this user."
        );

        return;

    }


    try {

        const folder =
            activeChatType === "private"
            ? "chatMedia"
            : "groupMedia";


        const path =
            `${folder}/${activeChatId}/${currentUser.uid}/${Date.now()}_${file.name}`;


        const storageRef =
            ref(storage, path);


        await uploadBytes(
            storageRef,
            file
        );


        const downloadURL =
            await getDownloadURL(
                storageRef
            );


        const messageData = {

            senderId:
                currentUser.uid,

            type:
                "image",

            fileUrl:
                downloadURL,

            fileName:
                file.name,

            createdAt:
                serverTimestamp()

        };


        if (activeChatType === "private") {

            await addDoc(
                collection(
                    db,
                    "chats",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "chats",
                    activeChatId
                ),
                {
                    lastMessage:
                        "🖼️ Image",
                    updatedAt:
                        serverTimestamp()
                }
            );

        } else {

            await addDoc(
                collection(
                    db,
                    "groups",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "groups",
                    activeChatId
                ),
                {
                    lastMessage:
                        "🖼️ Image",
                    updatedAt:
                        serverTimestamp()
                }
            );

        }


        showMessage(
            "Image sent successfully."
        );

    } catch (error) {

        console.error(
            "Image upload error:",
            error
        );

        showMessage(
            "Image could not be uploaded: " +
            error.code
        );

    }

}


/* =========================================================
   VOICE RECORDING
   ========================================================= */

async function startVoiceRecording() {

    if (!currentUser || !activeChatId) {

        showMessage("Please select a chat first.");

        return;

    }


    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showMessage(
            "Your browser does not support microphone recording."
        );

        return;

    }


    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });


        recordedChunks = [];

        mediaRecorder =
            new MediaRecorder(stream);


        mediaRecorder.ondataavailable =
            function (event) {

                if (event.data.size > 0) {

                    recordedChunks.push(
                        event.data
                    );

                }

            };


        mediaRecorder.onstop =
            function () {

                stream.getTracks().forEach(
                    function (track) {
                        track.stop();
                    }
                );

            };


        mediaRecorder.start();

        recordingSeconds = 0;

        updateRecordingTime();

        recordingTimer =
            setInterval(
                updateRecordingTime,
                1000
            );


        const recorder =
            $("voiceRecorder");

        if (recorder) {

            recorder.classList.remove(
                "hidden"
            );

        }

    } catch (error) {

        console.error(
            "Microphone error:",
            error
        );

        showMessage(
            "Microphone permission was denied or unavailable."
        );

    }

}


function updateRecordingTime() {

    recordingSeconds++;


    const time =
        $("recordingTime");

    if (time) {

        const minutes =
            String(
                Math.floor(
                    recordingSeconds / 60
                )
            ).padStart(2, "0");


        const seconds =
            String(
                recordingSeconds % 60
            ).padStart(2, "0");


        time.textContent =
            `${minutes}:${seconds}`;

    }

}


function cancelVoiceRecording() {

    if (mediaRecorder) {

        if (mediaRecorder.state !== "inactive") {

            mediaRecorder.stop();

        }

        mediaRecorder = null;

    }


    recordedChunks = [];


    if (recordingTimer) {

        clearInterval(recordingTimer);

        recordingTimer = null;

    }


    const recorder =
        $("voiceRecorder");

    if (recorder) {

        recorder.classList.add(
            "hidden"
        );

    }

}


async function sendVoiceRecording() {

    if (!mediaRecorder ||
        mediaRecorder.state === "inactive"
    ) {

        return;

    }


    mediaRecorder.stop();


    if (recordingTimer) {

        clearInterval(recordingTimer);

        recordingTimer = null;

    }


    await new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                300
            );

        }
    );


    try {

        const blob =
            new Blob(
                recordedChunks,
                {
                    type:
                        "audio/webm"
                }
            );


        const path =
            `chatMedia/${activeChatId}/${currentUser.uid}/voice_${Date.now()}.webm`;


        const storageRef =
            ref(storage, path);


        await uploadBytes(
            storageRef,
            blob
        );


        const url =
            await getDownloadURL(
                storageRef
            );


        const messageData = {

            senderId:
                currentUser.uid,

            type:
                "audio",

            fileUrl:
                url,

            createdAt:
                serverTimestamp()

        };


        if (activeChatType === "private") {

            await addDoc(
                collection(
                    db,
                    "chats",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "chats",
                    activeChatId
                ),
                {
                    lastMessage:
                        "🎤 Voice message",
                    updatedAt:
                        serverTimestamp()
                }
            );

        } else {

            await addDoc(
                collection(
                    db,
                    "groups",
                    activeChatId,
                    "messages"
                ),
                messageData
            );


            await updateDoc(
                doc(
                    db,
                    "groups",
                    activeChatId
                ),
                {
                    lastMessage:
                        "🎤 Voice message",
                    updatedAt:
                        serverTimestamp()
                }
            );

        }


        recordedChunks = [];

        mediaRecorder = null;


        const recorder =
            $("voiceRecorder");

        if (recorder) {

            recorder.classList.add(
                "hidden"
            );

        }


        showMessage(
            "Voice message sent."
        );

    } catch (error) {

        console.error(
            "Voice upload error:",
            error
        );

        showMessage(
            "Voice message could not be sent: " +
            error.code
        );

    }

}


/* =========================================================
   EMOJI
   ========================================================= */

function toggleEmojiPanel() {

    const panel =
        $("emojiPanel");

    if (!panel) {

        return;

    }

    panel.classList.toggle(
        "hidden"
    );


    if (
        !panel.dataset.firebaseReady
    ) {

        panel.dataset.firebaseReady =
            "true";


        panel.querySelectorAll(
            "button"
        ).forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const input =
                        $("messageInput");

                    if (!input) {

                        return;

                    }

                    input.value +=
                        button.textContent;

                    input.focus();

                }
            );

        });

    }

}


/* =========================================================
   DELETE CHAT
   ========================================================= */

async function deleteCurrentChat() {

    if (
        !currentUser ||
        !activeChatId ||
        activeChatType !== "private"
    ) {

        return;

    }


    if (
        !confirm(
            "Delete this chat from your chat list?"
        )
    ) {

        return;

    }


    try {

        await updateDoc(
            doc(
                db,
                "chats",
                activeChatId
            ),
            {
                deletedFor:
                    arrayUnion(
                        currentUser.uid
                    )
            }
        );


        closeActiveChat();

    } catch (error) {

        console.error(
            "Delete chat error:",
            error
        );

        showMessage(
            "Chat could not be deleted."
        );

    }

}


/* =========================================================
   MUTE CHAT
   ========================================================= */

async function toggleMuteChat() {

    if (
        !activeChatId ||
        activeChatType !== "private"
    ) {

        return;

    }


    try {

        const chatRef =
            doc(
                db,
                "chats",
                activeChatId
            );


        const snap =
            await getDoc(chatRef);


        const data =
            snap.data() || {};


        const muted =
            Array.isArray(data.mutedBy) &&
            data.mutedBy.includes(
                currentUser.uid
            );


        if (muted) {

            await updateDoc(
                chatRef,
                {
                    mutedBy:
                        arrayRemove(
                            currentUser.uid
                        )
                }
            );

            showMessage(
                "Chat unmuted."
            );

        } else {

            await updateDoc(
                chatRef,
                {
                    mutedBy:
                        arrayUnion(
                            currentUser.uid
                        )
                }
            );

            showMessage(
                "Chat muted."
            );

        }

    } catch (error) {

        console.error(
            "Mute error:",
            error
        );

    }

}


/* =========================================================
   BLOCK USER
   ========================================================= */

async function blockCurrentUser() {

    if (
        !currentUser ||
        !activeChatUser
    ) {

        return;

    }


    if (
        !confirm(
            `Block @${activeChatUser.username || "user"}?`
        )
    ) {

        return;

    }


    try {

        await setDoc(
            doc(
                db,
                "blockedUsers",
                `${currentUser.uid}_${activeChatUser.uid}`
            ),
            {
                blockerId:
                    currentUser.uid,

                blockedId:
                    activeChatUser.uid,

                createdAt:
                    serverTimestamp()
            }
        );


        showMessage(
            "User blocked successfully."
        );

        closeActiveChat();

    } catch (error) {

        console.error(
            "Block error:",
            error
        );

        showMessage(
            "Unable to block user."
        );

    }

}


/* =========================================================
   USER PROFILE
   ========================================================= */

async function openUserProfile(user) {

    if (!user) {

        return;

    }


    const modal =
        $("userProfileModal");

    if (!modal) {

        return;

    }


    const avatar =
        $("modalProfileAvatar");

    const name =
        $("modalProfileName");

    const username =
        $("modalProfileUsername");


    if (name) {

        name.textContent =
            user.name || "User";

    }


    if (username) {

        username.textContent =
            "@" +
            (
                user.username ||
                "username"
            );

    }


    if (avatar) {

        if (user.photoURL) {

            avatar.innerHTML =
                `<img src="${escapeHTML(
                    user.photoURL
                )}">`;

        } else {

            avatar.textContent =
                getInitial(user.name);

        }

    }


    modal.classList.remove(
        "hidden"
    );

}


function closeUserProfileModal() {

    const modal =
        $("userProfileModal");

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   GROUPS
   ========================================================= */

function listenForGroups() {

    if (!currentUser) {

        return;

    }


    const groupsQuery =
        query(
            collection(db, "groups"),
            where(
                "members",
                "array-contains",
                currentUser.uid
            )
        );


    groupsUnsubscribe =
        onSnapshot(
            groupsQuery,
            function (snapshot) {

                const groups = [];

                snapshot.forEach(
                    function (item) {

                        groups.push({
                            id: item.id,
                            ...item.data()
                        });

                    }
                );


                renderGroups(groups);

            },
            function (error) {

                console.error(
                    "Groups listener error:",
                    error
                );

            }
        );

}


function renderGroups(groups) {

    const list =
        $("groupsList");

    if (!list) {

        return;

    }


    if (groups.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <span>👨‍👩‍👧‍👦</span>
                <h3>No groups yet</h3>
                <p>Create a group to start chatting.</p>
            </div>
        `;

        return;

    }


    let html = "";


    groups.forEach(function (group) {

        const owner =
            group.ownerId === currentUser.uid;


        html += `
            <div class="firebase-group-card">

                <div class="firebase-group-icon">
                    👥
                </div>

                <div class="firebase-group-info">

                    <h3>
                        ${escapeHTML(
                            group.name || "Group"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            group.description || ""
                        )}
                    </p>

                    <small>
                        ${
                            group.members
                            ? group.members.length
                            : 0
                        } members
                    </small>

                </div>

                <div class="firebase-group-actions">

                    <button
                        class="primary-chat-btn"
                        data-group-open="${group.id}"
                    >
                        Open
                    </button>

                    ${
                        owner
                        ? `
                            <button
                                class="chat-action-small"
                                data-group-add="${group.id}"
                            >
                                Add
                            </button>

                            <button
                                class="chat-action-small"
                                data-group-remove="${group.id}"
                            >
                                Remove
                            </button>

                            <button
                                class="danger-chat-btn"
                                data-group-delete="${group.id}"
                            >
                                Delete
                            </button>
                        `
                        : `
                            <button
                                class="danger-chat-btn"
                                data-group-leave="${group.id}"
                            >
                                Leave
                            </button>
                        `
                    }

                </div>

            </div>
        `;

    });


    list.innerHTML = html;

}


function openGroupModal() {

    const modal =
        $("createGroupModal");

    if (modal) {

        modal.classList.remove(
            "hidden"
        );

    }

}


function closeGroupModal() {

    const modal =
        $("createGroupModal");

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

}


async function createGroup() {

    if (!currentUser) {

        return;

    }


    const nameInput =
        $("groupNameInput");

    const descriptionInput =
        $("groupDescriptionInput");

    const membersInput =
        $("groupMembersInput");


    const name =
        nameInput
        ? nameInput.value.trim()
        : "";


    const description =
        descriptionInput
        ? descriptionInput.value.trim()
        : "";


    const memberText =
        membersInput
        ? membersInput.value.trim()
        : "";


    if (!name) {

        showMessage(
            "Please enter a group name."
        );

        return;

    }


    try {

        const members = [
            currentUser.uid
        ];


        if (memberText) {

            const usernames =
                memberText
                .split(",")
                .map(function (item) {
                    return item.trim().toLowerCase();
                })
                .filter(Boolean);


            const usersSnapshot =
                await getDocs(
                    collection(
                        db,
                        "users"
                    )
                );


            usersSnapshot.forEach(
                function (item) {

                    const user =
                        item.data();

                    if (
                        usernames.includes(
                            (
                                user.username ||
                                ""
                            ).toLowerCase()
                        )
                    ) {

                        if (
                            !members.includes(
                                user.uid
                            )
                        ) {

                            members.push(
                                user.uid
                            );

                        }

                    }

                }
            );

        }


        const groupRef =
            doc(
                collection(
                    db,
                    "groups"
                )
            );


        await setDoc(
            groupRef,
            {
                name:
                    name,

                description:
                    description,

                ownerId:
                    currentUser.uid,

                members:
                    members,

                createdAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp(),

                lastMessage:
                    ""
            }
        );


        if (nameInput) {
            nameInput.value = "";
        }

        if (descriptionInput) {
            descriptionInput.value = "";
        }

        if (membersInput) {
            membersInput.value = "";
        }


        closeGroupModal();


        showMessage(
            "Group created successfully."
        );

    } catch (error) {

        console.error(
            "Create group error:",
            error
        );

        showMessage(
            "Unable to create group: " +
            error.code
        );

    }

}


async function openGroupChat(groupId) {

    const groupSnap =
        await getDoc(
            doc(
                db,
                "groups",
                groupId
            )
        );


    if (!groupSnap.exists()) {

        showMessage(
            "Group not found."
        );

        return;

    }


    const group =
        groupSnap.data();


    if (
        !group.members ||
        !group.members.includes(
            currentUser.uid
        )
    ) {

        showMessage(
            "You are not a member of this group."
        );

        return;

    }


    activeChatId =
        groupId;

    activeChatType =
        "group";

    activeGroup = {
        id: groupId,
        ...group
    };

    activeChatUser = null;


    switchChatTab("messages");

    showActiveChat();

    listenForMessages();

}


async function addMemberToGroup(groupId) {

    const groupSnap =
        await getDoc(
            doc(
                db,
                "groups",
                groupId
            )
        );


    if (!groupSnap.exists()) {

        return;

    }


    const group =
        groupSnap.data();


    if (
        group.ownerId !==
        currentUser.uid
    ) {

        showMessage(
            "Only the group owner can add members."
        );

        return;

    }


    const username =
        prompt(
            "Enter the username to add:"
        );


    if (!username) {

        return;

    }


    try {

        const results =
            await searchUserByUsernameOrName(
                username.trim()
            );


        const user =
            results.find(function (item) {

                return (
                    (
                        item.username ||
                        ""
                    ).toLowerCase() ===
                    username.trim().toLowerCase()
                );

            });


        if (!user) {

            showMessage(
                "Username not found."
            );

            return;

        }


        await updateDoc(
            doc(
                db,
                "groups",
                groupId
            ),
            {
                members:
                    arrayUnion(
                        user.uid
                    ),

                updatedAt:
                    serverTimestamp()
            }
        );


        showMessage(
            "Member added."
        );

    } catch (error) {

        console.error(
            "Add member error:",
            error
        );

    }

}


async function removeMemberFromGroup(groupId) {

    const groupSnap =
        await getDoc(
            doc(
                db,
                "groups",
                groupId
            )
        );


    if (!groupSnap.exists()) {

        return;

    }


    const group =
        groupSnap.data();


    if (
        group.ownerId !==
        currentUser.uid
    ) {

        showMessage(
            "Only the group owner can remove members."
        );

        return;

    }


    const username =
        prompt(
            "Enter the username to remove:"
        );


    if (!username) {

        return;

    }


    try {

        const results =
            await searchUserByUsernameOrName(
                username.trim()
            );


        const user =
            results.find(function (item) {

                return (
                    (
                        item.username ||
                        ""
                    ).toLowerCase() ===
                    username.trim().toLowerCase()
                );

            });


        if (!user) {

            showMessage(
                "Username not found."
            );

            return;

        }


        if (
            user.uid ===
            currentUser.uid
        ) {

            showMessage(
                "Owner cannot remove themselves here."
            );

            return;

        }


        await updateDoc(
            doc(
                db,
                "groups",
                groupId
            ),
            {
                members:
                    arrayRemove(
                        user.uid
                    ),

                updatedAt:
                    serverTimestamp()
            }
        );


        showMessage(
            "Member removed."
        );

    } catch (error) {

        console.error(
            "Remove member error:",
            error
        );

    }

}


async function deleteGroup(groupId) {

    if (
        !confirm(
            "Delete this group?"
        )
    ) {

        return;

    }


    try {

        const groupRef =
            doc(
                db,
                "groups",
                groupId
            );


        const snap =
            await getDoc(groupRef);


        if (!snap.exists()) {

            return;

        }


        if (
            snap.data().ownerId !==
            currentUser.uid
        ) {

            showMessage(
                "Only the group owner can delete the group."
            );

            return;

        }


        await deleteDoc(
            groupRef
        );


        if (
            activeChatType === "group" &&
            activeChatId === groupId
        ) {

            closeActiveChat();

        }


        showMessage(
            "Group deleted."
        );

    } catch (error) {

        console.error(
            "Delete group error:",
            error
        );

    }

}


async function leaveGroup(groupId) {

    if (
        !confirm(
            "Leave this group?"
        )
    ) {

        return;

    }


    try {

        await updateDoc(
            doc(
                db,
                "groups",
                groupId
            ),
            {
                members:
                    arrayRemove(
                        currentUser.uid
                    ),

                updatedAt:
                    serverTimestamp()
            }
        );


        if (
            activeChatType === "group" &&
            activeChatId === groupId
        ) {

            closeActiveChat();

        }


        showMessage(
            "You left the group."
        );

    } catch (error) {

        console.error(
            "Leave group error:",
            error
        );

    }

}


/* =========================================================
   PROFILE
   ========================================================= */

async function loadMyProfile() {

    if (!currentUser) {

        return;

    }


    try {

        const snap =
            await getDoc(
                doc(
                    db,
                    "users",
                    currentUser.uid
                )
            );


        const data =
            snap.exists()
            ? snap.data()
            : {
                name:
                    currentUser.displayName || "User",

                username:
                    "",

                email:
                    currentUser.email || "",

                photoURL:
                    currentUser.photoURL || ""
            };


        const username =
            $("myUsername");

        const name =
            $("myProfileName");

        const email =
            $("myProfileEmail");

        const avatar =
            $("myProfileAvatar");


        if (username) {

            username.value =
                data.username || "";

        }


        if (name) {

            name.value =
                data.name || "";

        }


        if (email) {

            email.value =
                data.email ||
                currentUser.email ||
                "";

        }


        if (avatar) {

            if (data.photoURL) {

                avatar.innerHTML =
                    `<img src="${escapeHTML(
                        data.photoURL
                    )}">`;

            } else {

                avatar.textContent =
                    getInitial(
                        data.name
                    );

            }

        }

    } catch (error) {

        console.error(
            "Load profile error:",
            error
        );

    }

}


async function saveChatProfile() {

    if (!currentUser) {

        showMessage(
            "Please sign in first."
        );

        return;

    }


    const usernameInput =
        $("myUsername");

    const nameInput =
        $("myProfileName");


    const username =
        usernameInput
        ? usernameInput.value
            .trim()
            .toLowerCase()
        : "";


    const name =
        nameInput
        ? nameInput.value.trim()
        : "";


    if (!username || !name) {

        showMessage(
            "Username and name are required."
        );

        return;

    }


    try {

        const usersQuery =
            query(
                collection(db, "users"),
                where(
                    "username",
                    "==",
                    username
                )
            );


        const existing =
            await getDocs(
                usersQuery
            );


        let duplicate = false;


        existing.forEach(
            function (item) {

                if (
                    item.id !==
                    currentUser.uid
                ) {

                    duplicate = true;

                }

            }
        );


        if (duplicate) {

            showMessage(
                "This username is already taken."
            );

            return;

        }


        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid
            ),
            {
                uid:
                    currentUser.uid,

                username:
                    username,

                name:
                    name,

                email:
                    currentUser.email || "",

                photoURL:
                    currentUser.photoURL || "",

                updatedAt:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );


        localStorage.setItem(
            "justiceUser",
            JSON.stringify({
                uid:
                    currentUser.uid,

                username:
                    username,

                name:
                    name,

                email:
                    currentUser.email || "",

                photoURL:
                    currentUser.photoURL || ""
            })
        );


        showMessage(
            "Profile saved successfully."
        );

    } catch (error) {

        console.error(
            "Save chat profile error:",
            error
        );

        showMessage(
            "Profile could not be saved: " +
            error.code
        );

    }

}


/* =========================================================
   PROFILE PICTURE
   ========================================================= */

async function uploadProfilePicture(file) {

    if (!currentUser || !file) {

        return;

    }


    try {

        const path =
            `profilePictures/${currentUser.uid}/${Date.now()}_${file.name}`;


        const storageRef =
            ref(storage, path);


        await uploadBytes(
            storageRef,
            file
        );


        const url =
            await getDownloadURL(
                storageRef
            );


        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid
            ),
            {
                photoURL:
                    url,

                updatedAt:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );


        const avatar =
            $("myProfileAvatar");

        if (avatar) {

            avatar.innerHTML =
                `<img src="${escapeHTML(
                    url
                )}">`;

        }


        showMessage(
            "Profile picture saved."
        );

    } catch (error) {

        console.error(
            "Profile picture error:",
            error
        );

        showMessage(
            "Profile picture upload failed: " +
            error.code
        );

    }

}


/* =========================================================
   DELETE ACCOUNT
   ========================================================= */

async function deleteMyAccount() {

    if (!currentUser) {

        return;

    }


    const confirmed =
        confirm(
            "This will permanently delete your Justice Now account, username and profile. Continue?"
        );


    if (!confirmed) {

        return;

    }


    try {

        await deleteDoc(
            doc(
                db,
                "users",
                currentUser.uid
            )
        );


        await deleteUser(
            currentUser
        );


        localStorage.removeItem(
            "justiceUser"
        );


        alert(
            "Your account has been deleted."
        );


        window.location.reload();

    } catch (error) {

        console.error(
            "Delete account error:",
            error
        );


        if (
            error.code ===
            "auth/requires-recent-login"
        ) {

            showMessage(
                "For security, please sign in again and then delete the account."
            );

        } else {

            showMessage(
                "Account deletion failed: " +
                error.code
            );

        }

    }

}


/* =========================================================
   CLOSE ACTIVE CHAT
   ========================================================= */

function closeActiveChat() {

    activeChatId = null;

    activeChatUser = null;

    activeGroup = null;

    activeChatType = null;


    if (messagesUnsubscribe) {

        messagesUnsubscribe();

        messagesUnsubscribe = null;

    }


    const active =
        $("activeChat");

    const noChat =
        $("noChatSelected");


    if (active) {

        active.classList.add(
            "hidden"
        );

    }


    if (noChat) {

        noChat.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   WEBRTC CALL SYSTEM
   ========================================================= */

function createPeerConnection(callId, callType) {

    const configuration = {

        iceServers: [
            {
                urls:
                    "stun:stun.l.google.com:19302"
            },
            {
                urls:
                    "stun:stun1.l.google.com:19302"
            }
        ]

    };


    const pc =
        new RTCPeerConnection(
            configuration
        );


    pc.onicecandidate =
        async function (event) {

            if (!event.candidate) {

                return;

            }


            const collectionName =
                selectedCall.role === "caller"
                ? "callerCandidates"
                : "calleeCandidates";


            await addDoc(
                collection(
                    db,
                    "calls",
                    callId,
                    collectionName
                ),
                event.candidate.toJSON()
            );

        };


    pc.ontrack =
        function (event) {

            if (!remoteStream) {

                remoteStream =
                    new MediaStream();

            }


            event.streams[0]
                .getTracks()
                .forEach(
                    function (track) {

                        remoteStream.addTrack(
                            track
                        );

                    }
                );


            const remoteVideo =
                $("remoteCallVideo");


            if (remoteVideo) {

                remoteVideo.srcObject =
                    remoteStream;

            }

        };


    pc.onconnectionstatechange =
        function () {

            if (
                pc.connectionState ===
                    "disconnected" ||
                pc.connectionState ===
                    "failed" ||
                pc.connectionState ===
                    "closed"
            ) {

                endCall(false);

            }

        };


    return pc;

}


/* =========================================================
   CALL UI
   ========================================================= */

function createCallUI(callType) {

    let modal =
        $("firebaseCallModal");


    if (modal) {

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "firebaseCallModal";


    modal.innerHTML = `
        <div class="firebase-call-card">

            <div class="firebase-call-title">
                ${
                    callType === "video"
                    ? "🎥 Video Call"
                    : "📞 Voice Call"
                }
            </div>

            <div class="firebase-call-user">
                ${escapeHTML(
                    activeChatUser?.name ||
                    "User"
                )}
            </div>

            <video
                id="remoteCallVideo"
                autoplay
                playsinline
                class="firebase-remote-video"
            ></video>

            <video
                id="localCallVideo"
                autoplay
                muted
                playsinline
                class="firebase-local-video"
            ></video>

            <div class="firebase-call-actions">

                <button
                    id="endFirebaseCallBtn"
                    class="danger-chat-btn"
                >
                    End Call
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(
        modal
    );


    modal.querySelector(
        "#endFirebaseCallBtn"
    ).addEventListener(
        "click",
        function () {

            endCall(true);

        }
    );

}


async function startCall(callType) {

    if (
        !currentUser ||
        !activeChatUser
    ) {

        showMessage(
            "Open a private chat first."
        );

        return;

    }


    if (
        await isBlocked(
            activeChatUser.uid
        )
    ) {

        showMessage(
            "You cannot call this user."
        );

        return;

    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showMessage(
            "Your browser does not support calls."
        );

        return;

    }


    try {

        localStream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video:
                        callType === "video"
                });


        remoteStream =
            new MediaStream();


        createCallUI(
            callType
        );


        const callRef =
            doc(
                collection(
                    db,
                    "calls"
                )
            );


        const callId =
            callRef.id;


        selectedCall = {

            callId:
                callId,

            role:
                "caller",

            type:
                callType,

            otherUserId:
                activeChatUser.uid

        };


        peerConnection =
            createPeerConnection(
                callId,
                callType
            );


        localStream
            .getTracks()
            .forEach(
                function (track) {

                    peerConnection.addTrack(
                        track,
                        localStream
                    );

                }
            );


        const offer =
            await peerConnection.createOffer();


        await peerConnection.setLocalDescription(
            offer
        );


        await setDoc(
            callRef,
            {
                callerId:
                    currentUser.uid,

                calleeId:
                    activeChatUser.uid,

                type:
                    callType,

                offer:
                    {
                        type:
                            offer.type,

                        sdp:
                            offer.sdp
                    },

                status:
                    "ringing",

                createdAt:
                    serverTimestamp()
            }
        );


        listenForCallAnswer(
            callId
        );


        listenForRemoteCandidates(
            callId,
            "calleeCandidates"
        );


        showMessage(
            "Calling " +
            (
                activeChatUser.name ||
                "user"
            ) +
            "..."
        );

    } catch (error) {

        console.error(
            "Start call error:",
            error
        );

        showMessage(
            "Unable to start call: " +
            error.message
        );

    }

}


function listenForCallAnswer(callId) {

    const callRef =
        doc(
            db,
            "calls",
            callId
        );


    const unsubscribe =
        onSnapshot(
            callRef,
            async function (snapshot) {

                if (!snapshot.exists()) {

                    return;

                }


                const data =
                    snapshot.data();


                if (
                    data.answer &&
                    peerConnection &&
                    !peerConnection.currentRemoteDescription
                ) {

                    await peerConnection.setRemoteDescription(
                        new RTCSessionDescription(
                            data.answer
                        )
                    );

                }


                if (
                    data.status === "declined" ||
                    data.status === "ended"
                ) {

                    endCall(false);

                }

            }
        );


    pendingListeners.set(
        "callAnswer",
        unsubscribe
    );

}


function listenForRemoteCandidates(
    callId,
    candidateCollection
) {

    const candidatesQuery =
        collection(
            db,
            "calls",
            callId,
            candidateCollection
        );


    const unsubscribe =
        onSnapshot(
            candidatesQuery,
            function (snapshot) {

                snapshot.docChanges().forEach(
                    async function (change) {

                        if (
                            change.type ===
                            "added"
                        ) {

                            try {

                                await peerConnection
                                    .addIceCandidate(
                                        new RTCIceCandidate(
                                            change.doc.data()
                                        )
                                    );

                            } catch (error) {

                                console.error(
                                    "ICE candidate error:",
                                    error
                                );

                            }

                        }

                    }
                );

            }
        );


    pendingListeners.set(
        "remoteCandidates",
        unsubscribe
    );

}


/* =========================================================
   INCOMING CALLS
   ========================================================= */

function listenForIncomingCalls() {

    if (!currentUser) {

        return;

    }


    const callsQuery =
        query(
            collection(
                db,
                "calls"
            ),
            where(
                "calleeId",
                "==",
                currentUser.uid
            )
        );


    callsUnsubscribe =
        onSnapshot(
            callsQuery,
            function (snapshot) {

                snapshot.docChanges()
                    .forEach(
                        async function (change) {

                            if (
                                change.type !==
                                "added"
                            ) {

                                return;

                            }


                            const call =
                                change.doc.data();


                            if (
                                call.status !==
                                "ringing"
                            ) {

                                return;

                            }


                            const callerSnap =
                                await getDoc(
                                    doc(
                                        db,
                                        "users",
                                        call.callerId
                                    )
                                );


                            const caller =
                                callerSnap.exists()
                                ? callerSnap.data()
                                : {
                                    name:
                                        "User"
                                };


                            handleIncomingCall(
                                change.doc.id,
                                call,
                                caller
                            );

                        }
                    );

            },
            function (error) {

                console.error(
                    "Incoming call listener:",
                    error
                );

            }
        );

}


async function handleIncomingCall(
    callId,
    call,
    caller
) {

    const accept =
        confirm(
            `${caller.name || "User"} is calling you.\n\nPress OK to accept or Cancel to reject.`
        );


    if (!accept) {

        await updateDoc(
            doc(
                db,
                "calls",
                callId
            ),
            {
                status:
                    "declined"
            }
        );

        return;

    }


    try {

        localStream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video:
                        call.type === "video"
                });


        remoteStream =
            new MediaStream();


        activeChatUser = {
            uid:
                call.callerId,
            ...caller
        };


        selectedCall = {

            callId:
                callId,

            role:
                "callee",

            type:
                call.type,

            otherUserId:
                call.callerId

        };


        createCallUI(
            call.type
        );


        peerConnection =
            createPeerConnection(
                callId,
                call.type
            );


        localStream
            .getTracks()
            .forEach(
                function (track) {

                    peerConnection.addTrack(
                        track,
                        localStream
                    );

                }
            );


        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(
                call.offer
            )
        );


        const answer =
            await peerConnection.createAnswer();


        await peerConnection.setLocalDescription(
            answer
        );


        await updateDoc(
            doc(
                db,
                "calls",
                callId
            ),
            {
                answer:
                    {
                        type:
                            answer.type,

                        sdp:
                            answer.sdp
                    },

                status:
                    "connected"
            }
        );


        listenForRemoteCandidates(
            callId,
            "callerCandidates"
        );


    } catch (error) {

        console.error(
            "Accept call error:",
            error
        );

        showMessage(
            "Could not accept the call."
        );

    }

}


/* =========================================================
   END CALL
   ========================================================= */

async function endCall(updateFirebase) {

    try {

        if (
            updateFirebase &&
            selectedCall
        ) {

            await updateDoc(
                doc(
                    db,
                    "calls",
                    selectedCall.callId
                ),
                {
                    status:
                        "ended",

                    endedAt:
                        serverTimestamp()
                }
            );

        }

    } catch (error) {

        console.error(
            "End call Firebase error:",
            error
        );

    }


    pendingListeners.forEach(
        function (unsubscribe) {

            try {

                unsubscribe();

            } catch (error) {}

        }
    );


    pendingListeners.clear();


    if (peerConnection) {

        peerConnection.close();

        peerConnection = null;

    }


    if (localStream) {

        localStream
            .getTracks()
            .forEach(
                function (track) {

                    track.stop();

                }
            );

        localStream = null;

    }


    remoteStream = null;


    const modal =
        $("firebaseCallModal");

    if (modal) {

        modal.remove();

    }


    selectedCall = null;

}


/* =========================================================
   ADD EXTRA CHAT CSS
   ========================================================= */

const chatExtraStyle =
document.createElement("style");

chatExtraStyle.textContent = `

.firebase-search-user,
.firebase-request-card,
.firebase-conversation,
.firebase-group-card {

    background: #ffffff;
    border: 1px solid #d7e6e4;
    border-radius: 12px;
    margin: 8px 0;
    padding: 12px;
}

.firebase-search-user,
.firebase-request-card {

    display: flex;
    align-items: center;
    gap: 12px;
}

.firebase-user-avatar {

    width: 46px;
    height: 46px;
    min-width: 46px;
    border-radius: 50%;
    background: #0f766e;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    overflow: hidden;
}

.firebase-user-avatar img,
.firebase-group-icon img {

    width: 100%;
    height: 100%;
    object-fit: cover;

}

.firebase-user-details {

    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.firebase-user-details span {

    color: #666;
    font-size: 13px;

}

.firebase-conversation {

    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-align: left;
    color: #111;
}

.firebase-conversation:hover {

    border-color: #0f766e;
}

.firebase-conversation-info {

    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.firebase-conversation-info strong,
.firebase-conversation-info span {

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.firebase-conversation-info span {

    color: #777;
    font-size: 13px;

}

.request-buttons {

    display: flex;
    gap: 6px;
}

.firebase-group-card {

    display: flex;
    align-items: center;
    gap: 14px;
}

.firebase-group-icon {

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e6f5f3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.firebase-group-info {

    flex: 1;
}

.firebase-group-info h3,
.firebase-group-info p {

    margin: 2px 0;

}

.firebase-group-info p {

    color: #666;
    font-size: 13px;

}

.firebase-group-actions {

    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.chat-action-small {

    border: 1px solid #0f766e;
    background: white;
    color: #0f766e;
    border-radius: 7px;
    padding: 7px 10px;
    cursor: pointer;
}

.firebase-call-modal {

    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0,0,0,.75);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.firebase-call-card {

    width: min(700px, 95vw);
    background: white;
    border-radius: 18px;
    padding: 20px;
    text-align: center;
    position: relative;
}

.firebase-call-title {

    font-size: 22px;
    font-weight: 700;
    color: #0f766e;
}

.firebase-call-user {

    margin: 8px 0 15px;
    font-size: 18px;
}

.firebase-remote-video {

    width: 100%;
    max-height: 450px;
    background: #111;
    border-radius: 12px;
    object-fit: contain;
}

.firebase-local-video {

    width: 160px;
    height: 110px;
    position: absolute;
    right: 30px;
    bottom: 85px;
    background: #111;
    border-radius: 10px;
    object-fit: cover;
}

.firebase-call-actions {

    margin-top: 15px;
}

.message-image {

    max-width: 260px;
    max-height: 300px;
    border-radius: 10px;
    display: block;
}

.message-time {

    display: block;
    font-size: 10px;
    opacity: .65;
    margin-top: 4px;
}

.firebase-group-card button,
.firebase-search-user button,
.firebase-request-card button {

    cursor: pointer;
}

@media (max-width: 700px) {

    .firebase-group-card {

        flex-direction: column;
        align-items: stretch;

    }

    .firebase-group-actions {

        justify-content: stretch;

    }

    .firebase-group-actions button {

        flex: 1;

    }

    .firebase-local-video {

        width: 100px;
        height: 75px;
        right: 25px;
        bottom: 80px;

    }

}

`;

document.head.appendChild(
    chatExtraStyle
);


/* =========================================================
   EXPORT FOR DEBUGGING
   ========================================================= */

window.JusticeNowFirebaseChat = {

    openChat:
        openChatSection,

    closeChat:
        closeChatSection,

    searchUsers:
        searchUsers,

    sendMessage:
        sendTextMessage,

    openPrivateChat:
        openPrivateChat,

    openGroupChat:
        openGroupChat,

    startCall:
        startCall

};

console.log(
    "Justice Now Firebase Chat loaded successfully."
);
document.addEventListener("click", function (event) {
    const button = event.target.closest("#chatTopBtn");

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const chatSection = document.getElementById("chatSection");

    if (!chatSection) {
        alert("Chat section nahi mila. index.html mein #chatSection check karein.");
        console.error("ERROR: #chatSection not found");
        return;
    }

    // Home ke doosre sections hide nahi karne
    chatSection.classList.remove("hidden");

    chatSection.style.display = "block";
    chatSection.style.visibility = "visible";
    chatSection.style.opacity = "1";

    // Chat ko screen par lao
    setTimeout(function () {
        chatSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 50);

    console.log("Chat opened successfully");
});