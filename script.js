/* ==========================================
   JUSTICE NOW
   COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   PAGE SYSTEM
========================================== */

const pages = {

    signin: document.getElementById("signinPage"),

    forgot: document.getElementById("forgotPage"),

    welcome: document.getElementById("welcomePage"),

    home: document.getElementById("homePage"),

    danger: document.getElementById("dangerPage"),

    report: document.getElementById("reportPage"),

    mycase: document.getElementById("myCasePage"),

    evidence: document.getElementById("evidencePage"),

    ai: document.getElementById("aiGuidesPage"),

    justicehub: document.getElementById("justiceHubPage"),

    chat: document.getElementById("liveChatPage"),

    settings: document.getElementById("settingsPage")

};


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text == null ? "" : String(text);

    return div.innerHTML;

}


function showPage(pageName) {

    Object.values(pages).forEach(function(page) {

        if (page) {
            page.classList.remove("active");
        }

    });


    if (pages[pageName]) {

        pages[pageName].classList.add("active");

    }


    const header =
        document.getElementById("appHeader");


    if (
        pageName === "signin" ||
        pageName === "forgot" ||
        pageName === "welcome"
    ) {

        header.classList.add("hidden");

    }

    else {

        header.classList.remove("hidden");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* ==========================================
   SIGN IN
========================================== */

document.getElementById("signinForm")
.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("fullName")
        .value
        .trim();


    const email =
        document.getElementById("email")
        .value
        .trim();


    const password =
        document.getElementById("password")
        .value
        .trim();


    if (!name || !email || !password) {

        document.getElementById("signinMessage")
        .textContent =
        "Please fill all fields.";

        return;

    }


    localStorage.setItem(
        "justiceUser",
        JSON.stringify({

            name: name,

            email: email

        })
    );


    document.getElementById("signinMessage")
    .textContent =
    "Sign in successful!";


    setTimeout(function() {

        showPage("welcome");

    }, 400);

});



/* PASSWORD SHOW */

document.getElementById("togglePassword")
.addEventListener("click", function() {

    const password =
        document.getElementById("password");


    if (password.type === "password") {

        password.type = "text";

    }

    else {

        password.type = "password";

    }

});



/* ==========================================
   FORGOT PASSWORD
========================================== */

document.getElementById("forgotPasswordButton")
.addEventListener("click", function() {

    showPage("forgot");

});


document.getElementById("forgotBackButton")
.addEventListener("click", function() {

    showPage("signin");

});


document.getElementById("resetPasswordButton")
.addEventListener("click", function() {

    const email =
        document.getElementById("resetEmail")
        .value
        .trim();


    const newPassword =
        document.getElementById("newPassword")
        .value
        .trim();


    const confirmPassword =
        document.getElementById("confirmPassword")
        .value
        .trim();


    const message =
        document.getElementById("resetMessage");


    if (!email || !newPassword || !confirmPassword) {

        message.textContent =
        "Please complete all fields.";

        return;

    }


    if (newPassword !== confirmPassword) {

        message.textContent =
        "Passwords do not match.";

        return;

    }


    message.textContent =
    "Password reset successfully.";

});


/* ==========================================
   WELCOME
========================================== */

document.getElementById("getStartedButton")
.addEventListener("click", function() {

    showPage("home");

});



/* ==========================================
   HOME BUTTONS
========================================== */

document.getElementById("dangerButton")
.addEventListener("click", function() {

    showPage("danger");

    renderEmergencyNumbers();

    renderContacts();

});


document.getElementById("reportCaseButton")
.addEventListener("click", function() {

    showPage("report");

});


document.getElementById("myCaseButton")
.addEventListener("click", function() {

    showPage("mycase");

    renderCases();

    renderProtestCases();

    renderProtests();

});


document.getElementById("evidenceButton")
.addEventListener("click", function() {

    showPage("evidence");

    updateEvidenceTrustedContacts();

});


document.getElementById("aiGuidesButton")
.addEventListener("click", function() {

    showPage("ai");

});


document.getElementById("justiceHubButton")
.addEventListener("click", function() {

    showPage("justicehub");

});


/* ==========================================
   BACK BUTTONS
========================================== */

document.getElementById("dangerBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("reportBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("myCaseBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("evidenceBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("aiBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("justiceHubBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("chatBackButton")
.addEventListener("click", function() {

    showPage("home");

});


document.getElementById("settingsBackButton")
.addEventListener("click", function() {

    showPage("home");

});



/* ==========================================
   THREE DOTS MENU
========================================== */

const mainMenu =
    document.getElementById("mainMenu");


document.getElementById("threeDotsButton")
.addEventListener("click", function() {

    mainMenu.classList.toggle("hidden");

});



document.querySelectorAll("[data-menu]")
.forEach(function(button) {

    button.addEventListener("click", function() {

        const menu =
            button.getAttribute("data-menu");


        if (menu === "theme") {

            document.getElementById("themeMenu")
            .classList.toggle("hidden");

        }


        if (menu === "language") {

            document.getElementById("languageMenu")
            .classList.toggle("hidden");

        }

    });

});



/* ==========================================
   THEME
========================================== */

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

    }

    else {

        document.body.classList.remove("light-mode");

    }


    localStorage.setItem(
        "justiceTheme",
        theme
    );

}


document.getElementById("lightModeButton")
.addEventListener("click", function() {

    setTheme("light");

});


document.getElementById("darkModeButton")
.addEventListener("click", function() {

    setTheme("dark");

});


document.getElementById("settingsLightMode")
.addEventListener("click", function() {

    setTheme("light");

});


document.getElementById("settingsDarkMode")
.addEventListener("click", function() {

    setTheme("dark");

});



/* ==========================================
   LANGUAGE
========================================== */

let currentLanguage =
localStorage.getItem("justiceLanguage") || "en";


function changeLanguage(language) {

    currentLanguage = language;


    localStorage.setItem(
        "justiceLanguage",
        language
    );


    const translations = {

        en: {

            homeTitle:
                "How can I help you?",

            danger:
                "I'm in Danger",

            report:
                "Report a Case",

            mycase:
                "My Case",

            evidence:
                "Evidence Vault",

            ai:
                "AI Guides",

            hub:
                "Justice Hub"

        },


        ur: {

            homeTitle:
                "میں آپ کی کیسے مدد کر سکتا ہوں؟",

            danger:
                "میں خطرے میں ہوں",

            report:
                "کیس رپورٹ کریں",

            mycase:
                "میرا کیس",

            evidence:
                "ثبوت والٹ",

            ai:
                "اے آئی رہنمائی",

            hub:
                "جسٹس ہب"

        }

    };


    const t =
        translations[language];


    const homeHeading =
        document.querySelector(".home-title p");


    if (homeHeading) {

        homeHeading.textContent =
        t.homeTitle;

    }


    const featureButtons =
        document.querySelectorAll(
            ".home-features .feature-button strong"
        );


    if (featureButtons.length >= 6) {

        featureButtons[0].textContent =
        t.danger;

        featureButtons[1].textContent =
        t.report;

        featureButtons[2].textContent =
        t.mycase;

        featureButtons[3].textContent =
        t.evidence;

        featureButtons[4].textContent =
        t.ai;

        featureButtons[5].textContent =
        t.hub;

    }


    document.documentElement.lang =
    language === "ur"
        ? "ur"
        : "en";


    document.body.dir =
    language === "ur"
        ? "rtl"
        : "ltr";

}


document.querySelectorAll(".language-option")
.forEach(function(button) {

    button.addEventListener("click", function() {

        changeLanguage(
            button.dataset.language
        );

    });

});


document.querySelectorAll(".settings-language")
.forEach(function(button) {

    button.addEventListener("click", function() {

        changeLanguage(
            button.dataset.language
        );

    });

});



/* ==========================================
   SETTINGS PAGE
========================================== */

document.getElementById("settingsButton")
.addEventListener("click", function() {

    mainMenu.classList.add("hidden");

    showPage("settings");

});


document.querySelectorAll(".setting-header")
.forEach(function(header) {

    header.addEventListener("click", function() {

        const content =
            header.nextElementSibling;


        content.classList.toggle("hidden");

    });

});



/* ACCOUNT */

document.getElementById("saveAccountSettings")
.addEventListener("click", function() {

    const name =
        document.getElementById("accountNameSetting")
        .value;


    const phone =
        document.getElementById("accountPhoneSetting")
        .value;


    localStorage.setItem(
        "justiceAccount",
        JSON.stringify({

            name: name,

            phone: phone

        })
    );


    alert("Account settings saved.");

});



/* ACCESSIBILITY */

document.getElementById("fontSizeSlider")
.addEventListener("input", function() {

    const size =
        this.value;


    document.documentElement.style
    .setProperty(
        "--font-size",
        size + "px"
    );


    document.getElementById("fontSizeValue")
    .textContent =
    size + "px";


    localStorage.setItem(
        "justiceFontSize",
        size
    );

});



/* DATA */

document.getElementById("clearAppDataButton")
.addEventListener("click", function() {

    if (
        confirm(
            "Clear saved cases, comments and chat data?"
        )
    ) {

        localStorage.removeItem(
            "justiceCases"
        );

        localStorage.removeItem(
            "justiceProtests"
        );

        localStorage.removeItem(
            "justiceChat"
        );

        localStorage.removeItem(
            "justiceGroups"
        );

        alert(
            "Selected app data cleared."
        );

    }

});



/* HELP SUPPORT */

document.getElementById("faqButton")
.addEventListener("click", function() {

    alert(
        "FAQ: Use emergency tools for urgent situations, report cases and manage evidence."
    );

});


document.getElementById("contactSupportButton")
.addEventListener("click", function() {

    alert(
        "Support contact feature can be connected to your official support team."
    );

});


document.getElementById("reportProblemButton")
.addEventListener("click", function() {

    const problem =
        prompt(
            "Describe the problem:"
        );


    if (problem) {

        localStorage.setItem(
            "justiceLastProblem",
            problem
        );

        alert(
            "Problem saved. Thank you."
        );

    }

});



/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem(
        "justiceUser"
    );

    showPage("signin");

}


document.getElementById("logoutButton")
.addEventListener("click", logout);


document.getElementById("settingsLogoutButton")
.addEventListener("click", logout);



/* ==========================================
   EMERGENCY SERVICES
========================================== */

const emergencyServices = [

    {
        name: "Police",
        number: "15",
        icon: "👮"
    },

    {
        name: "Rescue 1122",
        number: "1122",
        icon: "🚑"
    },

    {
        name: "Fire Brigade",
        number: "16",
        icon: "🚒"
    },

    {
        name: "Edhi Ambulance",
        number: "115",
        icon: "🚑"
    },

    {
        name: "Chhipa Ambulance",
        number: "1020",
        icon: "🚑"
    },

    {
        name: "Women Helpline",
        number: "1099",
        icon: "👩"
    },

    {
        name: "Child Protection",
        number: "1121",
        icon: "👶"
    },

    {
        name: "Human Rights Support",
        number: "1099",
        icon: "🧑"
    },

    {
        name: "Domestic Violence Emergency",
        number: "15",
        icon: "🛡️"
    },

    {
        name: "Medical Emergency",
        number: "1122",
        icon: "🏥"
    }

];


