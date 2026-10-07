import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* =====================================================
   SUPABASE CONFIG
   ===================================================== */
const SUPABASE_URL = "https://nijpkyhlhmpggcimcxqr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7J3qDUVInQNMdCXSy3GDsw_yN7rA5w-";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// State tracking variables for real-time messaging
let currentActiveChatId = null;
let messageChannel = null;
let selectedUserForRequest = null;

/* =====================================================
   SAFE PAGE REDIRECT HELPER (Fixes Blank Screen)
   ===================================================== */
function handleAppNavigation(targetPageName) {
    if (typeof openAuthPage === "function") {
        openAuthPage(targetPageName);
    } else if (typeof showPage === "function") {
        showPage(targetPageName.replace("Page", ""));
    } else {
        // Fallback safety if global page switcher functions are missing
        const authContainer = document.getElementById("authContainer") || document.querySelector(".auth-section");
        const welcomeContainer = document.getElementById("welcomeContainer") || document.querySelector(".welcome-section");
        
        if (targetPageName === "welcomePage" || targetPageName === "welcome") {
            if (authContainer) authContainer.style.display = "none";
            if (welcomeContainer) welcomeContainer.style.display = "block";
        } else if (targetPageName === "signinPage" || targetPageName === "signin") {
            // Show signin view
            const signinPage = document.getElementById("signinPage");
            if (signinPage) signinPage.classList.add("active");
        }
    }
}

/* =====================================================
   SAVE USER TO LOCALSTORAGE & SUPABASE DATABASE
   ===================================================== */
