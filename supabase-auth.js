import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* =====================================================
   SUPABASE CONFIG & INITIALIZATION
   ===================================================== */
const SUPABASE_URL = "https://nijpkyhlhmpggcimcxqr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7J3qDUVInQNMdCXSy3GDsw_yN7rA5w-"; // یہاں اپنی Supabase Anon Key درج کریں

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// State tracking variables for real-time messaging
let currentActiveChatId = null;
let messageSubscription = null;
let selectedUserForRequest = null;

/* =====================================================
   CURRENT USER HELPER
   ===================================================== */
async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
}

/* =====================================================
   SAVE USER TO LOCALSTORAGE & SUPABASE DATABASE
   ===================================================== */
async function saveJusticeUser(user, extraData = {}) {
    const userName = extraData.name || user.user_metadata?.full_name || user.user_metadata?.name || "User";
    const userEmail = user.email || "";
    const username = extraData.username ? extraData.username.toLowerCase().replace(/^@/, "") : "";
    const photoURL = extraData.photoURL || user.user_metadata?.avatar_url || "";

    const profileData = {
        uid: user.id,
        name: userName,
        profileName: userName,
        username: username,
        email: userEmail,
        photoURL: photoURL,
        profileImage: photoURL,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem("justiceUser", JSON.stringify(profileData));

    try {
        const { error } = await supabase
            .from("users")
            .upsert({
                id: user.id,
                ...profileData
            });

        if (error) throw error;
        console.log("Profile successfully saved to Supabase Database!");
    } catch (err) {
        console.error("Database Save Error:", err);
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

    const currentUser = await getCurrentUser();
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

    let photoURL = currentUser.user_metadata?.avatar_url || "";

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
    const currentUser = await getCurrentUser();

    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .or(`username.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,profileName.ilike.%${searchTerm}%`);

        if (error) throw error;

        let results = (data || []).filter(user => !currentUser || user.id !== currentUser.id);
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
    const currentUser = await getCurrentUser();
    if (!currentUser) return alert("Please sign in first.");
    if (!selectedUserForRequest) return;

    try {
        const { error } = await supabase
            .from("chatRequests")
            .insert([{
                senderId: currentUser.id,
                receiverId: selectedUserForRequest.uid,
                senderUsername: currentUser.user_metadata?.full_name || "User",
                receiverUsername: selectedUserForRequest.username || "",
                status: "pending",
                createdAt: new Date().toISOString()
            }]);

        if (error) throw error;

        document.getElementById("jnUserModal")?.classList.remove("active");
        alert("Chat request sent.");
    } catch (error) {
        console.error("Request Error:", error);
        alert("Could not send chat request.");
    }
});

export async function loadRequests() {
    const currentUser = await getCurrentUser();
    const list = document.getElementById("jnRequestsList");
    if (!list || !currentUser) return;

    try {
        const { data, error } = await supabase
            .from("chatRequests")
            .select("*")
            .eq("receiverId", currentUser.id)
            .eq("status", "pending");

        if (error) throw error;

        if (!data || data.length === 0) {
            list.innerHTML = '<div class="jn-empty-state">No requests yet.</div>';
            return;
        }

        list.innerHTML = "";
        data.forEach((req) => {
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
            item.querySelector(".accept-btn").addEventListener("click", () => acceptRequest(req.id, req));
            item.querySelector(".reject-btn").addEventListener("click", () => rejectRequest(req.id));
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Load Requests Error:", error);
    }
}

async function acceptRequest(requestId, req) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return;

    try {
        const chatId = [currentUser.id, req.senderId].sort().join("_");
        
        await supabase
            .from("chatRequests")
            .update({ status: "accepted" })
            .eq("id", requestId);

        await supabase
            .from("chats")
            .upsert({
                id: chatId,
                members: [currentUser.id, req.senderId],
                updatedAt: new Date().toISOString()
            });

        alert("Request accepted.");
        loadRequests();
        loadChats();
    } catch (error) {
        console.error("Accept Error:", error);
    }
}

async function rejectRequest(requestId) {
    try {
        await supabase
            .from("chatRequests")
            .update({ status: "rejected" })
            .eq("id", requestId);

        loadRequests();
    } catch (error) {
        console.error("Reject Error:", error);
    }
}

/* =====================================================
   CHAT SYSTEM: LOAD CONVERSATIONS LIST
   ===================================================== */
export async function loadChats() {
    const currentUser = await getCurrentUser();
    const list = document.getElementById("jnChatList");
    if (!list || !currentUser) return;

    try {
        const { data: chats, error } = await supabase
            .from("chats")
            .select("*")
            .contains("members", [currentUser.id]);

        if (error) throw error;

        if (!chats || chats.length === 0) {
            list.innerHTML = `
                <div class="jn-empty-state">
                    <h3>No chats yet</h3>
                    <p>Search a username to start a chat.</p>
                </div>`;
            return;
        }

        list.innerHTML = "";
        for (const chat of chats) {
            const otherUid = chat.members.find(uid => uid !== currentUser.id);
            if (!otherUid) continue;

            const { data: user } = await supabase
                .from("users")
                .select("*")
                .eq("id", otherUid)
                .single();

            if (!user) continue;

            const item = document.createElement("div");
            item.className = "jn-chat-item";
            item.innerHTML = `
                <img src="${user.photoURL || user.profileImage || 'https://via.placeholder.com/120'}">
                <div class="jn-chat-item-content">
                    <strong>${escapeText(user.name || user.profileName || "User")}</strong>
                    <small>@${escapeText(user.username || "")}</small>
                </div>
            `;
            item.addEventListener("click", () => openConversation(chat.id, user));
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

async function listenForMessages(chatId) {
    const messagesContainer = document.getElementById("jnMessages");
    if (!messagesContainer) return;

    if (messageSubscription) {
        supabase.removeChannel(messageSubscription);
    }

    // Initial messages load
    const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chatId", chatId)
        .order("createdAt", { ascending: true });

    const currentUser = await getCurrentUser();

    messagesContainer.innerHTML = "";
    if (messages) {
        messages.forEach(msg => {
            renderMessage(msg, currentUser);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Real-time listener using Supabase Channels
    messageSubscription = supabase
        .channel(`chat:${chatId}`)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages', filter: `chatId=eq.${chatId}` },
            payload => {
                renderMessage(payload.new, currentUser);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        )
        .subscribe();
}

function renderMessage(msg, currentUser) {
    const messagesContainer = document.getElementById("jnMessages");
    const isMine = currentUser && msg.senderId === currentUser.id;

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
}

async function sendMessage() {
    const input = document.getElementById("jnMessageInput");
    if (!input) return;

    const text = input.value.trim();
    const currentUser = await getCurrentUser();

    if (!text || !currentUser || !currentActiveChatId) return;

    input.value = "";
    try {
        await supabase
            .from("messages")
            .insert([{
                chatId: currentActiveChatId,
                text: text,
                senderId: currentUser.id,
                createdAt: new Date().toISOString()
            }]);

        await supabase
            .from("chats")
            .update({ updatedAt: new Date().toISOString() })
            .eq("id", currentActiveChatId);
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
    if (messageSubscription) {
        supabase.removeChannel(messageSubscription);
        messageSubscription = null;
    }
});

/* =====================================================
   SIGN UP
   ===================================================== */
document.addEventListener("submit", async function(event) {
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

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) throw error;

        if (data.user) {
            await saveJusticeUser(data.user, { name });
            message.textContent = "Account created successfully!";
            form.reset();

            setTimeout(function() {
                if (typeof openAuthPage === "function") openAuthPage("signinPage");
                else if (typeof showPage === "function") showPage("signin");
            }, 1000);
        }
    } catch (error) {
        console.error("Supabase Sign Up Error:", error);
        message.textContent = "Account creation failed: " + error.message;
    }
}, true);

/* =====================================================
   SIGN IN
   ===================================================== */
document.addEventListener("submit", async function(event) {
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

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        if (data.user) {
            await saveJusticeUser(data.user, { name });
            message.textContent = "Sign in successful!";

            setTimeout(function() {
                if (typeof openAuthPage === "function") openAuthPage("welcomePage");
                else if (typeof showPage === "function") showPage("welcome");
            }, 700);
        }
    } catch (error) {
        console.error("Supabase Sign In Error:", error);
        message.textContent = "Sign in failed: " + error.message;
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

    googleButton.onclick = async function(event) {
        event.preventDefault();

        googleButton.disabled = true;
        googleButton.textContent = "Opening Google...";

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) throw error;
        } catch (error) {
            console.error("GOOGLE SIGN-IN ERROR:", error);
            const message = document.getElementById("signinMessage");
            if (message) message.textContent = "Google Sign-In error: " + error.message;

            googleButton.disabled = false;
            googleButton.innerHTML = "🌐 Continue with Google";
        }
    };
});

/* =====================================================
   FORGOT PASSWORD
   ===================================================== */
document.addEventListener("click", async function(event) {
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

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin
        });

        if (error) throw error;

        message.textContent = "Password reset link has been sent to your email.";
    } catch (error) {
        console.error("Password Reset Error:", error);
        message.textContent = "Unable to send reset email: " + error.message;
    }
}, true);

/* =====================================================
   AUTH STATE OBSERVER
   ===================================================== */
supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && session.user) {
        const user = session.user;
        
        const { data: userDoc } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

        if (userDoc) {
            localStorage.setItem("justiceUser", JSON.stringify(userDoc));
        } else {
            await saveJusticeUser(user, { name: user.user_metadata?.full_name || user.user_metadata?.name });
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