function renderEmergencyNumbers(search = "") {

    const container =
        document.getElementById(
            "emergencyResults"
        );


    const query =
        search.toLowerCase();


    const filtered =
        emergencyServices.filter(function(service) {

            return (
                service.name
                .toLowerCase()
                .includes(query)
                ||
                service.number
                .includes(query)
            );

        });


    container.innerHTML = "";


    if (filtered.length === 0) {

        container.innerHTML =
        "<p>No emergency service found.</p>";

        return;

    }


    filtered.forEach(function(service) {

        const item =
            document.createElement("div");


        item.className =
            "emergency-item";


        item.innerHTML = `

            <span>${service.icon}</span>

            <strong>${service.name}</strong>

            <a href="tel:${service.number}">
                📞 ${service.number}
            </a>

        `;


        container.appendChild(item);

    });

}


document.getElementById("emergencySearch")
.addEventListener("input", function() {

    renderEmergencyNumbers(
        this.value
    );

});



/* ==========================================
   TRUSTED CONTACTS
========================================== */

let contacts =
JSON.parse(
    localStorage.getItem(
        "justiceContacts"
    )
    ||
    "[]"
);


function saveContacts() {

    localStorage.setItem(
        "justiceContacts",
        JSON.stringify(contacts)
    );

}


function renderContacts() {

    const list =
        document.getElementById(
            "contactsList"
        );


    list.innerHTML = "";


    if (contacts.length === 0) {

        list.innerHTML =
        "<p>No trusted contacts added yet.</p>";

        return;

    }


    contacts.forEach(function(contact, index) {

        const item =
            document.createElement("div");


        item.className =
            "contact-item";


        const whatsappNumber =
            contact.phone
            .replace(/\D/g, "");


        item.innerHTML = `

            <strong>
                ${contact.name}
            </strong>

            <span>
                ${contact.phone}
            </span>

            <a
                class="call-btn"
                href="tel:${contact.phone}"
            >
                📞
            </a>

            <a
                class="sms-btn"
                href="sms:${contact.phone}"
            >
                💬
            </a>

            <a
                class="whatsapp-btn"
                target="_blank"
                href="https://wa.me/${whatsappNumber}"
            >
                🟢
            </a>

            <button
                onclick="deleteContact(${index})"
            >
                🗑
            </button>

        `;


        list.appendChild(item);

    });

}


document.getElementById("addContactButton")
.addEventListener("click", function() {

    const name =
        document.getElementById("contactName")
        .value
        .trim();


    const phone =
        document.getElementById("contactPhone")
        .value
        .trim();


    if (!name || !phone) {

        alert(
            "Please enter name and phone number."
        );

        return;

    }


    contacts.push({

        name: name,

        phone: phone

    });


    saveContacts();

    renderContacts();


    document.getElementById("contactName")
    .value = "";


    document.getElementById("contactPhone")
    .value = "";

});


function deleteContact(index) {

    contacts.splice(index, 1);

    saveContacts();

    renderContacts();

}


window.deleteContact =
deleteContact;



/* ==========================================
   LIVE LOCATION
========================================== */

document.getElementById("shareLocationButton")
.addEventListener("click", function() {

    const message =
        document.getElementById(
            "locationMessage"
        );


    if (!navigator.geolocation) {

        message.textContent =
        "Location is not supported by this browser.";

        return;

    }


    message.textContent =
    "Getting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            const locationLink =
                "https://www.google.com/maps?q="
                +
                latitude
                +
                ","
                +
                longitude;


            navigator.clipboard
            .writeText(locationLink)
            .catch(function() {});


            message.innerHTML = `

                Location ready.<br>

                Latitude:
                ${latitude.toFixed(5)}<br>

                Longitude:
                ${longitude.toFixed(5)}

            `;

        },


        function() {

            message.textContent =
            "Location permission was not granted.";

        }

    );

});



/* ==========================================
   SOS
========================================== */

document.getElementById("sosButton")
.addEventListener("click", function() {

    const message =
        document.getElementById(
            "sosMessage"
        );


    if (contacts.length === 0) {

        message.textContent =
        "Add a trusted contact first.";

        return;

    }


    message.textContent =
    "SOS alert prepared for trusted contacts.";

});



/* ==========================================
   REPORT CASE
========================================== */

document.getElementById("useCurrentLocationButton")
.addEventListener("click", function() {

    if (!navigator.geolocation) {

        alert(
            "Location is not supported."
        );

        return;

    }


    navigator.geolocation
    .getCurrentPosition(

        function(position) {

            document.getElementById(
                "incidentLocation"
            )
            .value =
            position.coords.latitude
            +
            ", "
            +
            position.coords.longitude;

        },


        function() {

            alert(
                "Location permission denied."
            );

        }

    );

});


document.getElementById("saveCaseButton")
.addEventListener("click", function() {

    const title =
        document.getElementById("caseTitle")
        .value
        .trim();


    const type =
        document.getElementById("incidentType")
        .value;


    const location =
        document.getElementById("incidentLocation")
        .value
        .trim();


    const description =
        document.getElementById("caseDescription")
        .value
        .trim();


    if (
        !title ||
        !type ||
        !location ||
        !description
    ) {

        document.getElementById(
            "reportMessage"
        )
        .textContent =
        "Please complete all required fields.";

        return;

    }


    const cases =
    JSON.parse(
        localStorage.getItem(
            "justiceCases"
        )
        ||
        "[]"
    );


    cases.push({

        id: Date.now(),

        title: title,

        type: type,

        date:
            document.getElementById(
                "incidentDate"
            ).value,

        time:
            document.getElementById(
                "incidentTime"
            ).value,

        location: location,

        description: description,

        status: "Open",

        progress: 25

    });


    localStorage.setItem(

        "justiceCases",

        JSON.stringify(cases)

    );


    document.getElementById(
        "reportMessage"
    )
    .textContent =
    "Case saved successfully.";


    document.getElementById("caseTitle")
    .value = "";

    document.getElementById("incidentType")
    .value = "";

    document.getElementById("incidentDate")
    .value = "";

    document.getElementById("incidentTime")
    .value = "";

    document.getElementById("incidentLocation")
    .value = "";

    document.getElementById("caseDescription")
    .value = "";

});



/* ==========================================
   MY CASE
========================================== */

let currentCaseFilter =
"All";


document.querySelectorAll(".case-filter")
.forEach(function(button) {

    button.addEventListener("click", function() {

        currentCaseFilter =
        button.dataset.filter;


        document.querySelectorAll(".case-filter")
        .forEach(function(item) {

            item.classList.remove(
                "active-filter"
            );

        });


        button.classList.add(
            "active-filter"
        );


        renderCases();

    });

});


function renderCases() {

    const container =
        document.getElementById(
            "caseSummaryArea"
        );


    let cases =
    JSON.parse(
        localStorage.getItem(
            "justiceCases"
        )
        ||
        "[]"
    );


    if (currentCaseFilter !== "All") {

        cases =
        cases.filter(function(caseItem) {

            return (
                caseItem.status ===
                currentCaseFilter
            );

        });

    }


    container.innerHTML = "";


    if (cases.length === 0) {

        container.innerHTML = `
            <div class="case-card">
                <h3>No cases found.</h3>
            </div>
        `;

        return;

    }


    cases.forEach(function(caseItem) {

        const allCases =
        JSON.parse(
            localStorage.getItem(
                "justiceCases"
            )
            ||
            "[]"
        );


        const originalIndex =
        allCases.findIndex(function(item) {

            return (
                item.id === caseItem.id
            );

        });


        const statusClass =
        caseItem.status.toLowerCase();


        container.innerHTML += `

            <div class="case-card">

                <div class="case-top">

                    <h2>
                        ${caseItem.title}
                    </h2>

                    <span class="case-status ${statusClass}">
                        ${caseItem.status}
                    </span>

                </div>


                <p>
                    <strong>Type:</strong>
                    ${caseItem.type}
                </p>


                <p>
                    <strong>Location:</strong>
                    ${caseItem.location}
                </p>


                <p>
                    ${caseItem.description}
                </p>


                <h4>
                    📊 Digital Progress
                </h4>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${caseItem.progress}%"
                    ></div>

                </div>


                <p>
                    Progress:
                    ${caseItem.progress}%
                </p>


                <button
                    onclick="increaseProgress(${originalIndex})"
                >
                    Increase Progress
                </button>


                <button
                    onclick="setPending(${originalIndex})"
                >
                    Pending
                </button>


                <button
                    onclick="toggleCaseStatus(${originalIndex})"
                >
                    ${
                        caseItem.status === "Closed"
                        ?
                        "Reopen"
                        :
                        "Close Case"
                    }
                </button>

            </div>

        `;

    });

}


function getCases() {

    return JSON.parse(
        localStorage.getItem(
            "justiceCases"
        )
        ||
        "[]"
    );

}


function saveCases(cases) {

    localStorage.setItem(
        "justiceCases",
        JSON.stringify(cases)
    );

}


function increaseProgress(index) {

    const cases =
        getCases();


    cases[index].progress =
        Math.min(
            100,
            cases[index].progress + 25
        );


    saveCases(cases);

    renderCases();

}


function setPending(index) {

    const cases =
        getCases();


    cases[index].status =
    "Pending";


    saveCases(cases);

    renderCases();

}


function toggleCaseStatus(index) {

    const cases =
        getCases();


    if (
        cases[index].status ===
        "Closed"
    ) {

        cases[index].status =
        "Open";

        cases[index].progress =
        25;

    }

    else {

        cases[index].status =
        "Closed";

        cases[index].progress =
        100;

    }


    saveCases(cases);

    renderCases();

}


window.increaseProgress =
increaseProgress;

window.setPending =
setPending;

window.toggleCaseStatus =
toggleCaseStatus;



/* ==========================================
   DIGITAL PROTEST
========================================== */

function renderProtestCases() {

    const select =
        document.getElementById(
            "protestCaseSelect"
        );


    const cases =
        getCases();


    select.innerHTML =
    `<option value="">
        Select a case
    </option>`;


    cases.forEach(function(caseItem) {

        select.innerHTML += `

            <option value="${caseItem.id}">
                ${caseItem.title}
            </option>

        `;

    });

}


