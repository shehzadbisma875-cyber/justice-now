/* =====================================================
   JUSTICE NOW - FIREBASE AUTHENTICATION
   Sign Up + Sign In + Google + Forgot Password
   ===================================================== */

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    onAuthStateChanged
}
    from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


/* =====================================================
   FIREBASE CONFIG
   ===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyDqR4OpVs45_vy0W2WxXmLLYVKbAKKrKw",
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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


/* =====================================================
   SAVE USER FOR EXISTING JUSTICE NOW APP
   ===================================================== */

function saveJusticeUser(user, name = "") {

    localStorage.setItem(
        "justiceUser",
        JSON.stringify({
            name: name || user.displayName || "",
            email: user.email || ""
        })
    );
}


/* =====================================================
   SIGN UP
   ===================================================== */

document.addEventListener("submit", function(event) {

    const form = event.target;

    if (!form || form.id !== "signupForm") {
        return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;

    const message =
        document.getElementById("signupMessage");


    if (!name || !email || !password || !confirmPassword) {

        message.textContent =
            "Please fill in all fields.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    message.textContent =
        "Creating your account...";


    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(function(result) {

        saveJusticeUser(result.user, name);

        message.textContent =
            "Account created successfully!";

        form.reset();


        setTimeout(function() {

            if (typeof openAuthPage === "function") {
                openAuthPage("signinPage");
            }
            else if (typeof showPage === "function") {
                showPage("signin");
            }

        }, 1000);

    })

    .catch(function(error) {

        if (error.code === "auth/email-already-in-use") {

            message.textContent =
                "An account with this email already exists.";

        }
        else if (error.code === "auth/invalid-email") {

            message.textContent =
                "Please enter a valid email address.";

        }
        else if (error.code === "auth/weak-password") {

            message.textContent =
                "Password must be at least 6 characters.";

        }
        else {

            message.textContent =
                error.message;
        }

    });

}, true);


/* =====================================================
   SIGN IN
   ===================================================== */

document.addEventListener("submit", function(event) {

    const form = event.target;

    if (!form || form.id !== "signinForm") {
        return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();


    const name =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("signinMessage");


    if (!name || !email || !password) {

        message.textContent =
            "Please fill in all fields.";

        return;
    }


    message.textContent =
        "Signing in...";


    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(function(result) {

        saveJusticeUser(result.user, name);

        message.textContent =
            "Sign in successful!";


        setTimeout(function() {

            if (typeof openAuthPage === "function") {
                openAuthPage("welcomePage");
            }
            else if (typeof showPage === "function") {
                showPage("welcome");
            }

        }, 700);

    })

    .catch(function(error) {

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {

            message.textContent =
                "Invalid email or password. Please try again.";

        }
        else if (error.code === "auth/invalid-email") {

            message.textContent =
                "Please enter a valid email address.";

        }
        else {

            message.textContent =
                error.message;
        }

    });

}, true);


/* =====================================================
   GOOGLE SIGN IN BUTTON
   ===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    const signinForm =
        document.getElementById("signinForm");

    if (!signinForm) {
        return;
    }


    let googleButton =
        document.getElementById("googleSignInButton");


    if (!googleButton) {

        googleButton =
            document.createElement("button");

        googleButton.type = "button";

        googleButton.id =
            "googleSignInButton";

        googleButton.className =
            "google-signin-button";

        googleButton.innerHTML =
            "🌐 Continue with Google";


        const divider =
            document.createElement("div");

        divider.className =
            "auth-divider";

        divider.textContent =
            "OR";


        signinForm.after(divider);

        divider.after(googleButton);
    }


    googleButton.onclick = function(event) {

        event.preventDefault();

        googleButton.disabled = true;

        googleButton.textContent =
            "Opening Google...";


        signInWithPopup(
            auth,
            googleProvider
        )

        .then(function(result) {

            saveJusticeUser(
                result.user,
                result.user.displayName
            );


            const message =
                document.getElementById(
                    "signinMessage"
                );

            if (message) {

                message.textContent =
                    "Google sign in successful!";
            }


            setTimeout(function() {

                if (typeof openAuthPage === "function") {
                    openAuthPage("welcomePage");
                }
                else if (typeof showPage === "function") {
                    showPage("welcome");
                }

            }, 700);

        })

        .catch(function(error) {

            const message =
                document.getElementById(
                    "signinMessage"
                );


            if (message) {

                if (
                    error.code ===
                    "auth/popup-closed-by-user"
                ) {

                    message.textContent =
                        "Google sign in was cancelled.";

                }
                else {

                    message.textContent =
                        "Google sign in failed. Please try again.";
                }
            }


            googleButton.disabled = false;

            googleButton.innerHTML =
                "🌐 Continue with Google";

        });

    };

});


/* =====================================================
   FORGOT PASSWORD
   ===================================================== */

document.addEventListener("click", function(event) {

    const button = event.target.closest(
        "#resetPasswordButton"
    );

    if (!button) {
        return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();


    const email =
        document.getElementById("resetEmail")
        .value
        .trim()
        .toLowerCase();

    const message =
        document.getElementById("resetMessage");


    if (!email) {

        message.textContent =
            "Please enter your email address.";

        return;
    }


    message.textContent =
        "Sending password reset email...";


    sendPasswordResetEmail(
        auth,
        email
    )

    .then(function() {

        message.textContent =
            "Password reset link has been sent to your email.";

    })

    .catch(function(error) {

        if (error.code === "auth/user-not-found") {

            message.textContent =
                "No account found with this email.";

        }
        else if (error.code === "auth/invalid-email") {

            message.textContent =
                "Please enter a valid email address.";

        }
        else {

            message.textContent =
                error.message;
        }

    });

}, true);


/* =====================================================
   KEEP USER SIGNED IN
   ===================================================== */

onAuthStateChanged(auth, function(user) {

    if (user) {

        saveJusticeUser(
            user,
            user.displayName
        );

    }

});