async function saveJusticeUser(user, extraData = {}) {
    const userName = extraData.name || user.user_metadata?.full_name || user.user_metadata?.name || "User";
    const userEmail = user.email || "";
    const username = extraData.username ? extraData.username.toLowerCase().replace(/^@/, "") : "";
    const photoURL = extraData.photoURL || user.user_metadata?.avatar_url || user.user_metadata?.picture || "";

    const profileData = {
        uid: user.id,
        name: userName,
        profileName: userName,
        username: username,
        email: userEmail,
        photoURL: photoURL,
        profileImage: photoURL,
        updated_at: new Date().toISOString()
    };

    localStorage.setItem("justiceUser", JSON.stringify(profileData));

    try {
        const { error } = await supabase
            .from("users")
            .upsert(profileData, { onConflict: "uid" });

        if (error) throw error;
        console.log("Profile successfully saved to Supabase!");
    } catch (err) {
        console.error("Supabase Save Error:", err);
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

    const { data: { user: currentUser } } = await supabase.auth.getUser();
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

    try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from("users")
            .select("*");

        if (error) throw error;

        let results = [];
        data.forEach((userData) => {
            if (currentUser && userData.uid === currentUser.id) return;

            const uName = (userData.username || "").toLowerCase();
            const fName = (userData.name || userData.profileName || "").toLowerCase();

            if (uName.includes(searchTerm) || fName.includes(searchTerm)) {
                results.push({ id: userData.uid, ...userData });
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
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return alert("Please sign in first.");
    if (!selectedUserForRequest) return;

    try {
        const { error } = await supabase
            .from("chatRequests")
            .insert({
                senderId: currentUser.id,
                receiverId: selectedUserForRequest.uid,
                senderUsername: currentUser.user_metadata?.full_name || currentUser.email || "User",
                receiverUsername: selectedUserForRequest.username || "",
                status: "pending",
                created_at: new Date().toISOString()
            });

        if (error) throw error;

        document.getElementById("jnUserModal")?.classList.remove("active");
        alert("Chat request sent.");
    } catch (error) {
        console.error("Request Error:", error);
        alert("Could not send chat request.");
    }
});

export async function loadRequests() {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    const list = document.getElementById("jnRequestsList");
    if (!list || !currentUser) return;

    try {
        const { data: requests, error } = await supabase
            .from("chatRequests")
            .select("*")
            .eq("receiverId", currentUser.id)
            .eq("status", "pending");

        if (error) throw error;

        if (!requests || requests.length === 0) {
            list.innerHTML = '<div class="jn-empty-state">No requests yet.</div>';
            return;
        }

        list.innerHTML = "";
        requests.forEach((req) => {
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
    const { data: { user: currentUser } } = await supabase.auth.getUser();
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
                updated_at: new Date().toISOString()
            }, { onConflict: "id" });

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
    const { data: { user: currentUser } } = await supabase.auth.getUser();
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

            const { data: userDoc } = await supabase
                .from("users")
                .select("*")
                .eq("uid", otherUid)
                .single();

            if (!userDoc) continue;

            const item = document.createElement("div");
            item.className = "jn-chat-item";
            item.innerHTML = `
                <img src="${userDoc.photoURL || userDoc.profileImage || 'https://via.placeholder.com/120'}">
                <div class="jn-chat-item-content">
                    <strong>${escapeText(userDoc.name || userDoc.profileName || "User")}</strong>
                    <small>@${escapeText(userDoc.username || "")}</small>
                </div>
            `;
            item.addEventListener("click", () => openConversation(chat.id, userDoc));
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

    if (messageChannel) {
        supabase.removeChannel(messageChannel);
    }

    async function fetchAndRenderMessages() {
        const { data: messages, error } = await supabase
            .from("messages")
            .select("*")
            .eq("chatId", chatId)
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Fetch Messages Error:", error);
            return;
        }

        messagesContainer.innerHTML = "";
        const localUser = JSON.parse(localStorage.getItem("justiceUser"));
        messages.forEach((msg) => {
            const isMine = localUser && msg.senderId === localUser.uid;

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
    }

    fetchAndRenderMessages();

    messageChannel = supabase
        .channel(`public:messages:chatId=eq.${chatId}`)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages', filter: `chatId=eq.${chatId}` },
            () => {
                fetchAndRenderMessages();
            }
        )
        .subscribe();
}

async function sendMessage() {
    const input = document.getElementById("jnMessageInput");
    if (!input) return;

    const text = input.value.trim();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!text || !currentUser || !currentActiveChatId) return;

    input.value = "";
    try {
        await supabase
            .from("messages")
            .insert({
                chatId: currentActiveChatId,
                text: text,
                senderId: currentUser.id,
                created_at: new Date().toISOString()
            });

        await supabase
            .from("chats")
            .update({ updated_at: new Date().toISOString() })
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
    if (messageChannel) {
        supabase.removeChannel(messageChannel);
        messageChannel = null;
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
        if (message) message.textContent = "Please fill in all fields.";
        return;
    }

    if (password.length < 6) {
        if (message) message.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        if (message) message.textContent = "Passwords do not match.";
        return;
    }

    if (message) message.textContent = "Creating your account...";

    supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: name }
        }
    }).then(async function(response) {
        if (response.error) throw response.error;
        if (response.data.user) {
            await saveJusticeUser(response.data.user, { name });
        }
        if (message) message.textContent = "Account created successfully!";
        form.reset();

        setTimeout(function() {
            handleAppNavigation("signinPage");
        }, 1000);
    }).catch(function(error) {
        console.error("Supabase Sign Up Error:", error);
        if (message) message.textContent = "Account creation failed: " + error.message;
    });
}, true);

/* =====================================================
   SIGN IN (Fixed & Bulletproof Navigation)
   ===================================================== */