document.getElementById("addProtestButton")
.addEventListener("click", function() {

    const caseId =
        document.getElementById(
            "protestCaseSelect"
        ).value;


    const comment =
        document.getElementById(
            "protestComment"
        )
        .value
        .trim();


    if (!caseId || !comment) {

        alert(
            "Select a case and write a comment."
        );

        return;

    }


    const protests =
    JSON.parse(
        localStorage.getItem(
            "justiceProtests"
        )
        ||
        "[]"
    );


    protests.push({

        id: Date.now(),

        caseId: caseId,

        comment: comment

    });


    localStorage.setItem(
        "justiceProtests",
        JSON.stringify(protests)
    );


    document.getElementById(
        "protestComment"
    )
    .value = "";


    renderProtests();

});


function renderProtests() {

    const container =
        document.getElementById(
            "protestList"
        );


    const protests =
    JSON.parse(
        localStorage.getItem(
            "justiceProtests"
        )
        ||
        "[]"
    );


    container.innerHTML = "";


    protests.forEach(function(protest, index) {

        container.innerHTML += `

            <div class="protest-item">

                <p>
                    ${protest.comment}
                </p>

                <button
                    class="delete-comment"
                    onclick="deleteProtest(${index})"
                >
                    Delete Comment
                </button>

            </div>

        `;

    });

}


function deleteProtest(index) {

    const protests =
    JSON.parse(
        localStorage.getItem(
            "justiceProtests"
        )
        ||
        "[]"
    );


    protests.splice(index, 1);


    localStorage.setItem(
        "justiceProtests",
        JSON.stringify(protests)
    );


    renderProtests();

}


window.deleteProtest =
deleteProtest;



/* ==========================================
   EVIDENCE CAMERA
========================================== */

let cameraStream = null;


document.getElementById("startCameraButton")
.addEventListener("click", async function() {

    try {

        cameraStream =
        await navigator.mediaDevices
        .getUserMedia({

            video: true,

            audio: false

        });


        const video =
            document.getElementById(
                "cameraVideo"
            );


        video.srcObject =
        cameraStream;


        document.getElementById(
            "cameraArea"
        )
        .classList.remove(
            "hidden"
        );

    }

    catch (error) {

        alert(
            "Camera permission was denied or camera is unavailable."
        );

    }

});


document.getElementById("stopCameraButton")
.addEventListener("click", function() {

    if (cameraStream) {

        cameraStream
        .getTracks()
        .forEach(function(track) {

            track.stop();

        });


        cameraStream = null;

    }


    document.getElementById(
        "cameraArea"
    )
    .classList.add(
        "hidden"
    );

});


document.getElementById("capturePhotoButton")
.addEventListener("click", function() {

    const video =
        document.getElementById(
            "cameraVideo"
        );


    if (!cameraStream) {

        alert(
            "Open the camera first."
        );

        return;

    }


    const canvas =
        document.getElementById(
            "cameraCanvas"
        );


    canvas.width =
        video.videoWidth;


    canvas.height =
        video.videoHeight;


    const context =
        canvas.getContext("2d");


    context.drawImage(
        video,
        0,
        0
    );


    const image =
        canvas.toDataURL(
            "image/png"
        );


    const list =
        document.getElementById(
            "evidenceList"
        );


    const item =
        document.createElement(
            "div"
        );


    item.className =
    "evidence-item";


    item.innerHTML = `

        <strong>
            📷 Camera Evidence Captured
        </strong>

        <br>

        <img
            src="${image}"
            style="
                max-width:200px;
                margin-top:10px;
                border-radius:8px;
            "
        >

    `;


    list.appendChild(item);

});


document.getElementById("evidenceFile")
.addEventListener("change", function() {

    const list =
        document.getElementById(
            "evidenceList"
        );


    Array.from(this.files)
    .forEach(function(file) {

        const item =
            document.createElement(
                "div"
            );


        item.className =
        "evidence-item";


        item.textContent =
            "📄 "
            +
            file.name;


        list.appendChild(item);

    });

});


function updateEvidenceTrustedContacts() {

    const select =
        document.getElementById(
            "trustedEvidenceSelect"
        );


    select.innerHTML = `
        <option value="">
            Do not share
        </option>
    `;


    contacts.forEach(function(contact) {

        select.innerHTML += `

            <option value="${contact.phone}">
                ${contact.name}
            </option>

        `;

    });

}


document.getElementById("saveEvidenceButton")
.addEventListener("click", function() {

    const trusted =
        document.getElementById(
            "trustedEvidenceSelect"
        ).value;


    const lawyer =
        document.getElementById(
            "lawyerName"
        )
        .value
        .trim();


    localStorage.setItem(

        "justiceEvidenceAccess",

        JSON.stringify({

            trusted: trusted,

            lawyer: lawyer

        })

    );


    document.getElementById(
        "evidenceMessage"
    )
    .textContent =
    "Evidence access settings saved.";

});



/* ==========================================
   AI GUIDES
   CONTEXTUAL FRONTEND GUIDANCE
========================================== */

