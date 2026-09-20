
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


const chatBackBtn=document.getElementById("chatBackButton")
if(chatBackBtn){
    chatBackBtn.addEventListener("click", function() {

    showPage("home");

});

}

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


    if (homeHeading && t) {

        homeHeading.textContent =
        t.homeTitle;

    }


    const featureButtons =
        document.querySelectorAll(
            ".home-features .feature-button strong"
        );


    if (featureButtons.length >= 6 && t) {

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



/* =====================================================
   JUSTICE NOW
   FIRST PAGE + ABOUT NAVIGATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const aboutPage =
        document.getElementById("aboutIntroPage");


    /* =================================================
       FUNCTION: SHOW ONLY ONE NORMAL PAGE
    ================================================= */

    function openPage(pageId) {

        /* Hide About page */
        if (aboutPage) {
            aboutPage.classList.remove("active");
        }


        /* Hide ALL normal pages */
        document
            .querySelectorAll(".page")
            .forEach(function (page) {

                page.classList.remove("active");

            });


        /* Show selected page */
        const selectedPage =
            document.getElementById(pageId);

        if (selectedPage) {

            selectedPage.classList.add("active");

        }


        window.scrollTo(0, 0);

    }


    /* =================================================
       FUNCTION: SHOW ABOUT PAGE ONLY
    ================================================= */

    function openAboutPage() {

        /* Hide all normal pages */

        document
            .querySelectorAll(".page")
            .forEach(function (page) {

                page.classList.remove("active");

            });


        /* Show About */

        if (aboutPage) {

            aboutPage.classList.add("active");

        }


        window.scrollTo(0, 0);

    }


    /* =================================================
       SIGN IN
    ================================================= */

    const signInButton =
        document.getElementById(
            "aboutSignInButton"
        );

    if (signInButton) {

        signInButton.addEventListener(
            "click",
            function () {

                openPage("signinPage");

            }
        );

    }


    /* =================================================
       PRIVACY POLICY
    ================================================= */

    const privacyButton =
        document.getElementById(
            "aboutPrivacyButton"
        );

    if (privacyButton) {

        privacyButton.addEventListener(
            "click",
            function () {

                openPage(
                    "privacyPolicyPage"
                );

            }
        );

    }


    /* =================================================
       TERMS
    ================================================= */

    const termsButton =
        document.getElementById(
            "aboutTermsButton"
        );

    if (termsButton) {

        termsButton.addEventListener(
            "click",
            function () {

                openPage("termsPage");

            }
        );

    }


    /* =================================================
       CONTACT US
    ================================================= */

    const contactButton =
        document.getElementById(
            "aboutContactButton"
        );

    if (contactButton) {

        contactButton.addEventListener(
            "click",
            function () {

                openPage("contactPage");

            }
        );

    }


    /* =================================================
       FEEDBACK
    ================================================= */

    const feedbackButton =
        document.getElementById(
            "aboutFeedbackButton"
        );

    if (feedbackButton) {

        feedbackButton.addEventListener(
            "click",
            function () {

                openPage("feedbackPage");

            }
        );

    }


    /* =================================================
       BACK FROM FEEDBACK
    ================================================= */

    const feedbackBack =
        document.getElementById(
            "feedbackBackButton"
        );

    if (feedbackBack) {

        feedbackBack.addEventListener(
            "click",
            function () {

                openAboutPage();

            }
        );

    }


    /* =================================================
       BACK FROM PRIVACY
    ================================================= */

    const privacyBack =
        document.getElementById(
            "privacyBackButton"
        );

    if (privacyBack) {

        privacyBack.addEventListener(
            "click",
            function () {

                openAboutPage();

            }
        );

    }


    /* =================================================
       BACK FROM TERMS
    ================================================= */

    const termsBack =
        document.getElementById(
            "termsBackButton"
        );

    if (termsBack) {

        termsBack.addEventListener(
            "click",
            function () {

                openAboutPage();

            }
        );

    }


    /* =================================================
       BACK FROM CONTACT
    ================================================= */

    const contactBack =
        document.getElementById(
            "contactBackButton"
        );

    if (contactBack) {

        contactBack.addEventListener(
            "click",
            function () {

                openAboutPage();

            }
        );

    }


    /* =================================================
       CONTACT → FEEDBACK
    ================================================= */

    const contactFeedback =
        document.getElementById(
            "contactFeedbackButton"
        );

    if (contactFeedback) {

        contactFeedback.addEventListener(
            "click",
            function () {

                openPage("feedbackPage");

            }
        );

    }


    /* =================================================
       SEND FEEDBACK
    ================================================= */

    const submitFeedback =
        document.getElementById(
            "submitFeedbackButton"
        );

    if (submitFeedback) {

        submitFeedback.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "feedbackName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "feedbackEmail"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "feedbackMessage"
                    ).value.trim();


                const status =
                    document.getElementById(
                        "feedbackStatus"
                    );


                if (!message) {

                    status.textContent =
                        "Please write your feedback message.";

                    return;

                }


                const oldFeedback =
                    JSON.parse(
                        localStorage.getItem(
                            "justiceFeedback"
                        ) || "[]"
                    );


                oldFeedback.push({

                    name: name,

                    email: email,

                    message: message,

                    date:
                        new Date().toLocaleString()

                });


                localStorage.setItem(
                    "justiceFeedback",
                    JSON.stringify(oldFeedback)
                );


                status.textContent =
                    "Thank you! Your feedback has been saved.";


                document.getElementById(
                    "feedbackName"
                ).value = "";


                document.getElementById(
                    "feedbackEmail"
                ).value = "";


                document.getElementById(
                    "feedbackMessage"
                ).value = "";

            }
        );

    }


    /* =================================================
       VERY IMPORTANT:
       WHEN APP OPENS → ONLY ABOUT PAGE
    ================================================= */

    openAboutPage();

});
/* =====================================================
   JUSTICE NOW PAGE NAVIGATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const allPages = document.querySelectorAll(
        ".page, #aboutIntroPage"
    );

    /* -----------------------------------------------
       SHOW ONLY ONE PAGE
    ----------------------------------------------- */

    function showOnly(pageId) {

        allPages.forEach(function (page) {
            page.classList.remove("active");
            page.style.display = "none";
        });

        const page = document.getElementById(pageId);

        if (page) {
            page.classList.add("active");

            if (pageId === "aboutIntroPage") {
                page.style.display = "flex";
            } else {
                page.style.display = "block";
            }
        }

        window.scrollTo(0, 0);
    }


    /* -----------------------------------------------
       FIRST PAGE
       APP OPEN → ONLY ABOUT PAGE
    ----------------------------------------------- */

    showOnly("aboutIntroPage");


    /* -----------------------------------------------
       SIGN IN
    ----------------------------------------------- */

    const signInButton =
        document.getElementById("aboutSignInButton");

    if (signInButton) {

        signInButton.onclick = function () {

            showOnly("signinPage");

        };
    }


    /* -----------------------------------------------
       PRIVACY POLICY
    ----------------------------------------------- */

    const privacyButton =
        document.getElementById("aboutPrivacyButton");

    if (privacyButton) {

        privacyButton.onclick = function () {

            showOnly("privacyPolicyPage");

        };
    }


    /* -----------------------------------------------
       TERMS
    ----------------------------------------------- */

    const termsButton =
        document.getElementById("aboutTermsButton");

    if (termsButton) {

        termsButton.onclick = function () {

            showOnly("termsPage");

        };
    }


    /* -----------------------------------------------
       CONTACT US
    ----------------------------------------------- */

    const contactButton =
        document.getElementById("aboutContactButton");

    if (contactButton) {

        contactButton.onclick = function () {

            showOnly("contactPage");

        };
    }


    /* -----------------------------------------------
       FEEDBACK
    ----------------------------------------------- */

    const feedbackButton =
        document.getElementById("aboutFeedbackButton");

    if (feedbackButton) {

        feedbackButton.onclick = function () {

            showOnly("feedbackPage");

        };
    }


    /* -----------------------------------------------
       BACK → ABOUT
    ----------------------------------------------- */

    const feedbackBack =
        document.getElementById("feedbackBackButton");

    if (feedbackBack) {

        feedbackBack.onclick = function () {

            showOnly("aboutIntroPage");

        };
    }


    const privacyBack =
        document.getElementById("privacyBackButton");

    if (privacyBack) {

        privacyBack.onclick = function () {

            showOnly("aboutIntroPage");

        };
    }


    const termsBack =
        document.getElementById("termsBackButton");

    if (termsBack) {

        termsBack.onclick = function () {

            showOnly("aboutIntroPage");

        };
    }


    const contactBack =
        document.getElementById("contactBackButton");

    if (contactBack) {

        contactBack.onclick = function () {

            showOnly("aboutIntroPage");

        };
    }


    /* -----------------------------------------------
       CONTACT → FEEDBACK
    ----------------------------------------------- */

    const contactFeedback =
        document.getElementById("contactFeedbackButton");

    if (contactFeedback) {

        contactFeedback.onclick = function () {

            showOnly("feedbackPage");

        };
    }


});
/* =========================================================
   JUSTICE NOW - FIXED AUTHENTICATION SYSTEM
   Sign In + Sign Up + Forgot Password + Validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------
       1. FIX SIGN-IN CARD POSITION
       --------------------------------------------------------- */

    const signinPage = document.getElementById("signinPage");

    if (signinPage) {

        const authCard =
            document.querySelector("#signinPage + .auth-card");

        if (authCard) {
            signinPage.appendChild(authCard);
        }
    }


    /* ---------------------------------------------------------
       2. CREATE SIGN-UP PAGE
       --------------------------------------------------------- */

    if (!document.getElementById("signupPage")) {

        const signupPage = document.createElement("section");

        signupPage.id = "signupPage";
        signupPage.className = "page auth-page";

        signupPage.innerHTML = `
            <div class="auth-card">

                <button
                    type="button"
                    class="simple-back"
                    id="signupBackButton">
                    ← Back to Sign In
                </button>

                <div class="justice-logo">
                    <div class="justice-symbol">⚖️</div>
                </div>

                <h1>Justice Now</h1>

                <p class="tagline">
                    Your Rights. Your Voice. Your Justice.
                </p>

                <h2>Create Account</h2>

                <form id="signupForm">

                    <label>Full Name</label>

                    <input
                        type="text"
                        id="signupName"
                        placeholder="Enter your full name"
                        required
                    >

                    <label>Email</label>

                    <input
                        type="email"
                        id="signupEmail"
                        placeholder="Enter your email"
                        required
                    >

                    <label>Password</label>

                    <input
                        type="password"
                        id="signupPassword"
                        placeholder="Create password"
                        minlength="6"
                        required
                    >

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        id="signupConfirmPassword"
                        placeholder="Confirm password"
                        minlength="6"
                        required
                    >

                    <button
                        type="submit"
                        class="main-button">
                        Create Account
                    </button>

                </form>

                <p id="signupMessage"></p>

            </div>
        `;

        document.body.appendChild(signupPage);
    }


    /* ---------------------------------------------------------
       3. ADD SIGN-UP BUTTON TO SIGN-IN PAGE
       --------------------------------------------------------- */

    const signinCard =
        document.querySelector("#signinPage .auth-card");

    if (
        signinCard &&
        !document.getElementById("signupButton")
    ) {

        const signupButton =
            document.createElement("button");

        signupButton.type = "button";
        signupButton.id = "signupButton";
        signupButton.className = "text-button";

        signupButton.textContent =
            "Don't have an account? Sign Up";

        const signinMessage =
            document.getElementById("signinMessage");

        if (signinMessage) {
            signinMessage.after(signupButton);
        } else {
            signinCard.appendChild(signupButton);
        }
    }


    /* ---------------------------------------------------------
       4. PAGE NAVIGATION
       --------------------------------------------------------- */

    function openAuthPage(pageId) {

        document
            .querySelectorAll(".page, #aboutIntroPage")
            .forEach(function (page) {

                page.classList.remove("active");

                page.style.display = "none";
            });


        const selected =
            document.getElementById(pageId);

        if (selected) {

            selected.classList.add("active");

            selected.style.display =
                "flex";

            window.scrollTo(0, 0);
        }


        const header =
            document.getElementById("appHeader");

        if (header) {
            header.classList.add("hidden");
        }
    }


    /* ---------------------------------------------------------
       5. SIGN IN BUTTON FROM ABOUT PAGE
       --------------------------------------------------------- */

    const aboutSignIn =
        document.getElementById("aboutSignInButton");

    if (aboutSignIn) {

        aboutSignIn.onclick = function () {

            openAuthPage("signinPage");

        };
    }


    /* ---------------------------------------------------------
       6. SIGN UP BUTTON
       --------------------------------------------------------- */

    const signupButton =
        document.getElementById("signupButton");

    if (signupButton) {

        signupButton.onclick = function () {

            openAuthPage("signupPage");

        };
    }


    /* ---------------------------------------------------------
       7. BACK TO SIGN IN
       --------------------------------------------------------- */

    const signupBack =
        document.getElementById("signupBackButton");

    if (signupBack) {

        signupBack.onclick = function () {

            openAuthPage("signinPage");

        };
    }


    /* ---------------------------------------------------------
       8. SIGN UP SYSTEM
       --------------------------------------------------------- */

    const signupForm =
        document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

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
                    document.getElementById("signupMessage");


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


                /* Password match */

                if (password !== confirmPassword) {

                    message.textContent =
                        "Passwords do not match.";

                    return;
                }


                /* Get accounts */

                const accounts =
                    JSON.parse(
                        localStorage.getItem(
                            "justiceAccounts"
                        ) || "[]"
                    );


                /* Duplicate email */

                const existing =
                    accounts.find(function (account) {

                        return account.email === email;

                    });


                if (existing) {

                    message.textContent =
                        "An account with this email already exists.";

                    return;
                }


                /* Save account */

                accounts.push({

                    name: name,
                    email: email,
                    password: password

                });


                localStorage.setItem(
                    "justiceAccounts",
                    JSON.stringify(accounts)
                );


                message.textContent =
                    "Account created successfully!";


                signupForm.reset();


                setTimeout(function () {

                    openAuthPage("signinPage");

                    const signinEmail =
                        document.getElementById("email");

                    const signinName =
                        document.getElementById("fullName");

                    if (signinEmail) {
                        signinEmail.value = email;
                    }

                    if (signinName) {
                        signinName.value = name;
                    }

                }, 900);

            }
        );
    }


    /* ---------------------------------------------------------
       9. FIXED SIGN-IN VALIDATION
       --------------------------------------------------------- */

    const signinForm =
        document.getElementById("signinForm");

    if (signinForm) {

        document.addEventListener(
            "submit",
            function (event) {

                if (event.target !== signinForm) {
                    return;
                }

                /*
                 * Stop the old Sign-In handler
                 * from running.
                 */

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

                if (!name || !email || !password) {

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


                /* Get registered accounts */

                const accounts =
                    JSON.parse(
                        localStorage.getItem(
                            "justiceAccounts"
                        ) || "[]"
                    );


                const account =
                    accounts.find(function (user) {

                        return user.email === email;

                    });


                /* Account doesn't exist */

                if (!account) {

                    message.textContent =
                        "No account found with this email. Please Sign Up first.";

                    return;
                }


                /* Wrong password */

                if (account.password !== password) {

                    message.textContent =
                        "Invalid password. Please try again.";

                    return;
                }


                /* Successful login */

                localStorage.setItem(
                    "justiceUser",
                    JSON.stringify({

                        name: account.name,
                        email: account.email

                    })
                );


                message.textContent =
                    "Sign in successful!";


                setTimeout(function () {

                    /*
                     * Use existing app navigation
                     */

                    if (typeof showPage === "function") {

                        showPage("welcome");

                    }
                    else {

                        openAuthPage("welcomePage");

                    }

                }, 700);

            },
            true
        );
    }


    /* ---------------------------------------------------------
       10. GOOGLE SIGN-IN BUTTON
       --------------------------------------------------------- */

    const signinFormElement =
        document.getElementById("signinForm");


    if (
        signinFormElement &&
        !document.getElementById("googleSignInButton")
    ) {

        const googleButton =
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


        signinFormElement.after(divider);

        divider.after(googleButton);


        googleButton.onclick =
            function () {

                alert(
                    "Google Sign-In needs Google OAuth configuration. The button is ready, but a Google Client ID must be added to enable real Google account login."
                );

            };
    }


    /* ---------------------------------------------------------
       11. FORGOT PASSWORD
       --------------------------------------------------------- */

    const forgotButton =
        document.getElementById(
            "forgotPasswordButton"
        );


    if (forgotButton) {

        forgotButton.onclick =
            function () {

                openAuthPage(
                    "forgotPage"
                );

            };
    }


    /* ---------------------------------------------------------
       12. FORGOT PASSWORD BACK
       --------------------------------------------------------- */

    const forgotBack =
        document.getElementById(
            "forgotBackButton"
        );


    if (forgotBack) {

        forgotBack.onclick =
            function () {

                openAuthPage(
                    "signinPage"
                );

            };
    }


    /* ---------------------------------------------------------
       13. RESET PASSWORD
       --------------------------------------------------------- */

    const resetButton =
        document.getElementById(
            "resetPasswordButton"
        );


    if (resetButton) {

        resetButton.onclick =
            function () {

                const email =
                    document
                        .getElementById("resetEmail")
                        .value
                        .trim()
                        .toLowerCase();

                const newPassword =
                    document
                        .getElementById("newPassword")
                        .value;

                const confirmPassword =
                    document
                        .getElementById("confirmPassword")
                        .value;

                const message =
                    document.getElementById(
                        "resetMessage"
                    );


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    message.textContent =
                        "Please enter a valid email address.";

                    return;
                }


                if (newPassword.length < 6) {

                    message.textContent =
                        "Password must be at least 6 characters.";

                    return;
                }


                if (newPassword !== confirmPassword) {

                    message.textContent =
                        "Passwords do not match.";

                    return;
                }


                const accounts =
                    JSON.parse(
                        localStorage.getItem(
                            "justiceAccounts"
                        ) || "[]"
                    );


                const index =
                    accounts.findIndex(
                        function (account) {

                            return account.email === email;

                        }
                    );


                if (index === -1) {

                    message.textContent =
                        "No account found with this email.";

                    return;
                }


                accounts[index].password =
                    newPassword;


                localStorage.setItem(
                    "justiceAccounts",
                    JSON.stringify(accounts)
                );


                message.textContent =
                    "Password reset successfully!";


                setTimeout(function () {

                    openAuthPage(
                        "signinPage"
                    );

                }, 900);

            };
    }

});
/* =====================================================
   FINAL PAGE SEPARATION FIX
   ONLY ONE PAGE CAN BE VISIBLE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const pageIds = [
        "aboutIntroPage",
        "feedbackPage",
        "signinPage",
        "forgotPage",
        "welcomePage",
        "homePage",
        "dangerPage",
        "reportPage",
        "myCasePage",
        "evidencePage",
        "aiGuidesPage",
        "justiceHubPage",
        "liveChatPage",
        "settingsPage",
        "privacyPolicyPage",
        "termsPage",
        "contactPage"
    ];

    function showOnlyPage(id) {

        pageIds.forEach(function (pageId) {

            const page =
                document.getElementById(pageId);

            if (!page) return;

            page.classList.remove("active");

            page.style.display = "none";
        });


        const selected =
            document.getElementById(id);

        if (!selected) return;


        selected.classList.add("active");


        if (id === "aboutIntroPage") {

            selected.style.display = "flex";

        }
        else if (
            id === "signinPage" ||
            id === "forgotPage"
        ) {

            selected.style.display = "flex";

        }
        else {

            selected.style.display = "block";

        }


        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }


    /* -----------------------------------------
       FIRST OPEN → ONLY ABOUT
    ----------------------------------------- */

    showOnlyPage("aboutIntroPage");


    /* -----------------------------------------
       ABOUT → SIGN IN
    ----------------------------------------- */

    const signIn =
        document.getElementById(
            "aboutSignInButton"
        );

    if (signIn) {

        signIn.onclick = function () {

            showOnlyPage("signinPage");

        };
    }


    /* -----------------------------------------
       ABOUT → PRIVACY
    ----------------------------------------- */

    const privacy =
        document.getElementById(
            "aboutPrivacyButton"
        );

    if (privacy) {

        privacy.onclick = function () {

            showOnlyPage(
                "privacyPolicyPage"
            );

        };
    }


    /* -----------------------------------------
       ABOUT → TERMS
    ----------------------------------------- */

    const terms =
        document.getElementById(
            "aboutTermsButton"
        );

    if (terms) {

        terms.onclick = function () {

            showOnlyPage("termsPage");

        };
    }


    /* -----------------------------------------
       ABOUT → CONTACT
    ----------------------------------------- */

    const contact =
        document.getElementById(
            "aboutContactButton"
        );

    if (contact) {

        contact.onclick = function () {

            showOnlyPage("contactPage");

        };
    }


    /* -----------------------------------------
       ABOUT → FEEDBACK
    ----------------------------------------- */

    const feedback =
        document.getElementById(
            "aboutFeedbackButton"
        );

    if (feedback) {

        feedback.onclick = function () {

            showOnlyPage("feedbackPage");

        };
    }


    /* -----------------------------------------
       BACK TO ABOUT
    ----------------------------------------- */

    const backButtons = [
        "feedbackBackButton",
        "privacyBackButton",
        "termsBackButton",
        "contactBackButton"
    ];

    backButtons.forEach(function (id) {

        const button =
            document.getElementById(id);

        if (button) {

            button.onclick = function () {

                showOnlyPage(
                    "aboutIntroPage"
                );

            };
        }
    });


    /* -----------------------------------------
       FORGOT PASSWORD
    ----------------------------------------- */

    const forgot =
        document.getElementById(
            "forgotPasswordButton"
        );

    if (forgot) {

        forgot.onclick = function () {

            showOnlyPage("forgotPage");

        };
    }


    /* -----------------------------------------
       FORGOT → SIGN IN
    ----------------------------------------- */

    const forgotBack =
        document.getElementById(
            "forgotBackButton"
        );

    if (forgotBack) {

        forgotBack.onclick = function () {

            showOnlyPage("signinPage");

        };
    }


    /* -----------------------------------------
       SIGN IN → SIGN UP
    ----------------------------------------- */

    const signup =
        document.getElementById(
            "signupButton"
        );

    if (signup) {

        signup.onclick = function () {

            /*
             * signupPage should be a separate
             * section if you have it.
             */

            showOnlyPage("signupPage");

        };
    }

});
/* =========================================================
   JUSTICE NOW CHAT SYSTEM
   SEPARATE FULL SCREEN CHAT PAGE
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       STORAGE
    ===================================================== */

    const USERS_KEY = "justiceNowUsers";
    const REQUESTS_KEY = "justiceNowRequests";
    const CHATS_KEY = "justiceNowChats";
    const GROUPS_KEY = "justiceNowGroups";
    const PROFILE_KEY = "justiceNowProfile";


    let users =
        JSON.parse(
            localStorage.getItem(USERS_KEY) || "null"
        );

    let requests =
        JSON.parse(
            localStorage.getItem(REQUESTS_KEY) || "[]"
        );

    let chats =
        JSON.parse(
            localStorage.getItem(CHATS_KEY) || "{}"
        );

    let groups =
        JSON.parse(
            localStorage.getItem(GROUPS_KEY) || "[]"
        );


    let myProfile =
        JSON.parse(
            localStorage.getItem(PROFILE_KEY) || "null"
        );


    let currentChat = null;
    let currentChatType = null;
    let currentGroup = null;


    /* =====================================================
       DEFAULT PROFILE
    ===================================================== */

    if (!myProfile) {

        myProfile = {
            id: "me",
            username: "justice_user",
            name: "Justice Now User",
            image: ""
        };

        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(myProfile)
        );
    }


    /* =====================================================
       DEMO USERS
    ===================================================== */

    if (!users) {

        users = [

            {
                id: "u1",
                username: "ali_khan",
                name: "Ali Khan",
                image: ""
            },

            {
                id: "u2",
                username: "sara_ahmed",
                name: "Sara Ahmed",
                image: ""
            },

            {
                id: "u3",
                username: "hamza123",
                name: "Hamza",
                image: ""
            },

            {
                id: "u4",
                username: "legal_helper",
                name: "Legal Helper",
                image: ""
            },

            {
                id: "u5",
                username: "fatima",
                name: "Fatima",
                image: ""
            }

        ];

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    let chatSection;
    let messageSection;
    let chatTopBtn;
    let closeChatBtn;
    let backFromMessageBtn;


    function getElements() {

        chatSection =
            document.getElementById("chatSection");

        messageSection =
            document.getElementById("messageSection");

        chatTopBtn =
            document.getElementById("chatTopBtn");

        closeChatBtn =
            document.getElementById("closeChatBtn");

        backFromMessageBtn =
            document.getElementById(
                "backFromMessageBtn"
            );
    }


    /* =====================================================
       HOME PAGE
    ===================================================== */

    function hideHomePage() {

        const homePage =
            document.getElementById("homePage");

        if (homePage) {

            homePage.style.display = "none";

        }
    }


    function showHomePage() {

        const homePage =
            document.getElementById("homePage");

        if (homePage) {

            homePage.style.display = "block";

        }
    }


    /* =====================================================
       OPEN CHAT PAGE
    ===================================================== */

    function openChatPage(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }


        getElements();


        if (!chatSection) {

            alert(
                "Chat page was not found. Please make sure the Chat HTML is outside #homePage."
            );

            return;

        }


        /* Hide Home */

        hideHomePage();


        /* Hide Message */

        if (messageSection) {

            messageSection.style.display =
                "none";

        }


        /* Show Chat */

        chatSection.style.display =
            "block";


        document.body.classList.add(
            "justice-chat-open"
        );


        document.body.style.overflow =
            "hidden";


        /* Reset first tab */

        activateTab("chatsTab");


        renderChats();
        renderRequests();
        renderGroups();
        loadProfile();


        window.scrollTo(0, 0);

    }


    /* =====================================================
       CLOSE CHAT -> HOME
    ===================================================== */

    function closeChatPage(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }


        getElements();


        if (chatSection) {

            chatSection.style.display =
                "none";

        }


        if (messageSection) {

            messageSection.style.display =
                "none";

        }


        showHomePage();


        document.body.classList.remove(
            "justice-chat-open"
        );


        document.body.style.overflow = "";


        window.scrollTo(0, 0);

    }


    /* =====================================================
       CHAT BUTTON
    ===================================================== */

    function setupChatButton() {

        getElements();


        if (!chatTopBtn) {

            console.warn(
                "Justice Now: chatTopBtn not found."
            );

            return;

        }


        /*
           Capture phase + stopImmediatePropagation
           prevents old Home navigation code
           from opening Chat at the bottom.
        */

        chatTopBtn.addEventListener(
            "click",
            openChatPage,
            true
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    function setupCloseButton() {

        getElements();


        if (!closeChatBtn)
            return;


        closeChatBtn.addEventListener(
            "click",
            closeChatPage
        );

    }


    /* =====================================================
       TABS
    ===================================================== */

    function activateTab(tabId) {

        document
            .querySelectorAll(".chat-tab")
            .forEach(tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.tab === tabId
                );

            });


        document
            .querySelectorAll(".chat-tab-content")
            .forEach(content => {

                content.classList.toggle(
                    "active",
                    content.id === tabId
                );

            });

    }


    function setupTabs() {

        document
            .querySelectorAll(".chat-tab")
            .forEach(tab => {

                tab.addEventListener(
                    "click",
                    function () {

                        activateTab(
                            this.dataset.tab
                        );

                    }
                );

            });

    }


    /* =====================================================
       SEARCH USERNAME
    ===================================================== */

    function searchUsers() {

        const input =
            document.getElementById(
                "usernameSearch"
            );

        const results =
            document.getElementById(
                "userSearchResults"
            );


        if (!input || !results)
            return;


        const value =
            input.value
                .trim()
                .toLowerCase()
                .replace(/^@/, "");


        if (!value) {

            results.innerHTML = `

                <div class="empty-chat">

                    <span>🔎</span>

                    <p>
                        Enter a username to search.
                    </p>

                </div>

            `;

            return;

        }


        const matches =
            users.filter(user => {

                return (

                    user.id !== myProfile.id &&

                    (
                        user.username
                            .toLowerCase()
                            .includes(value)

                        ||

                        user.name
                            .toLowerCase()
                            .includes(value)
                    )

                );

            });


        if (!matches.length) {

            results.innerHTML = `

                <div class="empty-chat">

                    <span>😕</span>

                    <p>No user found.</p>

                </div>

            `;

            return;

        }


        results.innerHTML =
            matches
                .map(user => `

                    <div class="user-result">

                        <div class="user-result-main">

                            <div class="user-avatar">

                                ${
                                    user.image

                                    ?

                                    `<img
                                        src="${user.image}"
                                        alt=""
                                    >`

                                    :

                                    "👤"
                                }

                            </div>


                            <div class="chat-info">

                                <strong>
                                    ${escapeHTML(user.name)}
                                </strong>

                                <span>
                                    @${escapeHTML(user.username)}
                                </span>

                            </div>

                        </div>


                        <div class="user-result-buttons">

                            <button
                                type="button"
                                class="outline-btn profile-user-btn"
                                data-id="${user.id}"
                            >
                                Profile
                            </button>


                            <button
                                type="button"
                                class="teal-btn request-user-btn"
                                data-id="${user.id}"
                            >
                                Send Request
                            </button>

                        </div>

                    </div>

                `)
                .join("");

    }


    function setupSearch() {

        const button =
            document.getElementById(
                "searchUserBtn"
            );

        const input =
            document.getElementById(
                "usernameSearch"
            );


        if (button) {

            button.addEventListener(
                "click",
                searchUsers
            );

        }


        if (input) {

            input.addEventListener(
                "input",
                searchUsers
            );


            input.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        searchUsers();

                    }

                }
            );

        }

    }


    /* =====================================================
       REQUEST
    ===================================================== */

    function sendRequest(userId) {

        if (
            userId === myProfile.id
        ) {

            alert(
                "You cannot send a request to yourself."
            );

            return;

        }


        const existing =
            requests.find(
                r =>
                    r.from === myProfile.id &&
                    r.to === userId &&
                    r.status === "pending"
            );


        if (existing) {

            alert(
                "Request already sent."
            );

            return;

        }


        requests.push({

            id:
                "request_" +
                Date.now(),

            from:
                myProfile.id,

            to:
                userId,

            status:
                "pending",

            created:
                Date.now()

        });


        localStorage.setItem(
            REQUESTS_KEY,
            JSON.stringify(requests)
        );


        alert(
            "Friend request sent."
        );


        renderRequests();

    }


    function renderRequests() {

        const list =
            document.getElementById(
                "requestList"
            );


        if (!list)
            return;


        const incoming =
            requests.filter(
                r =>
                    r.to === myProfile.id &&
                    r.status === "pending"
            );


        if (!incoming.length) {

            list.innerHTML = `

                <div class="empty-chat">

                    <span>👥</span>

                    <p>
                        No pending requests.
                    </p>

                </div>

            `;

            return;

        }


        list.innerHTML =
            incoming
                .map(request => {

                    const user =
                        users.find(
                            u =>
                                u.id ===
                                request.from
                        );


                    if (!user)
                        return "";


                    return `

                        <div class="request-item">

                            <div class="user-avatar">
                                ${
                                    user.image
                                    ?
                                    `<img src="${user.image}" alt="">`
                                    :
                                    "👤"
                                }
                            </div>


                            <div class="chat-info">

                                <strong>
                                    ${escapeHTML(user.name)}
                                </strong>

                                <span>
                                    @${escapeHTML(user.username)}
                                </span>

                            </div>


                            <div class="request-actions">

                                <button
                                    type="button"
                                    class="teal-btn accept-request"
                                    data-id="${request.id}"
                                >
                                    Accept
                                </button>


                                <button
                                    type="button"
                                    class="danger-btn reject-request"
                                    data-id="${request.id}"
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    `;

                })
                .join("");

    }


    /* =====================================================
       PRIVATE CHAT
    ===================================================== */

    function privateChatKey(a, b) {

        return [a, b]
            .sort()
            .join("__");

    }


    function createPrivateChat(userId) {

        const key =
            privateChatKey(
                myProfile.id,
                userId
            );


        if (!chats[key]) {

            chats[key] = [];

        }


        localStorage.setItem(
            CHATS_KEY,
            JSON.stringify(chats)
        );

    }


    /* =====================================================
       OPEN PRIVATE MESSAGE PAGE
    ===================================================== */

    function openPrivateChat(user) {

        if (!user)
            return;


        currentChatType =
            "private";

        currentChat =
            user.id;

        currentGroup =
            null;


        createPrivateChat(
            user.id
        );


        getElements();


        if (chatSection) {

            chatSection.style.display =
                "none";

        }


        if (messageSection) {

            messageSection.style.display =
                "block";

        }


        const title =
            document.getElementById(
                "messageTitle"
            );

        const status =
            document.getElementById(
                "messageStatus"
            );

        const avatar =
            document.getElementById(
                "messageAvatar"
            );


        if (title)
            title.textContent =
                user.name;


        if (status)
            status.textContent =
                "@" + user.username;


        if (avatar) {

            avatar.innerHTML =
                user.image

                ?

                `<img
                    src="${user.image}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        border-radius:50%;
                    "
                >`

                :

                "👤";

        }


        renderMessages();


        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       CHAT LIST
    ===================================================== */

    function renderChats() {

        const list =
            document.getElementById(
                "chatList"
            );


        if (!list)
            return;


        const privateUsers = [];


        Object.keys(chats)
            .forEach(key => {

                const ids =
                    key.split("__");


                if (
                    ids.includes(
                        myProfile.id
                    ) &&
                    ids.length === 2
                ) {

                    const otherId =
                        ids.find(
                            id =>
                                id !==
                                myProfile.id
                        );


                    const user =
                        users.find(
                            u =>
                                u.id ===
                                otherId
                        );


                    if (user) {

                        privateUsers.push(
                            user
                        );

                    }

                }

            });


        const groupChats =
            groups.filter(
                group =>
                    group.members.includes(
                        myProfile.id
                    )
            );


        if (
            !privateUsers.length &&
            !groupChats.length
        ) {

            list.innerHTML = `

                <div class="empty-chat">

                    <span>💬</span>

                    <h3>No chats yet</h3>

                    <p>
                        Search for a username or create a group.
                    </p>

                </div>

            `;

            return;

        }


        list.innerHTML = "";


        privateUsers.forEach(
            user => {

                const key =
                    privateChatKey(
                        myProfile.id,
                        user.id
                    );


                const messages =
                    chats[key] || [];


                const last =
                    messages[
                        messages.length - 1
                    ];


                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "chat-item";


                div.innerHTML = `

                    <div class="chat-avatar">

                        ${
                            user.image

                            ?

                            `<img
                                src="${user.image}"
                                alt=""
                            >`

                            :

                            "👤"
                        }

                    </div>


                    <div class="chat-info">

                        <strong>
                            ${escapeHTML(user.name)}
                        </strong>

                        <span>

                            ${
                                last

                                ?

                                escapeHTML(
                                    last.text ||
                                    "Attachment"
                                )

                                :

                                "Start a conversation"
                            }

                        </span>

                    </div>

                `;


                div.addEventListener(
                    "click",
                    function () {

                        openPrivateChat(
                            user
                        );

                    }
                );


                list.appendChild(
                    div
                );

            }
        );


        groupChats.forEach(
            group => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "chat-item";


                div.innerHTML = `

                    <div class="group-avatar">
                        👥
                    </div>


                    <div class="chat-info">

                        <strong>
                            ${escapeHTML(group.name)}
                        </strong>

                        <span>
                            Group •
                            ${group.members.length}
                            members
                        </span>

                    </div>

                `;


                div.addEventListener(
                    "click",
                    function () {

                        openGroupChat(
                            group
                        );

                    }
                );


                list.appendChild(
                    div
                );

            }
        );

    }


    /* =====================================================
       GROUP
    ===================================================== */

    function openGroupModal() {

        const modal =
            document.getElementById(
                "groupModal"
            );

        const memberList =
            document.getElementById(
                "groupMemberList"
            );


        if (!modal || !memberList)
            return;


        memberList.innerHTML =
            users
                .filter(
                    user =>
                        user.id !==
                        myProfile.id
                )
                .map(
                    user => `

                        <label class="group-member">

                            <input
                                type="checkbox"
                                value="${user.id}"
                            >

                            <div class="user-avatar">

                                ${
                                    user.image
                                    ?
                                    `<img src="${user.image}" alt="">`
                                    :
                                    "👤"
                                }

                            </div>

                            <span>

                                ${escapeHTML(user.name)}

                                (@${escapeHTML(user.username)})

                            </span>

                        </label>

                    `
                )
                .join("");


        modal.classList.add(
            "open"
        );

    }


    function createGroup() {

        const nameInput =
            document.getElementById(
                "groupNameInput"
            );


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";


        const selected =
            [
                ...document.querySelectorAll(
                    "#groupMemberList input:checked"
                )
            ].map(
                checkbox =>
                    checkbox.value
            );


        if (!name) {

            alert(
                "Enter a group name."
            );

            return;

        }


        if (!selected.length) {

            alert(
                "Select at least one member."
            );

            return;

        }


        const group = {

            id:
                "group_" +
                Date.now(),

            name:
                name,

            creator:
                myProfile.id,

            members:
                [
                    myProfile.id,
                    ...selected
                ],

            messages:
                [],

            created:
                Date.now()

        };


        groups.push(
            group
        );


        localStorage.setItem(
            GROUPS_KEY,
            JSON.stringify(groups)
        );


        const modal =
            document.getElementById(
                "groupModal"
            );


        if (modal) {

            modal.classList.remove(
                "open"
            );

        }


        if (nameInput) {

            nameInput.value = "";

        }


        renderGroups();
        renderChats();


        /*
           IMPORTANT:
           After creating group, directly open
           the message page.
        */

        openGroupChat(
            group
        );

    }


    function renderGroups() {

        const list =
            document.getElementById(
                "groupList"
            );


        if (!list)
            return;


        const myGroups =
            groups.filter(
                group =>
                    group.members.includes(
                        myProfile.id
                    )
            );


        if (!myGroups.length) {

            list.innerHTML = `

                <div class="empty-chat">

                    <span>👥</span>

                    <p>No groups yet.</p>

                </div>

            `;

            return;

        }


        list.innerHTML =
            myGroups
                .map(
                    group => `

                        <div
                            class="group-item"
                            data-group-id="${group.id}"
                        >

                            <div class="group-avatar">
                                👥
                            </div>

                            <div class="chat-info">

                                <strong>
                                    ${escapeHTML(group.name)}
                                </strong>

                                <span>
                                    ${group.members.length}
                                    members
                                </span>

                            </div>

                        </div>

                    `
                )
                .join("");


        list
            .querySelectorAll(
                ".group-item"
            )
            .forEach(
                item => {

                    item.addEventListener(
                        "click",
                        function () {

                            const group =
                                groups.find(
                                    g =>
                                        g.id ===
                                        item.dataset.groupId
                                );


                            if (group) {

                                openGroupChat(
                                    group
                                );

                            }

                        }
                    );

                }
            );

    }


    /* =====================================================
       OPEN GROUP CHAT
    ===================================================== */

    function openGroupChat(group) {

        if (!group)
            return;


        currentChatType =
            "group";

        currentGroup =
            group;

        currentChat =
            null;


        getElements();


        if (chatSection) {

            chatSection.style.display =
                "none";

        }


        if (messageSection) {

            messageSection.style.display =
                "block";

        }


        const title =
            document.getElementById(
                "messageTitle"
            );

        const status =
            document.getElementById(
                "messageStatus"
            );

        const avatar =
            document.getElementById(
                "messageAvatar"
            );


        if (title)
            title.textContent =
                group.name;


        if (status)
            status.textContent =
                group.members.length +
                " members";


        if (avatar)
            avatar.textContent =
                "👥";


        renderMessages();

        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       MESSAGES
    ===================================================== */

    function getMessages() {

        if (
            currentChatType ===
            "group" &&
            currentGroup
        ) {

            return currentGroup.messages ||
                [];

        }


        const key =
            privateChatKey(
                myProfile.id,
                currentChat
            );


        return chats[key] ||
            [];

    }


    function saveMessages(messages) {

        if (
            currentChatType ===
            "group" &&
            currentGroup
        ) {

            currentGroup.messages =
                messages;


            const index =
                groups.findIndex(
                    g =>
                        g.id ===
                        currentGroup.id
                );


            if (index !== -1) {

                groups[index] =
                    currentGroup;

            }


            localStorage.setItem(
                GROUPS_KEY,
                JSON.stringify(groups)
            );


            return;

        }


        const key =
            privateChatKey(
                myProfile.id,
                currentChat
            );


        chats[key] =
            messages;


        localStorage.setItem(
            CHATS_KEY,
            JSON.stringify(chats)
        );

    }


    function renderMessages() {

        const container =
            document.getElementById(
                "messagesContainer"
            );


        if (!container)
            return;


        const messages =
            getMessages();


        container.innerHTML = "";


        messages.forEach(
            message => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "message-row " +
                    (
                        message.sender ===
                        myProfile.id
                        ? "me"
                        : ""
                    );


                const bubble =
                    document.createElement(
                        "div"
                    );


                bubble.className =
                    "message-bubble";


                if (
                    message.type ===
                    "image"
                ) {

                    bubble.innerHTML = `

                        <img
                            src="${message.data}"
                            class="message-image"
                            alt="Image"
                        >

                        <span class="message-time">
                            ${formatTime(message.time)}
                        </span>

                    `;

                }

                else if (
                    message.type ===
                    "voice"
                ) {

                    bubble.innerHTML = `

                        <div class="voice-message">

                            🎤

                            <audio
                                controls
                                src="${message.data}"
                            ></audio>

                        </div>

                        <span class="message-time">
                            ${formatTime(message.time)}
                        </span>

                    `;

                }

                else {

                    bubble.innerHTML = `

                        ${escapeHTML(message.text)}

                        <span class="message-time">
                            ${formatTime(message.time)}
                        </span>

                    `;

                }


                row.appendChild(
                    bubble
                );


                container.appendChild(
                    row
                );

            }
        );


        container.scrollTop =
            container.scrollHeight;

    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    function sendTextMessage() {

        const input =
            document.getElementById(
                "messageInput"
            );


        if (!input)
            return;


        const text =
            input.value.trim();


        if (!text)
            return;


        if (
            !currentChat &&
            !currentGroup
        ) {

            alert(
                "Please open a chat first."
            );

            return;

        }


        const messages =
            getMessages();


        messages.push({

            id:
                "msg_" +
                Date.now(),

            sender:
                myProfile.id,

            text:
                text,

            type:
                "text",

            time:
                Date.now()

        });


        saveMessages(
            messages
        );


        input.value = "";


        renderMessages();
        renderChats();

    }


    /* =====================================================
       IMAGE
    ===================================================== */

    function setupImageMessages() {

        const input =
            document.getElementById(
                "imageMessageInput"
            );


        if (!input)
            return;


        input.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file)
                    return;


                const reader =
                    new FileReader();


                reader.onload =
                    function () {

                        const messages =
                            getMessages();


                        messages.push({

                            id:
                                "img_" +
                                Date.now(),

                            sender:
                                myProfile.id,

                            type:
                                "image",

                            data:
                                reader.result,

                            time:
                                Date.now()

                        });


                        saveMessages(
                            messages
                        );


                        renderMessages();
                        renderChats();

                    };


                reader.readAsDataURL(
                    file
                );


                input.value = "";

            }
        );

    }


    /* =====================================================
       VOICE
    ===================================================== */

    let mediaRecorder = null;
    let audioChunks = [];
    let recording = false;


    function setupVoice() {

        const voiceBtn =
            document.getElementById(
                "voiceBtn"
            );


        if (!voiceBtn)
            return;


        voiceBtn.addEventListener(
            "click",
            async function () {

                if (!recording) {

                    try {

                        const stream =
                            await navigator.mediaDevices
                                .getUserMedia({
                                    audio: true
                                });


                        mediaRecorder =
                            new MediaRecorder(
                                stream
                            );


                        audioChunks = [];


                        mediaRecorder.ondataavailable =
                            function (event) {

                                audioChunks.push(
                                    event.data
                                );

                            };


                        mediaRecorder.onstop =
                            function () {

                                const blob =
                                    new Blob(
                                        audioChunks,
                                        {
                                            type:
                                                "audio/webm"
                                        }
                                    );


                                const reader =
                                    new FileReader();


                                reader.onload =
                                    function () {

                                        const messages =
                                            getMessages();


                                        messages.push({

                                            id:
                                                "voice_" +
                                                Date.now(),

                                            sender:
                                                myProfile.id,

                                            type:
                                                "voice",

                                            data:
                                                reader.result,

                                            time:
                                                Date.now()

                                        });


                                        saveMessages(
                                            messages
                                        );


                                        renderMessages();
                                        renderChats();

                                    };


                                reader.readAsDataURL(
                                    blob
                                );


                                stream
                                    .getTracks()
                                    .forEach(
                                        track =>
                                            track.stop()
                                    );

                            };


                        mediaRecorder.start();

                        recording = true;

                        voiceBtn.textContent =
                            "⏹️";

                    }

                    catch (error) {

                        alert(
                            "Microphone permission is required for voice messages."
                        );

                    }

                }

                else {

                    if (mediaRecorder) {

                        mediaRecorder.stop();

                    }

                    recording = false;

                    voiceBtn.textContent =
                        "🎤";

                }

            }
        );

    }


    /* =====================================================
       EMOJIS
    ===================================================== */

    const emojiText = `
😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 🫠 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕
👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄
❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ❤️‍🔥 ❤️‍🩹 💯 💢 💥 💫 💦 💨
🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🦆 🦅 🦉 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐜 🕷️ 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦀 🐠 🐟 🐡 🐬 🐳 🐋 🦈 🐊 🐘 🦏 🦛 🦒 🦘 🦬 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🐈 🐓 🦃 🕊️ 🦜 🦚 🦢 🦩
🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 ☕ 🫖 🧃 🥤 🧋 🥛 🍵
⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥊 🥋 🎽 🛹 🛷 ⛸️ 🥌 🎿 ⛷️ 🏂 🪂 🏋️ 🤼 🤸 ⛹️ 🤺 🤾 🏌️ 🏇 🧘 🏄 🏊 🤽 🚣 🧗 🚵 🚴 🏆 🥇 🥈 🥉 🏅 🎖️
🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🛵 🏍️ 🚲 🛴 🚨 🚔 🚍 🚘 🚖 ✈️ 🛫 🛬 🚀 🛸 🚁 🚂 🚆 🚇 🚊 🚉 🚞 🚋 🚃 🚄 🚅 🚈 🚝 🚡 🚠 🚟 🚢 ⛵ 🚤 🛥️ 🛳️ ⚓
📱 💻 🖥️ 🖨️ ⌨️ 🖱️ 🖲️ 💾 💿 📀 📷 📸 📹 🎥 📞 ☎️ 📺 📻 🎙️ 🎚️ 🎛️ ⏱️ ⏰ ⌚ 🔋 🔌 💡 🔦 🕯️ 📖 📚 📕 📗 📘 📙 📓 📔 📒 📝 ✏️ ✒️ 🖊️ 🖋️ 📌 📍 📎 🔗 🔒 🔓 🔑 🛡️ ⚖️
🎉 🎊 🎈 🎂 🎁 🎀 🎗️ 🎟️ 🎫 🎪 🎭 🎨 🎬 🎤 🎧 🎼 🎵 🎶 🎹 🥁 🎷 🎺 🎸 🎻 🎲 ♟️ 🎮 🕹️ 🎯 🎳
☀️ 🌤️ ⛅ 🌥️ 🌦️ 🌧️ ⛈️ 🌩️ 🌨️ ❄️ ☃️ ⛄ 🌬️ 💨 🌪️ 🌫️ 🌈 🌙 ⭐ 🌟 ✨ ⚡ 🔥 🌊 🌍 🌎 🌏 🌱 🌿 ☘️ 🍀 🌷 🌹 🌺 🌸 🌼 🌻 🌞
`;


    function buildEmojiPicker() {

        const picker =
            document.getElementById(
                "emojiPicker"
            );


        const input =
            document.getElementById(
                "messageInput"
            );


        if (!picker || !input)
            return;


        const emojis =
            emojiText
                .trim()
                .split(/\s+/);


        picker.innerHTML = "";


        emojis.forEach(
            emoji => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "emoji";


                button.textContent =
                    emoji;


                button.addEventListener(
                    "click",
                    function () {

                        input.value +=
                            emoji;

                        input.focus();

                    }
                );


                picker.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    function loadProfile() {

        const name =
            document.getElementById(
                "profileNameInput"
            );

        const username =
            document.getElementById(
                "profileUsernameInput"
            );

        const image =
            document.getElementById(
                "myProfileImage"
            );

        const defaultIcon =
            document.getElementById(
                "defaultProfileIcon"
            );


        if (name)
            name.value =
                myProfile.name;


        if (username)
            username.value =
                myProfile.username;


        if (
            image &&
            defaultIcon
        ) {

            if (myProfile.image) {

                image.src =
                    myProfile.image;

                image.style.display =
                    "block";

                defaultIcon.style.display =
                    "none";

            }

            else {

                image.removeAttribute(
                    "src"
                );

                image.style.display =
                    "none";

                defaultIcon.style.display =
                    "flex";

            }

        }

    }


    function saveProfile() {

        const nameInput =
            document.getElementById(
                "profileNameInput"
            );

        const usernameInput =
            document.getElementById(
                "profileUsernameInput"
            );


        if (!nameInput || !usernameInput)
            return;


        const name =
            nameInput.value.trim();


        const username =
            usernameInput.value
                .trim()
                .replace(/^@/, "")
                .toLowerCase();


        if (!name || !username) {

            alert(
                "Please enter your name and username."
            );

            return;

        }


        const exists =
            users.some(
                user =>
                    user.username ===
                    username &&
                    user.id !==
                    myProfile.id
            );


        if (exists) {

            alert(
                "This username is already used."
            );

            return;

        }


        myProfile.name =
            name;

        myProfile.username =
            username;


        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(myProfile)
        );


        alert(
            "Profile saved successfully."
        );

    }


    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    function setupProfileImage() {

        const input =
            document.getElementById(
                "profileImageInput"
            );


        if (!input)
            return;


        input.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file)
                    return;


                const reader =
                    new FileReader();


                reader.onload =
                    function () {

                        myProfile.image =
                            reader.result;


                        localStorage.setItem(
                            PROFILE_KEY,
                            JSON.stringify(
                                myProfile
                            )
                        );


                        loadProfile();

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    /* =====================================================
       DELETE ACCOUNT
    ===================================================== */

    function deleteAccount() {

        const yes =
            confirm(
                "Delete your local Justice Now chat profile?"
            );


        if (!yes)
            return;


        localStorage.removeItem(
            PROFILE_KEY
        );

        localStorage.removeItem(
            REQUESTS_KEY
        );

        localStorage.removeItem(
            CHATS_KEY
        );


        alert(
            "Profile deleted from this browser."
        );


        location.reload();

    }


    /* =====================================================
       PROFILE MODAL
    ===================================================== */

    function showUserProfile(user) {

        const modal =
            document.getElementById(
                "userProfileModal"
            );

        const content =
            document.getElementById(
                "profileModalContent"
            );


        if (!modal || !content)
            return;


        content.innerHTML = `

            <div style="text-align:center;">

                <div class="profile-image-area">

                    ${
                        user.image

                        ?

                        `<img
                            src="${user.image}"
                            style="
                                display:block;
                                width:110px;
                                height:110px;
                                border-radius:50%;
                                object-fit:cover;
                                margin:auto;
                            "
                        >`

                        :

                        `
                        <div class="default-profile-icon"
                             style="margin:auto;">
                            👤
                        </div>
                        `
                    }

                </div>


                <h2>
                    ${escapeHTML(user.name)}
                </h2>


                <p style="color:#16c7b7;">
                    @${escapeHTML(user.username)}
                </p>


                <div style="
                    display:flex;
                    gap:10px;
                    justify-content:center;
                    margin-top:20px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="button"
                        id="modalMessageBtn"
                        class="teal-btn"
                    >
                        💬 Message
                    </button>


                    <button
                        type="button"
                        id="modalRequestBtn"
                        class="outline-btn"
                    >
                        👥 Send Request
                    </button>

                </div>

            </div>

        `;


        modal.classList.add(
            "open"
        );


        const messageBtn =
            document.getElementById(
                "modalMessageBtn"
            );

        const requestBtn =
            document.getElementById(
                "modalRequestBtn"
            );


        if (messageBtn) {

            messageBtn.addEventListener(
                "click",
                function () {

                    modal.classList.remove(
                        "open"
                    );

                    openPrivateChat(
                        user
                    );

                }
            );

        }


        if (requestBtn) {

            requestBtn.addEventListener(
                "click",
                function () {

                    sendRequest(
                        user.id
                    );

                }
            );

        }

    }


    /* =====================================================
       GROUP MANAGEMENT
    ===================================================== */

    function saveGroup() {

        if (!currentGroup)
            return;


        const index =
            groups.findIndex(
                group =>
                    group.id ===
                    currentGroup.id
            );


        if (index !== -1) {

            groups[index] =
                currentGroup;

        }


        localStorage.setItem(
            GROUPS_KEY,
            JSON.stringify(groups)
        );


        renderGroups();
        renderChats();

    }


    /* =====================================================
       GROUP MEMBERS
    ===================================================== */

    function addGroupMember() {

        if (!currentGroup)
            return;


        const available =
            users.filter(
                user =>
                    user.id !==
                    myProfile.id &&

                    !currentGroup.members.includes(
                        user.id
                    )
            );


        if (!available.length) {

            alert(
                "No more users available."
            );

            return;

        }


        const names =
            available
                .map(
                    (user, index) =>
                        `${index + 1}. ${user.name} (@${user.username})`
                )
                .join("\n");


        const answer =
            prompt(
                "Enter member number to add:\n\n" +
                names
            );


        const number =
            parseInt(
                answer,
                10
            );


        if (
            !number ||
            number < 1 ||
            number > available.length
        )
            return;


        const user =
            available[
                number - 1
            ];


        currentGroup.members.push(
            user.id
        );


        saveGroup();


        const status =
            document.getElementById(
                "messageStatus"
            );


        if (status) {

            status.textContent =
                currentGroup.members.length +
                " members";

        }


        alert(
            user.name +
            " added to the group."
        );

    }


    function removeGroupMember() {

        if (!currentGroup)
            return;


        const available =
            currentGroup.members
                .filter(
                    id =>
                        id !==
                        myProfile.id
                )
                .map(
                    id =>
                        users.find(
                            user =>
                                user.id ===
                                id
                        )
                )
                .filter(Boolean);


        if (!available.length) {

            alert(
                "There are no other members to remove."
            );

            return;

        }


        const names =
            available
                .map(
                    (user, index) =>
                        `${index + 1}. ${user.name}`
                )
                .join("\n");


        const answer =
            prompt(
                "Enter member number to remove:\n\n" +
                names
            );


        const number =
            parseInt(
                answer,
                10
            );


        if (
            !number ||
            number < 1 ||
            number > available.length
        )
            return;


        const user =
            available[
                number - 1
            ];


        currentGroup.members =
            currentGroup.members.filter(
                id =>
                    id !==
                    user.id
            );


        saveGroup();


        alert(
            user.name +
            " removed."
        );

    }


    function leaveGroup() {

        if (!currentGroup)
            return;


        const yes =
            confirm(
                "Leave this group?"
            );


        if (!yes)
            return;


        currentGroup.members =
            currentGroup.members.filter(
                id =>
                    id !==
                    myProfile.id
            );


        saveGroup();


        const modal =
            document.getElementById(
                "groupManageModal"
            );


        if (modal) {

            modal.classList.remove(
                "open"
            );

        }


        backToChat();

    }


    function deleteGroup() {

        if (!currentGroup)
            return;


        if (
            currentGroup.creator !==
            myProfile.id
        ) {

            alert(
                "Only the group creator can delete the group."
            );

            return;

        }


        const yes =
            confirm(
                "Delete this group permanently?"
            );


        if (!yes)
            return;


        groups =
            groups.filter(
                group =>
                    group.id !==
                    currentGroup.id
            );


        localStorage.setItem(
            GROUPS_KEY,
            JSON.stringify(groups)
        );


        const modal =
            document.getElementById(
                "groupManageModal"
            );


        if (modal) {

            modal.classList.remove(
                "open"
            );

        }


        currentGroup =
            null;


        backToChat();


        renderGroups();
        renderChats();

    }


    /* =====================================================
       BACK TO CHAT
    ===================================================== */

    function backToChat() {

        getElements();


        if (messageSection) {

            messageSection.style.display =
                "none";

        }


        if (chatSection) {

            chatSection.style.display =
                "block";

        }


        renderChats();
        renderGroups();


        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       PRIVATE MENU
    ===================================================== */

    function showPrivateMenu() {

        if (!currentChat)
            return;


        const user =
            users.find(
                u =>
                    u.id ===
                    currentChat
            );


        if (!user)
            return;


        const choice =
            prompt(
                "Choose an option:\n\n" +
                "1 - User Profile\n" +
                "2 - Delete Chat\n" +
                "3 - Block User\n" +
                "4 - Mute"
            );


        if (choice === "1") {

            showUserProfile(
                user
            );

        }

        else if (choice === "2") {

            deletePrivateChat(
                user.id
            );

        }

        else if (choice === "3") {

            blockUser(
                user.id
            );

        }

        else if (choice === "4") {

            alert(
                "Chat muted."
            );

        }

    }


    function deletePrivateChat(userId) {

        const key =
            privateChatKey(
                myProfile.id,
                userId
            );


        delete chats[key];


        localStorage.setItem(
            CHATS_KEY,
            JSON.stringify(chats)
        );


        alert(
            "Chat deleted."
        );


        backToChat();

    }


    function blockUser(userId) {

        let blocked =
            JSON.parse(
                localStorage.getItem(
                    "justiceNowBlocked"
                ) || "[]"
            );


        if (!blocked.includes(userId)) {

            blocked.push(
                userId
            );

        }


        localStorage.setItem(
            "justiceNowBlocked",
            JSON.stringify(blocked)
        );


        alert(
            "User blocked."
        );

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function setupEvents() {

        getElements();


        /* Chat button */

        setupChatButton();


        /* Close */

        setupCloseButton();


        /* Back from message */

        if (backFromMessageBtn) {

            backFromMessageBtn.addEventListener(
                "click",
                backToChat
            );

        }


        /* Tabs */

        setupTabs();


        /* Search */

        setupSearch();


        /* Create group */

        const createGroupBtn =
            document.getElementById(
                "createGroupBtn"
            );

        const createGroupBtn2 =
            document.getElementById(
                "createGroupBtn2"
            );


        if (createGroupBtn) {

            createGroupBtn.addEventListener(
                "click",
                openGroupModal
            );

        }


        if (createGroupBtn2) {

            createGroupBtn2.addEventListener(
                "click",
                openGroupModal
            );

        }


        /* Create group confirm */

        const createGroupConfirm =
            document.getElementById(
                "createGroupConfirm"
            );


        if (createGroupConfirm) {

            createGroupConfirm.addEventListener(
                "click",
                createGroup
            );

        }


        /* Close group modal */

        const closeGroupModal =
            document.getElementById(
                "closeGroupModal"
            );


        if (closeGroupModal) {

            closeGroupModal.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "groupModal"
                        )
                        ?.classList.remove(
                            "open"
                        );

                }
            );

        }


        /* Close profile */

        const closeUserProfile =
            document.getElementById(
                "closeUserProfile"
            );


        if (closeUserProfile) {

            closeUserProfile.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "userProfileModal"
                        )
                        ?.classList.remove(
                            "open"
                        );

                }
            );

        }


        /* Save profile */

        document
            .getElementById(
                "saveProfileBtn"
            )
            ?.addEventListener(
                "click",
                saveProfile
            );


        /* Profile picture */

        setupProfileImage();


        /* Delete account */

        document
            .getElementById(
                "deleteAccountBtn"
            )
            ?.addEventListener(
                "click",
                deleteAccount
            );


        /* Send message */

        document
            .getElementById(
                "sendMessageBtn"
            )
            ?.addEventListener(
                "click",
                sendTextMessage
            );


        /* Enter message */

        document
            .getElementById(
                "messageInput"
            )
            ?.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter" &&
                        !event.shiftKey
                    ) {

                        event.preventDefault();

                        sendTextMessage();

                    }

                }
            );


        /* Image */

        setupImageMessages();


        /* Voice */

        setupVoice();


        /* Emoji */

        buildEmojiPicker();


        document
            .getElementById(
                "emojiBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "emojiPicker"
                        )
                        ?.classList.toggle(
                            "open"
                        );

                }
            );


        /* Profile / More / Call */

        document
            .getElementById(
                "messageProfileBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    if (
                        currentChatType ===
                        "private"
                    ) {

                        const user =
                            users.find(
                                u =>
                                    u.id ===
                                    currentChat
                            );


                        if (user) {

                            showUserProfile(
                                user
                            );

                        }

                    }

                }
            );


        document
            .getElementById(
                "messageMoreBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    if (
                        currentChatType ===
                        "group"
                    ) {

                        document
                            .getElementById(
                                "groupManageModal"
                            )
                            ?.classList.add(
                                "open"
                            );

                    }

                    else {

                        showPrivateMenu();

                    }

                }
            );


        document
            .getElementById(
                "callBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    if (
                        currentChatType ===
                        "private"
                    ) {

                        const user =
                            users.find(
                                u =>
                                    u.id ===
                                    currentChat
                            );


                        if (user) {

                            alert(
                                "Calling " +
                                user.name +
                                "..."
                            );

                        }

                    }

                    else {

                        alert(
                            "Group call selected."
                        );

                    }

                }
            );


        /* Group management */

        document
            .getElementById(
                "closeGroupManage"
            )
            ?.addEventListener(
                "click",
                function () {

                    document
                        .getElementById(
                            "groupManageModal"
                        )
                        ?.classList.remove(
                            "open"
                        );

                }
            );


        document
            .getElementById(
                "addGroupMemberBtn"
            )
            ?.addEventListener(
                "click",
                addGroupMember
            );


        document
            .getElementById(
                "removeGroupMemberBtn"
            )
            ?.addEventListener(
                "click",
                removeGroupMember
            );


        document
            .getElementById(
                "leaveGroupBtn"
            )
            ?.addEventListener(
                "click",
                leaveGroup
            );


        document
            .getElementById(
                "deleteGroupBtn"
            )
            ?.addEventListener(
                "click",
                deleteGroup
            );


        /* Dynamic profile/request buttons */

        document.addEventListener(
            "click",
            function (event) {

                const profileBtn =
                    event.target.closest(
                        ".profile-user-btn"
                    );


                if (profileBtn) {

                    const user =
                        users.find(
                            u =>
                                u.id ===
                                profileBtn.dataset.id
                        );


                    if (user) {

                        showUserProfile(
                            user
                        );

                    }

                    return;

                }


                const requestBtn =
                    event.target.closest(
                        ".request-user-btn"
                    );


                if (requestBtn) {

                    sendRequest(
                        requestBtn.dataset.id
                    );

                    return;

                }


                const acceptBtn =
                    event.target.closest(
                        ".accept-request"
                    );


                if (acceptBtn) {

                    acceptRequest(
                        acceptBtn.dataset.id
                    );

                    return;

                }


                const rejectBtn =
                    event.target.closest(
                        ".reject-request"
                    );


                if (rejectBtn) {

                    rejectRequest(
                        rejectBtn.dataset.id
                    );

                }

            }
        );

    }


    /* =====================================================
       ACCEPT REQUEST
    ===================================================== */

    function acceptRequest(requestId) {

        const request =
            requests.find(
                r =>
                    r.id ===
                    requestId
            );


        if (!request)
            return;


        request.status =
            "accepted";


        localStorage.setItem(
            REQUESTS_KEY,
            JSON.stringify(requests)
        );


        createPrivateChat(
            request.from
        );


        renderRequests();
        renderChats();

    }


    /* =====================================================
       REJECT REQUEST
    ===================================================== */

    function rejectRequest(requestId) {

        requests =
            requests.filter(
                r =>
                    r.id !==
                    requestId
            );


        localStorage.setItem(
            REQUESTS_KEY,
            JSON.stringify(requests)
        );


        renderRequests();

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    /* =====================================================
       TIME
    ===================================================== */

    function formatTime(timestamp) {

        return new Date(
            timestamp
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initializeChat() {

        getElements();

        setupEvents();

        renderChats();
        renderRequests();
        renderGroups();
        loadProfile();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeChat
        );

    }

    else {

        initializeChat();

    }


    /* =====================================================
       GLOBAL FUNCTIONS
    ===================================================== */

    window.openJusticeNowChat =
        openChatPage;

    window.closeJusticeNowChat =
        closeChatPage;

})();