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
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
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

const googleProvider =
    new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});


/* =====================================================
   KEEP USER SIGNED IN
   ===================================================== */

setPersistence(
    auth,
    browserLocalPersistence
).catch(function(error) {

    console.error(
        "Firebase persistence error:",
        error
    );

});


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

document.addEventListener(
    "submit",
    function(event) {

        const form = event.target;

        if (
            !form ||
            form.id !== "signupForm"
        ) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();


        const name =
            document
                .getElementById("signupName")
                .value
                .trim();

        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("signupPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("signupConfirmPassword")
                .value;

        const message =
            document.getElementById(
                "signupMessage"
            );


        /* Empty fields */

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            message.textContent =
                "Please fill in all fields.";

            return;
        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.textContent =
                "Please enter a valid email address.";

            return;
        }


        /* Password length */

        if (password.length < 6) {

            message.textContent =
                "Password must be at least 6 characters.";

            return;
        }


        /* Password confirmation */

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

            saveJusticeUser(
                result.user,
                name
            );

            message.textContent =
                "Account created successfully!";

            form.reset();


            setTimeout(
                function() {

                    if (
                        typeof openAuthPage ===
                        "function"
                    ) {

                        openAuthPage(
                            "signinPage"
                        );

                    }

                    else if (
                        typeof showPage ===
                        "function"
                    ) {

                        showPage(
                            "signin"
                        );

                    }

                },
                1000
            );

        })

        .catch(function(error) {

            console.error(
                "Firebase Sign Up Error:",
                error
            );


            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                message.textContent =
                    "An account with this email already exists.";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message.textContent =
                    "Please enter a valid email address.";

            }

            else if (
                error.code ===
                "auth/weak-password"
            ) {

                message.textContent =
                    "Password must be at least 6 characters.";

            }

            else {

                message.textContent =
                    "Account creation failed: " +
                    error.code;

            }

        });

    },
    true
);


/* =====================================================
   SIGN IN
   ===================================================== */

document.addEventListener(
    "submit",
    function(event) {

        const form = event.target;

        if (
            !form ||
            form.id !== "signinForm"
        ) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();


        const name =
            document
                .getElementById("fullName")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("password")
                .value;

        const message =
            document.getElementById(
                "signinMessage"
            );


        /* Empty fields */

        if (
            !name ||
            !email ||
            !password
        ) {

            message.textContent =
                "Please fill in all fields.";

            return;
        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.textContent =
                "Invalid email address. Please enter a valid email.";

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

            saveJusticeUser(
                result.user,
                name
            );

            message.textContent =
                "Sign in successful!";


            setTimeout(
                function() {

                    if (
                        typeof openAuthPage ===
                        "function"
                    ) {

                        openAuthPage(
                            "welcomePage"
                        );

                    }

                    else if (
                        typeof showPage ===
                        "function"
                    ) {

                        showPage(
                            "welcome"
                        );

                    }

                },
                700
            );

        })

        .catch(function(error) {

            console.error(
                "Firebase Sign In Error:",
                error
            );


            if (
                error.code ===
                    "auth/invalid-credential" ||
                error.code ===
                    "auth/wrong-password" ||
                error.code ===
                    "auth/user-not-found"
            ) {

                message.textContent =
                    "Invalid email or password. Please try again.";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message.textContent =
                    "Please enter a valid email address.";

            }

            else {

                message.textContent =
                    "Sign in failed: " +
                    error.code;

            }

        });

    },
    true
);


/* =====================================================
   GOOGLE SIGN IN
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const signinForm =
            document.getElementById(
                "signinForm"
            );

        if (!signinForm) {
            return;
        }


        let googleButton =
            document.getElementById(
                "googleSignInButton"
            );


        /* Create only ONE Google button */

        if (!googleButton) {

            googleButton =
                document.createElement(
                    "button"
                );

            googleButton.type =
                "button";

            googleButton.id =
                "googleSignInButton";

            googleButton.className =
                "google-signin-button";

            googleButton.innerHTML =
                "🌐 Continue with Google";


            const divider =
                document.createElement(
                    "div"
                );

            divider.className =
                "auth-divider";

            divider.textContent =
                "OR";


            signinForm.after(
                divider
            );

            divider.after(
                googleButton
            );

        }


        /* Firebase Google Sign In */

        googleButton.onclick =
            function(event) {

                event.preventDefault();


                googleButton.disabled =
                    true;

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


                    setTimeout(
                        function() {

                            if (
                                typeof openAuthPage ===
                                "function"
                            ) {

                                openAuthPage(
                                    "welcomePage"
                                );

                            }

                            else if (
                                typeof showPage ===
                                "function"
                            ) {

                                showPage(
                                    "welcome"
                                );

                            }

                        },
                        700
                    );

                })

                .catch(function(error) {

                    console.error(
                        "GOOGLE SIGN-IN ERROR:",
                        error
                    );


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

                        else if (
                            error.code ===
                            "auth/popup-blocked"
                        ) {

                            message.textContent =
                                "Google sign in popup was blocked. Please allow popups.";

                        }

                        else if (
                            error.code ===
                            "auth/unauthorized-domain"
                        ) {

                            message.textContent =
                                "Google Sign-In error: unauthorized domain.";

                        }

                        else if (
                            error.code ===
                            "auth/operation-not-allowed"
                        ) {

                            message.textContent =
                                "Google Sign-In is not enabled in Firebase.";

                        }

                        else if (
                            error.code ===
                            "auth/invalid-oauth-client-id"
                        ) {

                            message.textContent =
                                "Google Sign-In error: invalid OAuth client ID.";

                        }

                        else {

                            message.textContent =
                                "Google Sign-In error: " +
                                error.code;

                        }

                    }


                    googleButton.disabled =
                        false;

                    googleButton.innerHTML =
                        "🌐 Continue with Google";

                });

            };

    }
);


/* =====================================================
   FORGOT PASSWORD
   ===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#resetPasswordButton"
            );

        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();


        const emailInput =
            document.getElementById(
                "resetEmail"
            );

        const message =
            document.getElementById(
                "resetMessage"
            );


        const email =
            emailInput
                .value
                .trim()
                .toLowerCase();


        /* Email validation */

        if (!email) {

            message.textContent =
                "Please enter your email address.";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.textContent =
                "Please enter a valid email address.";

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

            console.error(
                "Password Reset Error:",
                error
            );


            if (
                error.code ===
                "auth/user-not-found"
            ) {

                message.textContent =
                    "No account found with this email.";

            }

            else if (
                error.code ===
                "auth/invalid-email"
            ) {

                message.textContent =
                    "Please enter a valid email address.";

            }

            else {

                message.textContent =
                    "Unable to send reset email: " +
                    error.code;

            }

        });

    },
    true
);


/* =====================================================
   KEEP USER INFORMATION UPDATED
   ===================================================== */

onAuthStateChanged(
    auth,
    function(user) {

        if (user) {

            saveJusticeUser(
                user,
                user.displayName
            );

        }

    }
);