/*
    Each topic has a set of English + Urdu keywords and its own
    English + Urdu advice list. generateAiAnswer scores every topic
    by counting how many of its keywords appear in the question and
    picks the topic with the highest score, so different questions
    (in either language) actually produce different guidance instead
    of almost everything falling through to one generic default.
*/
const aiGuideTopics = [

    {
        id: "threat",
        titleEn: "Threat / Danger Guidance",
        titleUr: "دھمکی / خطرے کی رہنمائی",
        keywords: [
            "threat", "threaten", "threatening", "danger", "dangerous",
            "life", "kill", "hurt me", "دھمکی", "خطرہ", "خطرناک", "جان"
        ],
        adviceEn: [
            "Move to a safer place if you believe there is immediate danger.",
            "Avoid confronting the person if that could increase the risk.",
            "Save threatening messages or other evidence if it is safe.",
            "Tell a trusted person what is happening.",
            "If there is an immediate emergency, contact the appropriate emergency service."
        ],
        adviceUr: [
            "اگر فوری خطرہ محسوس ہو تو کسی محفوظ جگہ چلے جائیں۔",
            "اگر تصادم خطرہ بڑھا سکتا ہے تو اس شخص کا سامنا کرنے سے گریز کریں۔",
            "اگر محفوظ ہو تو دھمکی آمیز پیغامات یا دیگر ثبوت محفوظ کریں۔",
            "جو کچھ ہو رہا ہے وہ کسی قابل اعتماد شخص کو بتائیں۔",
            "فوری ہنگامی صورتحال میں متعلقہ ایمرجنسی سروس سے رابطہ کریں۔"
        ]
    },

    {
        id: "harassment",
        titleEn: "Harassment Guidance",
        titleUr: "ہراساں کیے جانے کی رہنمائی",
        keywords: [
            "harass", "harassment", "stalk", "stalking", "following me",
            "inappropriate", "ہراساں", "تعاقب"
        ],
        adviceEn: [
            "Write down what happened, including dates and places.",
            "Keep relevant messages, screenshots or other evidence.",
            "Consider telling a trusted person or appropriate authority.",
            "Avoid deleting evidence that may help explain the situation.",
            "Seek qualified legal or professional advice for your specific situation."
        ],
        adviceUr: [
            "واقعے کی تفصیلات، تاریخ اور جگہ لکھ لیں۔",
            "متعلقہ پیغامات، اسکرین شاٹس یا دیگر ثبوت محفوظ رکھیں۔",
            "کسی قابل اعتماد شخص یا متعلقہ ادارے کو بتانے پر غور کریں۔",
            "ایسے ثبوت نہ مٹائیں جو صورتحال واضح کرنے میں مدد دے سکیں۔",
            "اپنی مخصوص صورتحال کے لیے قابل قانونی یا پیشہ ورانہ مشورہ حاصل کریں۔"
        ]
    },

    {
        id: "theft",
        titleEn: "Theft / Stolen Property Guidance",
        titleUr: "چوری / گمشدہ سامان کی رہنمائی",
        keywords: [
            "theft", "stolen", "steal", "robbed", "robbery", "missing item",
            "burglary", "چوری", "لوٹا"
        ],
        adviceEn: [
            "Make a clear list of the missing or stolen property.",
            "Write down when and where you last saw it.",
            "Preserve receipts, photos or ownership information.",
            "Report the incident to the appropriate authority when necessary.",
            "Do not put yourself in danger while trying to recover property."
        ],
        adviceUr: [
            "گمشدہ یا چوری شدہ سامان کی واضح فہرست بنائیں۔",
            "لکھ لیں کہ آپ نے اسے آخری بار کب اور کہاں دیکھا تھا۔",
            "رسیدیں، تصاویر یا ملکیت سے متعلق معلومات محفوظ رکھیں۔",
            "ضرورت پڑنے پر واقعے کی رپورٹ متعلقہ ادارے کو کریں۔",
            "سامان واپس لینے کی کوشش میں خود کو خطرے میں نہ ڈالیں۔"
        ]
    },

    {
        id: "fraud",
        titleEn: "Fraud / Scam Guidance",
        titleUr: "فراڈ / دھوکہ دہی کی رہنمائی",
        keywords: [
            "fraud", "scam", "scammed", "cheated", "money transfer",
            "fake investment", "phishing", "فراڈ", "دھوکہ"
        ],
        adviceEn: [
            "Stop sending money or personal information immediately.",
            "Save screenshots, transaction details and messages.",
            "Contact the relevant bank or service provider if financial information is involved.",
            "Change passwords if account information may have been exposed.",
            "Report the suspected fraud through appropriate official channels."
        ],
        adviceUr: [
            "فوری طور پر رقم یا ذاتی معلومات بھیجنا بند کر دیں۔",
            "اسکرین شاٹس، لین دین کی تفصیلات اور پیغامات محفوظ کریں۔",
            "اگر مالی معلومات شامل ہیں تو متعلقہ بینک یا سروس فراہم کنندہ سے رابطہ کریں۔",
            "اگر اکاؤنٹ معلومات ظاہر ہوئی ہوں تو پاس ورڈ تبدیل کریں۔",
            "مشتبہ فراڈ کی رپورٹ متعلقہ سرکاری ذرائع سے کریں۔"
        ]
    },

    {
        id: "domestic",
        titleEn: "Domestic Violence Guidance",
        titleUr: "گھریلو تشدد کی رہنمائی",
        keywords: [
            "domestic", "husband", "wife", "spouse", "beat", "beaten",
            "abuse", "abusive", "violence", "مار", "تشدد", "شوہر", "بیوی"
        ],
        adviceEn: [
            "Your immediate safety should come first.",
            "Move to a safer place if you can do so safely.",
            "Contact a trusted person or emergency service when there is immediate danger.",
            "Keep evidence of incidents only when doing so does not increase your risk.",
            "Consider contacting a qualified support or legal professional for situation-specific advice."
        ],
        adviceUr: [
            "آپ کی فوری حفاظت کو سب سے زیادہ ترجیح دی جانی چاہیے۔",
            "اگر ممکن ہو تو محفوظ طریقے سے کسی محفوظ جگہ چلے جائیں۔",
            "فوری خطرے کی صورت میں کسی قابل اعتماد شخص یا ایمرجنسی سروس سے رابطہ کریں۔",
            "واقعات کے ثبوت صرف اسی صورت میں محفوظ کریں جب یہ خطرہ نہ بڑھائے۔",
            "اپنی صورتحال کے لیے قابل معاون یا قانونی پیشہ ور سے رابطہ کرنے پر غور کریں۔"
        ]
    },

    {
        id: "cyber",
        titleEn: "Cybercrime / Online Safety Guidance",
        titleUr: "سائبر جرائم / آن لائن حفاظت کی رہنمائی",
        keywords: [
            "cyber", "hack", "hacked", "online", "account", "password",
            "social media", "blackmail", "extortion", "photos leaked",
            "سائبر", "ہیک", "بلیک میل"
        ],
        adviceEn: [
            "Change important passwords and enable stronger account security.",
            "Save screenshots and account activity that may be relevant.",
            "Do not share verification codes or passwords.",
            "Report suspicious accounts or content to the relevant platform.",
            "Seek appropriate cybercrime or legal support if necessary."
        ],
        adviceUr: [
            "اہم پاس ورڈ تبدیل کریں اور اکاؤنٹ کی حفاظت مضبوط کریں۔",
            "اسکرین شاٹس اور متعلقہ اکاؤنٹ سرگرمی محفوظ کریں۔",
            "تصدیقی کوڈ یا پاس ورڈ کسی کے ساتھ شیئر نہ کریں۔",
            "مشتبہ اکاؤنٹس یا مواد کی رپورٹ متعلقہ پلیٹ فارم کو کریں۔",
            "ضرورت پڑنے پر سائبر کرائم یا قانونی مدد حاصل کریں۔"
        ]
    },

    {
        id: "assault",
        titleEn: "Physical Assault Guidance",
        titleUr: "جسمانی حملے کی رہنمائی",
        keywords: [
            "assault", "attacked", "hit me", "beaten up", "fight",
            "injured", "injury", "حملہ", "زخمی"
        ],
        adviceEn: [
            "Seek medical attention first if you are injured.",
            "Get a medical examination and report documented, even for minor injuries.",
            "Photograph visible injuries as soon as it is safe to do so.",
            "Note the time, place and any witnesses to the incident.",
            "Report the assault to the appropriate authority when you are able."
        ],
        adviceUr: [
            "اگر زخمی ہیں تو سب سے پہلے طبی امداد حاصل کریں۔",
            "معمولی زخموں کی صورت میں بھی طبی معائنہ اور رپورٹ درج کروائیں۔",
            "جیسے ہی محفوظ ہو، نظر آنے والے زخموں کی تصاویر بنائیں۔",
            "واقعے کا وقت، جگہ اور کسی گواہ کا نوٹ رکھیں۔",
            "جب ممکن ہو حملے کی رپورٹ متعلقہ ادارے کو کریں۔"
        ]
    },

    {
        id: "missing",
        titleEn: "Missing Person Guidance",
        titleUr: "لاپتہ شخص کی رہنمائی",
        keywords: [
            "missing person", "disappeared", "not found", "went missing",
            "لاپتہ", "غائب"
        ],
        adviceEn: [
            "Contact the police or relevant authority as soon as possible; do not wait.",
            "Gather a recent photo and a description of the person, including clothing.",
            "Note the last known location, time and any people they were with.",
            "Check hospitals and known contacts if it is safe to do so.",
            "Keep a written timeline of your search and any information received."
        ],
        adviceUr: [
            "جلد از جلد پولیس یا متعلقہ ادارے سے رابطہ کریں، انتظار نہ کریں۔",
            "شخص کی حالیہ تصویر اور حلیہ، بشمول لباس، جمع کریں۔",
            "آخری معلوم مقام، وقت اور ساتھ موجود افراد نوٹ کریں۔",
            "اگر محفوظ ہو تو ہسپتالوں اور معلوم رابطوں کی جانچ کریں۔",
            "اپنی تلاش اور موصول ہونے والی معلومات کا تحریری ریکارڈ رکھیں۔"
        ]
    },

    {
        id: "workplace",
        titleEn: "Workplace Issue Guidance",
        titleUr: "دفتری مسئلے کی رہنمائی",
        keywords: [
            "workplace", "boss", "employer", "salary", "fired", "job",
            "colleague", "office", "دفتر", "ملازمت", "تنخواہ"
        ],
        adviceEn: [
            "Keep a written record of incidents, including dates and people involved.",
            "Save relevant emails, messages or documents from work.",
            "Review your employment contract and any workplace policies that apply.",
            "Consider raising the issue through HR or an appropriate internal channel.",
            "Seek qualified legal or labour-rights advice for your specific situation."
        ],
        adviceUr: [
            "واقعات کا تحریری ریکارڈ رکھیں، بشمول تاریخ اور شامل افراد۔",
            "کام سے متعلق اہم ای میلز، پیغامات یا دستاویزات محفوظ کریں۔",
            "اپنے ملازمت کے معاہدے اور متعلقہ دفتری پالیسیوں کا جائزہ لیں۔",
            "معاملہ ایچ آر یا مناسب اندرونی ذریعے سے اٹھانے پر غور کریں۔",
            "اپنی صورتحال کے لیے قابل قانونی یا لیبر رائٹس مشورہ حاصل کریں۔"
        ]
    },

    {
        id: "property",
        titleEn: "Property / Land Dispute Guidance",
        titleUr: "زمین / جائیداد کے تنازع کی رہنمائی",
        keywords: [
            "property", "land", "house dispute", "inheritance", "possession",
            "زمین", "جائیداد", "وراثت"
        ],
        adviceEn: [
            "Gather all ownership documents, deeds and records related to the property.",
            "Note the timeline of the dispute, including who is involved.",
            "Avoid taking physical action to occupy or block access to the property.",
            "Keep copies of any correspondence about the dispute.",
            "Consult a qualified property or legal professional for your specific case."
        ],
        adviceUr: [
            "جائیداد سے متعلق تمام ملکیتی دستاویزات اور ریکارڈ جمع کریں۔",
            "تنازع کی ٹائم لائن نوٹ کریں، بشمول شامل افراد۔",
            "جائیداد پر قبضے یا رسائی روکنے کی جسمانی کوشش سے گریز کریں۔",
            "تنازع سے متعلق کسی بھی خط و کتابت کی کاپیاں رکھیں۔",
            "اپنے مخصوص کیس کے لیے قابل جائیداد یا قانونی پیشہ ور سے مشورہ کریں۔"
        ]
    },

    {
        id: "custody",
        titleEn: "Family / Custody Guidance",
        titleUr: "خاندانی / حضانت کی رہنمائی",
        keywords: [
            "custody", "divorce", "children", "child support", "family court",
            "طلاق", "بچوں کی تحویل"
        ],
        adviceEn: [
            "Keep records of communication and arrangements regarding the children.",
            "Prioritize the children's safety and wellbeing in any decision.",
            "Gather relevant documents such as marriage, birth and financial records.",
            "Avoid actions that could be seen as endangering or isolating a child.",
            "Consult a qualified family-law professional for guidance specific to your case."
        ],
        adviceUr: [
            "بچوں سے متعلق رابطوں اور انتظامات کا ریکارڈ رکھیں۔",
            "کسی بھی فیصلے میں بچوں کی حفاظت اور بہبود کو ترجیح دیں۔",
            "شادی، پیدائش اور مالی ریکارڈ جیسی متعلقہ دستاویزات جمع کریں۔",
            "ایسے اقدامات سے گریز کریں جو بچے کو خطرے میں ڈالنے یا الگ تھلگ کرنے کے مترادف ہوں۔",
            "اپنے کیس کے لیے قابل فیملی لاء پیشہ ور سے رہنمائی حاصل کریں۔"
        ]
    }

];


function generateAiAnswer(question, language) {

    const q =
        question.toLowerCase();


    let bestTopic = null;

    let bestScore = 0;


    aiGuideTopics.forEach(function(topic) {

        let score = 0;

        topic.keywords.forEach(function(keyword) {

            if (q.includes(keyword.toLowerCase())) {

                score += 1;

            }

        });


        if (score > bestScore) {

            bestScore = score;

            bestTopic = topic;

        }

    });


    let title;

    let advice;


    if (bestTopic) {

        title =
            language === "ur"
                ? bestTopic.titleUr
                : bestTopic.titleEn;


        advice =
            language === "ur"
                ? bestTopic.adviceUr
                : bestTopic.adviceEn;

    }

    else {

        title =
            language === "ur"
                ? "سادہ رہنمائی"
                : "General Guidance";


        advice =
            language === "ur"
                ? [
                    "سب سے پہلے اپنی فوری حفاظت کو ترجیح دیں۔",
                    "واقعے کی اہم تفصیلات، تاریخ، وقت اور جگہ لکھ لیں۔",
                    "اگر محفوظ ہو تو متعلقہ پیغامات، تصاویر یا دیگر ثبوت محفوظ کریں۔",
                    "کسی قابل اعتماد شخص سے مدد حاصل کرنے پر غور کریں۔",
                    "فوری خطرے کی صورت میں مناسب ایمرجنسی سروس سے رابطہ کریں۔"
                ]
                : [
                    "First identify whether there is any immediate safety risk.",
                    "Write down the important facts, including what happened, when and where.",
                    "Keep relevant evidence such as messages, documents, photos or videos if it is safe.",
                    "Use Report a Case to organize your information.",
                    "For specific legal advice, consider contacting a qualified professional."
                ];

    }


    const introEn =
        bestTopic
            ? `Based on the topic in your question ("${escapeHTML(question)}"):`
            : `We couldn't match a specific topic to your question ("${escapeHTML(question)}"), so here is general guidance:`;


    const introUr =
        bestTopic
            ? `آپ کے سوال ("${escapeHTML(question)}") کے موضوع کی بنیاد پر:`
            : `آپ کے سوال ("${escapeHTML(question)}") سے کوئی مخصوص موضوع میل نہیں کھایا، اس لیے یہ عمومی رہنمائی ہے:`;


    return `

        <h2>
            🤖 ${title}
        </h2>

        <p>
            ${language === "ur" ? introUr : introEn}
        </p>

        <ul>

            ${advice.map(function(item) {

                return `<li>${item}</li>`;

            }).join("")}

        </ul>

        <hr>

        <small>
            Justice Now provides general guidance and does not replace emergency services or professional legal advice.
        </small>

    `;

}


document.getElementById("askAiButton")
.addEventListener("click", function() {

    const question =
        document.getElementById(
            "aiQuestion"
        )
        .value
        .trim();


    const language =
        document.getElementById(
            "aiLanguageSelect"
        )
        .value;


    if (!question) {

        document.getElementById(
            "aiAnswerBox"
        )
        .innerHTML =
        "<p>Please ask a question first.</p>";

        return;

    }


    document.getElementById(
        "aiAnswerBox"
    )
    .innerHTML =
    generateAiAnswer(
        question,
        language
    );

});