document.addEventListener("submit", function(event) {
    const form = event.target;
    if (!form || form.id !== "signinForm") return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const nameInput = document.getElementById("fullName");
    const name = nameInput ? nameInput.value.trim() : "";
    
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const message = document.getElementById("signinMessage");

    if (!emailField || !passwordField) {
        if (message) message.textContent = "Sign-in form inputs missing!";
        return;
    }

    const email = emailField.value.trim().toLowerCase();
    const password = passwordField.value;

    if (!email || !password) {
        if (message) message.textContent = "Please fill in all fields.";
        return;
    }

    if (message) message.textContent = "Signing in...";

    supabase.auth.signInWithPassword({
        email,
        password
    }).then(async function(response) {
        if (response.error) throw response.error;
        
        await saveJusticeUser(response.data.user, { name });
        if (message) message.textContent = "Sign in successful! Redirecting...";

        // Direct DOM check to ensure welcome page appears instantly without blank screen
        setTimeout(function() {
            // 1. Try global helper if it exists
            if (typeof handleAppNavigation === "function") {
                handleAppNavigation("welcomePage");
            }
            
            // 2. Direct DOM fallback to switch screens safely
            const authSection = document.getElementById("authContainer") || document.getElementById("signinPage") || document.querySelector(".auth-section");
            const welcomeSection = document.getElementById("welcomeContainer") || document.getElementById("welcomePage") || document.querySelector(".welcome-section");

            if (authSection) {
                authSection.style.display = "none";
                authSection.classList.remove("active");
            }
            if (welcomeSection) {
                welcomeSection.style.display = "block";
                welcomeSection.classList.add("active");
            }

            // Agar pages class-based toggle hote hain (jaise .page { display: none })
            document.querySelectorAll(".page, .screen").forEach(p => p.classList.remove("active"));
            const targetWelcome = document.getElementById("welcomePage") || document.getElementById("welcomeContainer");
            if (targetWelcome) targetWelcome.classList.add("active");

        }, 700);

    }).catch(function(error) {
        console.error("Supabase Sign In Error:", error);
        if (message) message.textContent = "Sign in failed: " + error.message;
    });
}, true);
/* =====================================================
   1. AUTO-CHECK SESSION ON PAGE LOAD (Prevents falling back to First Page)
   ===================================================== */
document.addEventListener("DOMContentLoaded", async function() {
    // Check if user is already logged in (especially after Google OAuth redirect)
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session && session.user) {
            console.log("Active session found, redirecting to welcome page...");
            
            // Hide Auth / First Page instantly
            const authSection = document.getElementById("authContainer") || document.getElementById("signinPage") || document.querySelector(".auth-section");
            const welcomeSection = document.getElementById("welcomeContainer") || document.getElementById("welcomePage") || document.querySelector(".welcome-section");

            if (authSection) {
                authSection.style.display = "none";
                authSection.classList.remove("active");
            }
            if (welcomeSection) {
                welcomeSection.style.display = "block";
                welcomeSection.classList.add("active");
            }

            document.querySelectorAll(".page, .screen").forEach(p => p.classList.remove("active"));
            const targetWelcome = document.getElementById("welcomePage") || document.getElementById("welcomeContainer");
            if (targetWelcome) targetWelcome.classList.add("active");

            // Load user data & chats in background
            loadChats();
            loadRequests();
        }
    } catch (err) {
        console.error("Session check error:", err);
    }
});

/* =====================================================
   2. GOOGLE SIGN IN BUTTON SETUP
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
        googleButton.textContent = "Connecting to Google...";

        // Live Vercel app ya local host dono ke liye dynamic welcome page URL
        const redirectUrl = window.location.origin + "/welcome.html";

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl
            }
        });

        if (error) {
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
document.addEventListener("click", function(event) {
    const button = event.target.closest("#resetPasswordButton");
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const emailInput = document.getElementById("resetEmail");
    const message = document.getElementById("resetMessage");
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!email) {
        if (message) message.textContent = "Please enter your email address.";
        return;
    }

    if (message) message.textContent = "Sending password reset email...";

    supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
    }).then(function({ error }) {
        if (error) throw error;
        if (message) message.textContent = "Password reset link has been sent to your email.";
    }).catch(function(error) {
        console.error("Password Reset Error:", error);
        if (message) message.textContent = "Unable to send reset email: " + error.message;
    });
}, true);

/* =====================================================
   AUTH STATE OBSERVER (Handles Google Redirect & Session)
   ===================================================== */
supabase.auth.onAuthStateChange(async function(event, session) {
    if (session && session.user) {
        const user = session.user;
        const { data: userDoc } = await supabase
            .from("users")
            .select("*")
            .eq("uid", user.id)
            .single();
        
        if (userDoc) {
            localStorage.setItem("justiceUser", JSON.stringify(userDoc));
        } else {
            await saveJusticeUser(user, { name: user.user_metadata?.full_name });
        }

        loadChats();
        loadRequests();

        // If user just returned from Google OAuth login, automatically direct to welcome page
        if (event === "SIGNED_IN") {
            setTimeout(() => {
                handleAppNavigation("welcomePage");
            }, 500);
        }
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