/* VOICE SEARCH */

document.getElementById("voiceSearchButton")
.addEventListener("click", function() {

    const SpeechRecognition =
        window.SpeechRecognition
        ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        document.getElementById(
            "aiLanguageSelect"
        ).value === "ur"

        ?

        "ur-PK"

        :

        "en-US";


    recognition.start();


    recognition.onresult =
    function(event) {

        document.getElementById(
            "aiQuestion"
        )
        .value =
        event.results[0][0]
        .transcript;

    };

});




/* ==========================================
   JUSTICE HUB - COMPLETE
========================================== */

let documentCameraStream = null;
let voiceReportRecognition = null;


/* ---------- ACCORDION ---------- */

document.querySelectorAll(".hub-header")
.forEach(function(button) {

    button.addEventListener("click", function() {

        const content =
            button.nextElementSibling;

        content.classList.toggle("hidden");

        const arrow =
            button.querySelector(".hub-arrow");

        if (arrow) {

            arrow.textContent =
                content.classList.contains("hidden")
                    ? "⌄"
                    : "⌃";

        }

    });

});


/* ==========================================
   1. HEARING & DEADLINE REMINDER
========================================== */

function getReminders() {

    return JSON.parse(
        localStorage.getItem("justiceReminders")
        || "[]"
    );

}


function saveReminders(reminders) {

    localStorage.setItem(
        "justiceReminders",
        JSON.stringify(reminders)
    );

}


function renderReminders() {

    const list =
        document.getElementById("reminderList");

    if (!list) return;


    const reminders =
        getReminders();


    if (reminders.length === 0) {

        list.innerHTML =
            "<p>No reminders added yet.</p>";

        return;

    }


    list.innerHTML =
        reminders.map(function(reminder, index) {

            return `
                <div class="hub-saved-item">

                    <strong>
                        ${escapeHTML(reminder.title)}
                    </strong>

                    <small>
                        ${reminder.date}
                        •
                        ${escapeHTML(reminder.time)}
                    </small>

                    <button
                        type="button"
                        onclick="deleteJusticeReminder(${index})"
                    >
                        🗑 Delete
                    </button>

                </div>
            `;

        }).join("");

}


document.getElementById("saveReminderButton")
.addEventListener("click", function() {

    const title =
        document.getElementById("reminderTitle")
        .value
        .trim();

    const date =
        document.getElementById("reminderDate")
        .value;

    const time =
        document.getElementById("reminderTime")
        .value;


    if (!title || !date) {

        alert(
            "Please enter a title and date."
        );

        return;

    }


    const reminders =
        getReminders();


    reminders.push({

        title: title,
        date: date,
        time: time,
        createdAt:
            new Date().toISOString()

    });


    saveReminders(reminders);


    document.getElementById(
        "reminderTitle"
    ).value = "";


    document.getElementById(
        "reminderDate"
    ).value = "";


    renderReminders();

});


function deleteJusticeReminder(index) {

    const reminders =
        getReminders();


    reminders.splice(index, 1);


    saveReminders(reminders);


    renderReminders();

}


window.deleteJusticeReminder =
    deleteJusticeReminder;


/* ==========================================
   2. CASE TIMELINE
========================================== */

function getTimeline() {

    return JSON.parse(
        localStorage.getItem("justiceTimeline")
        || "[]"
    );

}


function renderTimeline() {

    const list =
        document.getElementById("timelineList");

    if (!list) return;


    const events =
        getTimeline();


    if (events.length === 0) {

        list.innerHTML =
            "<p>No case timeline events added.</p>";

        return;

    }


    list.innerHTML =
        events.map(function(event, index) {

            return `
                <div class="hub-saved-item">

                    <strong>
                        ${escapeHTML(event.title)}
                    </strong>

                    <small>
                        ${event.date}
                    </small>

                    <button
                        type="button"
                        onclick="deleteTimelineEvent(${index})"
                    >
                        🗑 Delete
                    </button>

                </div>
            `;

        }).join("");

}


document.getElementById("addTimelineButton")
.addEventListener("click", function() {

    const title =
        document.getElementById(
            "timelineEvent"
        )
        .value
        .trim();


    if (!title) {

        alert(
            "Please enter a case event."
        );

        return;

    }


    const events =
        getTimeline();


    events.push({

        title: title,

        date:
            new Date()
            .toLocaleString()

    });


    localStorage.setItem(
        "justiceTimeline",
        JSON.stringify(events)
    );


    document.getElementById(
        "timelineEvent"
    ).value = "";


    renderTimeline();

});


function deleteTimelineEvent(index) {

    const events =
        getTimeline();


    events.splice(index, 1);


    localStorage.setItem(
        "justiceTimeline",
        JSON.stringify(events)
    );


    renderTimeline();

}


window.deleteTimelineEvent =
    deleteTimelineEvent;


/* ==========================================
   3. DOCUMENT SCANNER
========================================== */

document.getElementById(
    "openDocumentCameraButton"
)
.addEventListener(
    "click",
    async function() {

        const video =
            document.getElementById(
                "documentCameraVideo"
            );


        try {

            documentCameraStream =
                await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        facingMode:
                            "environment"

                    },

                    audio: false

                });


            video.srcObject =
                documentCameraStream;


            video.classList.remove(
                "hidden"
            );


            document.getElementById(
                "captureDocumentButton"
            )
            .classList.remove(
                "hidden"
            );


            document.getElementById(
                "stopDocumentCameraButton"
            )
            .classList.remove(
                "hidden"
            );

        }

        catch (error) {

            alert(
                "Camera could not be opened. Please allow camera permission."
            );

        }

    }
);


document.getElementById(
    "captureDocumentButton"
)
.addEventListener(
    "click",
    function() {

        const video =
            document.getElementById(
                "documentCameraVideo"
            );


        const canvas =
            document.getElementById(
                "documentCanvas"
            );


        const preview =
            document.getElementById(
                "documentPreview"
            );


        canvas.width =
            video.videoWidth;


        canvas.height =
            video.videoHeight;


        const context =
            canvas.getContext("2d");


        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );


        preview.src =
            canvas.toDataURL(
                "image/png"
            );


        preview.classList.remove(
            "hidden"
        );


        localStorage.setItem(
            "justiceScannedDocument",
            preview.src
        );


        alert(
            "Document captured successfully."
        );

    }
);


function stopDocumentCamera() {

    if (documentCameraStream) {

        documentCameraStream
        .getTracks()
        .forEach(function(track) {

            track.stop();

        });


        documentCameraStream =
            null;

    }


    const video =
        document.getElementById(
            "documentCameraVideo"
        );


    if (video) {

        video.srcObject =
            null;

        video.classList.add(
            "hidden"
        );

    }


    document.getElementById(
        "captureDocumentButton"
    )
    .classList.add(
        "hidden"
    );


    document.getElementById(
        "stopDocumentCameraButton"
    )
    .classList.add(
        "hidden"
    );

}


document.getElementById(
    "stopDocumentCameraButton"
)
.addEventListener(
    "click",
    stopDocumentCamera
);


document.getElementById(
    "documentFileInput"
)
.addEventListener(
    "change",
    function() {

        const files =
            Array.from(
                this.files
            );


        const list =
            document.getElementById(
                "documentFileList"
            );


        if (files.length === 0) {

            list.innerHTML = "";

            return;

        }


        list.innerHTML =
            files.map(function(file) {

                return `
                    <div class="hub-saved-item">
                        📄 ${escapeHTML(file.name)}
                    </div>
                `;

            })
            .join("");

    }
);


document.getElementById(
    "saveDocumentToEvidenceButton"
)
.addEventListener(
    "click",
    function() {

        const count =
            Number(
                localStorage.getItem(
                    "justiceDocumentCount"
                )
                || 0
            );


        localStorage.setItem(
            "justiceDocumentCount",
            String(count + 1)
        );


        alert(
            "Document saved to Evidence Vault."
        );

    }
);


/* ==========================================
   4. VOICE REPORT
========================================== */

document.getElementById(
    "startVoiceReportButton"
)
.addEventListener(
    "click",
    function() {

        const SpeechRecognition =
            window.SpeechRecognition
            ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            alert(
                "Voice recognition is not supported in this browser."
            );

            return;

        }


        voiceReportRecognition =
            new SpeechRecognition();


        voiceReportRecognition.lang =
            document.getElementById(
                "voiceReportLanguage"
            )
            .value;


        voiceReportRecognition.continuous =
            true;


        voiceReportRecognition.interimResults =
            false;


        voiceReportRecognition.onresult =
            function(event) {

                let text = "";


                for (
                    let i =
                        event.resultIndex;

                    i <
                        event.results.length;

                    i++
                ) {

                    text +=
                        event.results[i][0]
                        .transcript
                        + " ";

                }


                document.getElementById(
                    "voiceReportText"
                )
                .value += text;

            };


        voiceReportRecognition.start();


        document.getElementById(
            "startVoiceReportButton"
        )
        .classList.add(
            "hidden"
        );


        document.getElementById(
            "stopVoiceReportButton"
        )
        .classList.remove(
            "hidden"
        );

    }
);


document.getElementById(
    "stopVoiceReportButton"
)
.addEventListener(
    "click",
    function() {

        if (
            voiceReportRecognition
        ) {

            voiceReportRecognition.stop();

        }


        document.getElementById(
            "startVoiceReportButton"
        )
        .classList.remove(
            "hidden"
        );


        document.getElementById(
            "stopVoiceReportButton"
        )
        .classList.add(
            "hidden"
        );

    }
);


document.getElementById(
    "clearVoiceReportButton"
)
.addEventListener(
    "click",
    function() {

        document.getElementById(
            "voiceReportText"
        )
        .value = "";

    }
);


document.getElementById(
    "sendVoiceReportButton"
)
.addEventListener(
    "click",
    function() {

        const text =
            document.getElementById(
                "voiceReportText"
            )
            .value
            .trim();


        if (!text) {

            alert(
                "Please record your report first."
            );

            return;

        }


        localStorage.setItem(
            "justiceVoiceReport",
            text
        );


        alert(
            "Voice report saved. You can use it in Report a Case."
        );

    }
);


/* ==========================================
   5. QUICK EXIT / PRIVACY MODE
========================================== */

document.getElementById(
    "quickExitButton"
)
.addEventListener(
    "click",
    function() {

        showPage(
            "home"
        );

    }
);


document.getElementById(
    "privacyModeButton"
)
.addEventListener(
    "click",
    function() {

        document.body
        .classList.add(
            "privacy-mode"
        );


        alert(
            "Privacy mode is active."
        );

    }
);


document.getElementById(
    "normalScreenButton"
)
.addEventListener(
    "click",
    function() {

        document.body
        .classList.remove(
            "privacy-mode"
        );


        alert(
            "Normal screen restored."
        );

    }
);


/* ==========================================
   6. SMART NOTIFICATIONS
========================================== */

document.getElementById(
    "saveSmartNotificationsButton"
)
.addEventListener(
    "click",
    async function() {

        const selected =
            Array.from(
                document.querySelectorAll(
                    ".smart-notification:checked"
                )
            )
            .map(function(item) {

                return item.value;

            });


        localStorage.setItem(
            "justiceSmartNotifications",
            JSON.stringify(selected)
        );


        if (
            "Notification"
            in window
        ) {

            if (
                Notification.permission
                === "default"
            ) {

                await Notification
                .requestPermission();

            }

        }


        alert(
            "Smart notification settings saved."
        );

    }
);


/* ==========================================
   7. ANONYMOUS REPORT
========================================== */

document.getElementById(
    "saveAnonymousSettingButton"
)
.addEventListener(
    "click",
    function() {

        const selected =
            document.querySelector(
                'input[name="anonymousMode"]:checked'
            );


        if (!selected) return;


        localStorage.setItem(
            "justiceAnonymousMode",
            selected.value
        );


        document.getElementById(
            "anonymousStatus"
        )
        .textContent =
            selected.value === "hide"
                ? "Your report preference is set to hide your identity."
                : "Your report preference is set to show your identity.";

    }
);


/* ==========================================
   8. LAWYER CONSULTATION REQUEST
========================================== */

document.getElementById(
    "sendConsultationRequestButton"
)
.addEventListener(
    "click",
    function() {

        const caseType =
            document.getElementById(
                "consultationCaseType"
            )
            .value
            .trim();


        const city =
            document.getElementById(
                "consultationCity"
            )
            .value
            .trim();


        const language =
            document.getElementById(
                "consultationLanguage"
            )
            .value;


        const type =
            document.getElementById(
                "consultationType"
            )
            .value;


        if (
            !caseType ||
            !city ||
            !language ||
            !type
        ) {

            alert(
                "Please complete all consultation details."
            );

            return;

        }


        const request = {

            caseType:
                caseType,

            city:
                city,

            language:
                language,

            type:
                type,

            createdAt:
                new Date()
                .toISOString()

        };


        localStorage.setItem(
            "justiceLawyerRequest",
            JSON.stringify(request)
        );


        document.getElementById(
            "consultationStatus"
        )
        .textContent =
            "Consultation request saved successfully.";

    }
);


/* ==========================================
   9. MY JUSTICE DASHBOARD
========================================== */

function updateJusticeDashboard() {

    const cases =
        JSON.parse(
            localStorage.getItem(
                "justiceCases"
            )
            || "[]"
        );


    const openCases =
        cases.filter(function(item) {

            return item.status === "open";

        }).length;


    const pendingCases =
        cases.filter(function(item) {

            return item.status === "pending";

        }).length;


    const closedCases =
        cases.filter(function(item) {

            return item.status === "closed";

        }).length;


    const evidenceFiles =
        Number(
            localStorage.getItem(
                "justiceDocumentCount"
            )
            || 0
        );


    const hearings =
        getReminders()
        .filter(function(item) {

            return new Date(
                item.date
            ) >= new Date();

        })
        .length;


    document.getElementById(
        "dashboardOpenCases"
    )
    .textContent =
        openCases;


    document.getElementById(
        "dashboardPendingCases"
    )
    .textContent =
        pendingCases;


    document.getElementById(
        "dashboardClosedCases"
    )
    .textContent =
        closedCases;


    document.getElementById(
        "dashboardEvidenceFiles"
    )
    .textContent =
        evidenceFiles;


    document.getElementById(
        "dashboardHearings"
    )
    .textContent =
        hearings;

}


document.getElementById(
    "refreshJusticeDashboardButton"
)
.addEventListener(
    "click",
    updateJusticeDashboard
);


/* INITIALIZE JUSTICE HUB */

renderReminders();
renderTimeline();
updateJusticeDashboard();
/* ==================================================
   FREE LEGAL AID DIRECTORY
================================================== */


/*
   IMPORTANT:

   We do NOT invent phone numbers.

   Only verified contacts are placed in
   the contact field.

   If a local contact is unavailable,
   the app uses a verified national
   legal-aid helpline.
*/


const legalAidDirectory = {


    /* ==========================================
       PUNJAB
    ========================================== */

    "Punjab": {

        "Attock": [
            "Attock",
            "Fateh Jang",
            "Hasan Abdal",
            "Hazro",
            "Jand",
            "Pindi Gheb"
        ],

        "Bahawalnagar": [
            "Bahawalnagar",
            "Chishtian",
            "Fort Abbas",
            "Haroonabad",
            "Minchinabad"
        ],

        "Bahawalpur": [
            "Bahawalpur",
            "Ahmadpur East",
            "Hasilpur",
            "Khairpur Tamewali",
            "Yazman"
        ],

        "Faisalabad": [
            "Faisalabad City",
            "Faisalabad Sadar",
            "Jaranwala",
            "Samundri",
            "Tandlianwala"
        ],

        "Lahore": [
            "Lahore City",
            "Lahore Cantt",
            "Model Town",
            "Raiwind"
        ],

        "Layyah": [
            "Layyah",
            "Karor Lal Esan",
            "Choubara"
        ],

        "Lodhran": [
            "Lodhran",
            "Dunyapur",
            "Kahror Pacca"
        ],

        "Nankana Sahib": [
            "Nankana Sahib",
            "Sangla Hill",
            "Shahkot"
        ]

    },


    /* ==========================================
       SINDH
    ========================================== */

    "Sindh": {

        "Karachi Central": [
            "New Karachi",
            "North Nazimabad",
            "Gulberg",
            "Liaquatabad"
        ],

        "Karachi East": [
            "Gulshan",
            "Jamshed",
            "Ferozabad"
        ],

        "Karachi South": [
            "Saddar",
            "Lyari",
            "Civil Lines"
        ],

        "Karachi West": [
            "Orangi",
            "Baldia",
            "Manghopir"
        ],

        "Hyderabad": [
            "Hyderabad City",
            "Latifabad",
            "Qasimabad"
        ],

        "Dadu": [
            "Dadu",
            "Johi",
            "Khairpur Nathan Shah",
            "Mehar"
        ],

        "Sukkur": [
            "Sukkur",
            "New Sukkur",
            "Pano Aqil",
            "Rohri"
        ],

        "Larkana": [
            "Larkana",
            "Dokri",
            "Ratodero"
        ],

        "Khairpur": [
            "Khairpur",
            "Gambat",
            "Kingri",
            "Kot Diji"
        ]

    },


    /* ==========================================
       KHYBER PAKHTUNKHWA
    ========================================== */

    "Khyber Pakhtunkhwa": {

        "Peshawar": [
            "Peshawar",
            "Chamkani",
            "Hassan Khel",
            "Mathra"
        ],

        "Abbottabad": [
            "Abbottabad",
            "Havelian",
            "Lora"
        ],

        "Mardan": [
            "Mardan",
            "Katlang",
            "Takht Bhai"
        ],

        "Kohat": [
            "Kohat",
            "Lachi",
            "Dara Adam Khel"
        ],

        "Haripur": [
            "Haripur",
            "Ghazi",
            "Khanpur"
        ],

        "Swat": [
            "Babuzai",
            "Kabal",
            "Matta",
            "Khwazakhela"
        ]

    },


    /* ==========================================
       BALOCHISTAN
    ========================================== */

    "Balochistan": {

        "Quetta": [
            "Quetta City",
            "Sadar",
            "Chiltan"
        ],

        "Gwadar": [
            "Gwadar",
            "Pasni",
            "Ormara",
            "Jiwani"
        ],

        "Khuzdar": [
            "Khuzdar",
            "Nal",
            "Wadh"
        ],

        "Sibi": [
            "Sibi",
            "Lehri"
        ],

        "Turbat / Kech": [
            "Turbat",
            "Buleda",
            "Dasht",
            "Mand"
        ]

    },


    /* ==========================================
       ISLAMABAD
    ========================================== */

    "Islamabad Capital Territory": {

        "Islamabad": [
            "Islamabad",
            "Rural Islamabad"
        ]

    },


    /* ==========================================
       GILGIT-BALTISTAN
    ========================================== */

    "Gilgit-Baltistan": {

        "Gilgit": [
            "Gilgit"
        ],

        "Skardu": [
            "Skardu"
        ],

        "Diamer": [
            "Chilas"
        ],

        "Ghizer": [
            "Gahkuch"
        ],

        "Hunza": [
            "Aliabad"
        ],

        "Nagar": [
            "Nagar"
        ]

    },


    /* ==========================================
       AZAD JAMMU & KASHMIR
    ========================================== */

    "Azad Jammu and Kashmir": {

        "Muzaffarabad": [
            "Muzaffarabad",
            "Patikka"
        ],

        "Mirpur": [
            "Mirpur",
            "Dadyal"
        ],

        "Poonch": [
            "Rawalakot",
            "Hajira"
        ],

        "Bagh": [
            "Bagh",
            "Dhirkot"
        ],

        "Kotli": [
            "Kotli",
            "Sehnsa",
            "Fatehpur Thakyala"
        ]

    }

};


/* ==================================================
   VERIFIED CONTACTS
================================================== */

const verifiedLegalContacts = {

    nationwide: {

        provider:
            "Ministry of Human Rights",

        phone:
            "1099"
    },


    laja: {

        provider:
            "Legal Aid & Justice Authority",

        phone:
            "0519201790"
    },


    sindh: {

        provider:
            "Sindh Legal Advisory Call Center",

        phone:
            "080070806"
    },


    kpk: {

        provider:
            "KP Directorate General of Law & Human Rights",

        phone:
            "080011180"
    },


    kpkOffice: {

        provider:
            "KP Directorate General of Law & Human Rights",

        phone:
            "0919217203"
    },


    punjabLodhran: {

        provider:
            "DSP Legal, DPO Office Lodhran",

        phone:
            "06089200064"
    },


    punjabNankana: {

        provider:
            "District Public Prosecutor, Nankana Sahib",

        phone:
            "0562877196"
    },


    sindhKhairpur: {

        provider:
            "Legal Aid Society, Khairpur Office",

        phone:
            "0243686022"
    },


    sindhDadu: {

        provider:
            "Legal Aid Society, Dadu Office",

        phone:
            "0254610050"
    },


    sindhSukkur: {

        provider:
            "Legal Aid Society, Sukkur Office",

        phone:
            "0715807215"
    },


    sindhLarkana: {

        provider:
            "Legal Aid Society, Larkana Office",

        phone:
            "0744756029"
    },


    sindhSBA: {

        provider:
            "Legal Aid Society, Shaheed Benazirabad Office",

        phone:
            "0244381379"
    },


    sindhSanghar: {

        provider:
            "Legal Aid Society, Sanghar Office",

        phone:
            "0235541181"
    },


    sindhHyderabad: {

        provider:
            "Legal Aid Society, Hyderabad Office",

        phone:
            "0222720042"
    }

};


/* ==================================================
   OPEN PAGE
================================================== */

function openFreeLegalAid() {

    showPage("freeLegalAidPage");

    resetLegalAid();

}


/* ==================================================
   LOAD DISTRICTS
================================================== */

function loadDistricts() {

    const province =
        document.getElementById(
            "provinceSelect"
        ).value;


    const districtSelect =
        document.getElementById(
            "districtSelect"
        );


    const tehsilSelect =
        document.getElementById(
            "tehsilSelect"
        );


    districtSelect.innerHTML =
        '<option value="">Select District</option>';


    tehsilSelect.innerHTML =
        '<option value="">Select Tehsil</option>';


    districtSelect.disabled = true;

    tehsilSelect.disabled = true;


    document
        .getElementById("legalAidResult")
        .classList.add("hidden");


    if (
        !province ||
        !legalAidDirectory[province]
    ) {

        return;

    }


    const districts =
        Object.keys(
            legalAidDirectory[province]
        );


    districts.forEach(function(district) {

        const option =
            document.createElement("option");


        option.value =
            district;


        option.textContent =
            district;


        districtSelect.appendChild(
            option
        );

    });


    districtSelect.disabled = false;

}


/* ==================================================
   LOAD TEHSILS
================================================== */

function loadTehsils() {

    const province =
        document.getElementById(
            "provinceSelect"
        ).value;


    const district =
        document.getElementById(
            "districtSelect"
        ).value;


    const tehsilSelect =
        document.getElementById(
            "tehsilSelect"
        );


    tehsilSelect.innerHTML =
        '<option value="">Select Tehsil</option>';


    tehsilSelect.disabled = true;


    document
        .getElementById("legalAidResult")
        .classList.add("hidden");


    if (
        !province ||
        !district ||
        !legalAidDirectory[province] ||
        !legalAidDirectory[province][district]
    ) {

        return;

    }


    const tehsils =
        legalAidDirectory[province][district];


    tehsils.forEach(function(tehsil) {

        const option =
            document.createElement("option");


        option.value =
            tehsil;


        option.textContent =
            tehsil;


        tehsilSelect.appendChild(
            option
        );

    });


    tehsilSelect.disabled = false;

}


/* ==================================================
   FIND VERIFIED CONTACT
================================================== */

function findVerifiedContact(
    province,
    district,
    tehsil
) {


    /*
       Punjab
    */

    if (
        province === "Punjab" &&
        district === "Lodhran"
    ) {

        return verifiedLegalContacts
            .punjabLodhran;

    }


    if (
        province === "Punjab" &&
        district === "Nankana Sahib"
    ) {

        return verifiedLegalContacts
            .punjabNankana;

    }


    /*
       Sindh
    */

    if (province === "Sindh") {

        if (district === "Khairpur") {

            return verifiedLegalContacts
                .sindhKhairpur;

        }

        if (district === "Dadu") {

            return verifiedLegalContacts
                .sindhDadu;

        }

        if (district === "Sukkur") {

            return verifiedLegalContacts
                .sindhSukkur;

        }

        if (district === "Larkana") {

            return verifiedLegalContacts
                .sindhLarkana;

        }

        if (
            district ===
            "Shaheed Benazirabad"
        ) {

            return verifiedLegalContacts
                .sindhSBA;

        }

        if (district === "Sanghar") {

            return verifiedLegalContacts
                .sindhSanghar;

        }

        if (district === "Hyderabad") {

            return verifiedLegalContacts
                .sindhHyderabad;

        }

        return verifiedLegalContacts
            .sindh;

    }


    /*
       KP
    */

    if (
        province ===
        "Khyber Pakhtunkhwa"
    ) {

        return verifiedLegalContacts
            .kpk;

    }


    /*
       All other areas
    */

    return verifiedLegalContacts
        .nationwide;

}


/* ==================================================
   SHOW CONTACT
================================================== */

function showLegalAidContact() {

    const province =
        document.getElementById(
            "provinceSelect"
        ).value;


    const district =
        document.getElementById(
            "districtSelect"
        ).value;


    const tehsil =
        document.getElementById(
            "tehsilSelect"
        ).value;


    const result =
        document.getElementById(
            "legalAidResult"
        );


    const location =
        document.getElementById(
            "aidLocation"
        );


    const provider =
        document.getElementById(
            "aidProvider"
        );


    const contact =
        document.getElementById(
            "aidContact"
        );


    const callButton =
        document.getElementById(
            "aidCallButton"
        );


    if (
        !province ||
        !district ||
        !tehsil
    ) {

        result.classList.add(
            "hidden"
        );

        return;

    }


    const selectedContact =
        findVerifiedContact(
            province,
            district,
            tehsil
        );


    location.textContent =
        `📍 ${tehsil}, ${district}, ${province}`;


    provider.textContent =
        `⚖️ ${selectedContact.provider}`;


    contact.textContent =
        `📞 ${formatPhone(
            selectedContact.phone
        )}`;


    callButton.onclick =
        function() {

            callNumber(
                selectedContact.phone
            );

        };


    result.classList.remove(
        "hidden"
    );

}


/* ==================================================
   FORMAT PHONE
================================================== */

function formatPhone(number) {

    if (number === "1099") {

        return "1099";

    }


    if (number === "0519201790") {

        return "051-9201790";

    }


    if (number === "080070806") {

        return "0800-70806";

    }


    if (number === "080011180") {

        return "0800-11180";

    }


    if (number.startsWith("091")) {

        return "091-" +
            number.substring(3);

    }


    if (number.startsWith("0608")) {

        return "0608-" +
            number.substring(4);

    }


    if (number.startsWith("056")) {

        return "056-" +
            number.substring(3);

    }


    if (number.startsWith("0243")) {

        return "0243-" +
            number.substring(4);

    }


    if (number.startsWith("0254")) {

        return "0254-" +
            number.substring(4);

    }


    if (number.startsWith("071")) {

        return "071-" +
            number.substring(3);

    }


    if (number.startsWith("074")) {

        return "074-" +
            number.substring(3);

    }


    if (number.startsWith("022")) {

        return "022-" +
            number.substring(3);

    }


    if (number.startsWith("0235")) {

        return "0235-" +
            number.substring(4);

    }


    return number;

}


/* ==================================================
   CALL
================================================== */

function callNumber(number) {

    if (!number) {

        return;

    }


    window.location.href =
        "tel:" + number;

}


/* ==================================================
   BACK
================================================== */

function goBackFromLegalAid() {

    showPage("hubPage");

}


/* ==================================================
   RESET
================================================== */

function resetLegalAid() {

    const province =
        document.getElementById(
            "provinceSelect"
        );


    const district =
        document.getElementById(
            "districtSelect"
        );


    const tehsil =
        document.getElementById(
            "tehsilSelect"
        );


    const result =
        document.getElementById(
            "legalAidResult"
        );


    if (!province) {

        return;

    }


    province.value = "";


    district.innerHTML =
        '<option value="">Select District</option>';


    tehsil.innerHTML =
        '<option value="">Select Tehsil</option>';


    district.disabled = true;

    tehsil.disabled = true;


    result.classList.add(
        "hidden"
    );

}

/* ==========================================
   LIVE CHAT
========================================== */

document.getElementById("liveChatTopButton")
.addEventListener("click", function() {

    showPage("chat");

    renderGroups();

    renderMessages();

});


document.getElementById("createGroupButton")
.addEventListener("click", function() {

    const name =
        document.getElementById(
            "groupName"
        )
        .value
        .trim();


    const members =
        document.getElementById(
            "groupMembers"
        )
        .value
        .trim();


    if (!name || !members) {

        alert(
            "Enter group name and members."
        );

        return;

    }


    const groups =
    JSON.parse(
        localStorage.getItem(
            "justiceGroups"
        )
        ||
        "[]"
    );


    groups.push({

        id: Date.now(),

        name: name,

        members:
            members
            .split(",")
            .map(function(member) {

                return member.trim();

            })

    });


    localStorage.setItem(
        "justiceGroups",
        JSON.stringify(groups)
    );


    document.getElementById(
        "groupName"
    )
    .value = "";


    document.getElementById(
        "groupMembers"
    )
    .value = "";


    renderGroups();

});


function renderGroups() {

    const container =
        document.getElementById(
            "groupList"
        );


    const groups =
    JSON.parse(
        localStorage.getItem(
            "justiceGroups"
        )
        ||
        "[]"
    );


    container.innerHTML = "";


    groups.forEach(function(group) {

        container.innerHTML += `

            <div class="group-item">

                <strong>
                    👥 ${group.name}
                </strong>

                <p>
                    ${group.members.join(", ")}
                </p>

            </div>

        `;

    });

}



document.getElementById("sendMessageButton")
.addEventListener("click", sendChatMessage);


document.getElementById("chatMessageInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendChatMessage();

    }

});


function sendChatMessage() {

    const input =
        document.getElementById(
            "chatMessageInput"
        );


    const message =
        input.value
        .trim();


    if (!message) {

        return;

    }


    const messages =
    JSON.parse(
        localStorage.getItem(
            "justiceChat"
        )
        ||
        "[]"
    );


    messages.push({

        id: Date.now(),

        text: message

    });


    localStorage.setItem(
        "justiceChat",
        JSON.stringify(messages)
    );


    input.value = "";


    renderMessages();

}


function renderMessages() {

    const container =
        document.getElementById(
            "chatMessages"
        );


    const messages =
    JSON.parse(
        localStorage.getItem(
            "justiceChat"
        )
        ||
        "[]"
    );


    container.innerHTML = "";


    messages.forEach(function(message, index) {

        container.innerHTML += `

            <div class="chat-message">

                <span>
                    ${message.text}
                </span>

                <button
                    class="delete-message"
                    onclick="deleteMessage(${index})"
                >
                    🗑
                </button>

            </div>

        `;

    });


    container.scrollTop =
    container.scrollHeight;

}


function deleteMessage(index) {

    const messages =
    JSON.parse(
        localStorage.getItem(
            "justiceChat"
        )
        ||
        "[]"
    );


    messages.splice(index, 1);


    localStorage.setItem(
        "justiceChat",
        JSON.stringify(messages)
    );


    renderMessages();

}


window.deleteMessage =
deleteMessage;



/* ==========================================
   LOAD SAVED SETTINGS
========================================== */

const savedTheme =
    localStorage.getItem(
        "justiceTheme"
    );


if (savedTheme) {

    setTheme(savedTheme);

}


const savedFontSize =
    localStorage.getItem(
        "justiceFontSize"
    );


if (savedFontSize) {

    document.documentElement.style
    .setProperty(
        "--font-size",
        savedFontSize + "px"
    );


    document.getElementById(
        "fontSizeSlider"
    )
    .value =
    savedFontSize;


    document.getElementById(
        "fontSizeValue"
    )
    .textContent =
    savedFontSize + "px";

}


changeLanguage(
    currentLanguage
);


/* =========================================================
   JUSTICE NOW - ABOUT FIRST PAGE + INFO PAGES
========================================================= */

(function () {

    function openAboutPage(pageId) {

        document.querySelectorAll(".page").forEach(function (page) {
            page.classList.remove("active");
        });

        const aboutPage = document.getElementById("aboutIntroPage");

        if (aboutPage) {
            aboutPage.classList.remove("hidden");
            aboutPage.classList.add("active");
        }

        const selectedPage = document.getElementById(pageId);

        if (selectedPage) {
            selectedPage.classList.remove("hidden");
            selectedPage.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function showAboutFirstPage() {

        document.querySelectorAll(".page").forEach(function (page) {
            page.classList.remove("active");
        });

        const aboutPage =
            document.getElementById("aboutIntroPage");

        if (aboutPage) {
            aboutPage.classList.add("active");
        }

        const appHeader =
            document.getElementById("appHeader");

        if (appHeader) {
            appHeader.classList.add("hidden");
        }

        window.scrollTo(0, 0);
    }


    /* =====================================================
       FIRST PAGE -> SIGN IN
    ===================================================== */

    const aboutSignInButton =
        document.getElementById("aboutSignInButton");

    if (aboutSignInButton) {

        aboutSignInButton.addEventListener("click", function () {

            document
                .querySelectorAll(".page")
                .forEach(function (page) {
                    page.classList.remove("active");
                });

            const aboutPage =
                document.getElementById("aboutIntroPage");

            if (aboutPage) {
                aboutPage.classList.remove("active");
            }

            const signinPage =
                document.getElementById("signinPage");

            if (signinPage) {
                signinPage.classList.add("active");
            }

            window.scrollTo(0, 0);

        });
    }


    /* =====================================================
       PRIVACY
    ===================================================== */

    function openPrivacy() {

        document
            .querySelectorAll(".page")
            .forEach(function (page) {
                page.classList.remove("active");
            });

        document
            .getElementById("privacyPolicyPage")
            ?.classList.add("active");

        window.scrollTo(0, 0);
    }


    [
        "privacyTopButton",
        "privacyFooterButton"
    ].forEach(function (id) {

        const button = document.getElementById(id);

        if (button) {
            button.addEventListener("click", openPrivacy);
        }

    });


    /* =====================================================
       TERMS
    ===================================================== */

    function openTerms() {

        document
            .querySelectorAll(".page")
            .forEach(function (page) {
                page.classList.remove("active");
            });

        document
            .getElementById("termsPage")
            ?.classList.add("active");

        window.scrollTo(0, 0);
    }


    [
        "termsTopButton",
        "termsFooterButton"
    ].forEach(function (id) {

        const button = document.getElementById(id);

        if (button) {
            button.addEventListener("click", openTerms);
        }

    });


    /* =====================================================
       CONTACT
    ===================================================== */

    function openContact() {

        document
            .querySelectorAll(".page")
            .forEach(function (page) {
                page.classList.remove("active");
            });

        document
            .getElementById("contactPage")
            ?.classList.add("active");

        window.scrollTo(0, 0);
    }


    [
        "contactTopButton",
        "contactFooterButton"
    ].forEach(function (id) {

        const button = document.getElementById(id);

        if (button) {
            button.addEventListener("click", openContact);
        }

    });


    /* =====================================================
       BACK TO ABOUT
    ===================================================== */

    document
        .querySelectorAll("[data-info-back='about']")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                showAboutFirstPage();

            });

        });


    /* =====================================================
       LEGAL GUIDE DATA
    ===================================================== */

    const legalGuides = {

        rights: {

            icon: "⚖️",

            title:
                "Fundamental Constitutional Rights",

            intro:
                "Learn about basic constitutional rights and protections in simple language.",

            content: `
                <h2>Important Rights</h2>

                <p>
                    Constitutional rights provide important protections
                    to people. These may include equality, dignity,
                    freedom and protection under the law.
                </p>

                <h2>Why Rights Matter</h2>

                <p>
                    Knowing your basic rights can help you understand
                    what protections may be available to you.
                </p>

                <h2>Important Note</h2>

                <p>
                    This section provides general educational
                    information only. For a specific legal matter,
                    consult a qualified lawyer.
                </p>
            `
        },


        consumer: {

            icon: "🛒",

            title:
                "How to File Consumer Rights Complaint",

            intro:
                "Understand the general process of preparing and submitting a consumer complaint.",

            content: `
                <h2>Step 1 — Keep Your Documents</h2>

                <p>
                    Keep receipts, invoices, warranty documents,
                    messages and other relevant records.
                </p>

                <h2>Step 2 — Describe the Problem</h2>

                <p>
                    Clearly write what product or service was involved,
                    what happened and what resolution you are requesting.
                </p>

                <h2>Step 3 — Submit Through the Appropriate Channel</h2>

                <p>
                    Consumer complaints should be submitted through
                    the relevant consumer-protection authority or
                    forum applicable to your location.
                </p>

                <h2>Important</h2>

                <p>
                    Procedures can differ by province and location.
                    Confirm the current requirements before submitting.
                </p>
            `
        },


        documents: {

            icon: "📄",

            title:
                "Understanding Legal Documentation & Advice",

            intro:
                "Learn why legal documents should be read carefully and when professional advice may be useful.",

            content: `
                <h2>Common Documents</h2>

                <p>
                    Legal matters may involve applications,
                    notices, agreements, complaints, affidavits
                    and other documents.
                </p>

                <h2>Read Carefully</h2>

                <p>
                    Check names, dates, signatures, deadlines and
                    important terms before submitting or signing
                    a legal document.
                </p>

                <h2>Professional Advice</h2>

                <p>
                    If you do not understand a legal document or
                    the consequences of signing it, consider
                    consulting a qualified lawyer.
                </p>
            `
        },


        digital: {

            icon: "🌐",

            title:
                "Digital Legal Resources & Support",

            intro:
                "Find useful digital resources and support options through Justice Now.",

            content: `
                <h2>Justice Now Resources</h2>

                <p>
                    Justice Now can organize legal information,
                    emergency resources, case information and
                    support contacts in one place.
                </p>

                <h2>Emergency Assistance</h2>

                <p>
                    For urgent situations, use the emergency
                    assistance features of the application.
                </p>

                <h2>Free Legal Aid</h2>

                <p>
                    Use Justice Hub → Free Legal Help to access
                    the legal-aid directory and available verified
                    contacts.
                </p>

                <h2>Important Note</h2>

                <p>
                    Always confirm that a contact or service is
                    currently available before relying on it.
                </p>
            `
        }

    };


    /* =====================================================
       OPEN GUIDE
    ===================================================== */

    function openLegalGuide(type) {

        const guide = legalGuides[type];

        if (!guide) {
            return;
        }

        document
            .querySelectorAll(".page")
            .forEach(function (page) {
                page.classList.remove("active");
            });


        const icon =
            document.getElementById(
                "legalGuideDetailIcon"
            );

        const title =
            document.getElementById(
                "legalGuideDetailTitle"
            );

        const intro =
            document.getElementById(
                "legalGuideDetailIntro"
            );

        const content =
            document.getElementById(
                "legalGuideDetailContent"
            );


        if (icon) {
            icon.textContent = guide.icon;
        }

        if (title) {
            title.textContent = guide.title;
        }

        if (intro) {
            intro.textContent = guide.intro;
        }

        if (content) {
            content.innerHTML = guide.content;
        }


        const detailPage =
            document.getElementById(
                "legalGuideDetailPage"
            );

        if (detailPage) {
            detailPage.classList.add("active");
        }

        window.scrollTo(0, 0);
    }


    /* =====================================================
       GUIDE BUTTONS
    ===================================================== */

    const guideRightsButton =
        document.getElementById("guideRightsButton");

    if (guideRightsButton) {
        guideRightsButton.addEventListener(
            "click",
            function () {
                openLegalGuide("rights");
            }
        );
    }


    const guideConsumerButton =
        document.getElementById("guideConsumerButton");

    if (guideConsumerButton) {
        guideConsumerButton.addEventListener(
            "click",
            function () {
                openLegalGuide("consumer");
            }
        );
    }


    const guideDocumentsButton =
        document.getElementById("guideDocumentsButton");

    if (guideDocumentsButton) {
        guideDocumentsButton.addEventListener(
            "click",
            function () {
                openLegalGuide("documents");
            }
        );
    }


    const guideDigitalButton =
        document.getElementById("guideDigitalButton");

    if (guideDigitalButton) {
        guideDigitalButton.addEventListener(
            "click",
            function () {
                openLegalGuide("digital");
            }
        );
    }


    /* =====================================================
       GUIDE BACK
    ===================================================== */

    const legalGuideBackButton =
        document.getElementById(
            "legalGuideBackButton"
        );

    if (legalGuideBackButton) {

        legalGuideBackButton.addEventListener(
            "click",
            function () {

                showAboutFirstPage();

            }
        );

    }


    /* =====================================================
       FREE LEGAL HELP
    ===================================================== */

    const freeLegalHelpHeader =
        document.getElementById(
            "freeLegalHelpHeader"
        );

    const freeLegalHelpContent =
        document.getElementById(
            "freeLegalHelpContent"
        );

    if (
        freeLegalHelpHeader &&
        freeLegalHelpContent
    ) {

        freeLegalHelpHeader.addEventListener(
            "click",
            function () {

                freeLegalHelpContent.classList.toggle(
                    "hidden"
                );

            }
        );

    }


    /* =====================================================
       OPEN FREE LEGAL AID DIRECTORY
    ===================================================== */

    const openFreeLegalAidButton =
        document.getElementById(
            "openFreeLegalAidButton"
        );

    if (openFreeLegalAidButton) {

        openFreeLegalAidButton.addEventListener(
            "click",
            function () {

                /*
                   Aap ke existing Free Legal Aid page ko
                   yahan open kiya jayega.
                */

                if (
                    typeof openFreeLegalAid ===
                    "function"
                ) {

                    openFreeLegalAid();

                } else {

                    alert(
                        "Free Legal Aid directory is ready to connect."
                    );

                }

            }
        );

    }


    /* =====================================================
       START WITH ABOUT PAGE
    ===================================================== */

    document
        .querySelectorAll(".page")
        .forEach(function (page) {
            page.classList.remove("active");
        });

    const aboutIntro =
        document.getElementById("aboutIntroPage");

    if (aboutIntro) {

        aboutIntro.classList.add("active");

    }

})();
  