
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
   JUSTICE NOW CHAT
   COMPLETE CHAT WORKING
   PROFILE + SEARCH + CHAT + GROUP + VOICE + CALL
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       STORAGE
    ===================================================== */

    const PROFILE_KEY = "justiceNowChatProfile";
    const USERS_KEY = "justiceNowChatUsers";
    const CHATS_KEY = "justiceNowChatConversations";
    const GROUPS_KEY = "justiceNowChatGroups";


    /* =====================================================
       HELPERS
    ===================================================== */

    function getJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }


    function setJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }


    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function makeId(prefix) {
        return prefix + "_" + Date.now() + "_" +
            Math.random().toString(36).slice(2, 8);
    }


    function getProfile() {
        return getJSON(PROFILE_KEY, null);
    }


    function getUsers() {
        return getJSON(USERS_KEY, []);
    }


    function getChats() {
        return getJSON(CHATS_KEY, {});
    }


    function getGroups() {
        return getJSON(GROUPS_KEY, []);
    }


    function saveChats(chats) {
        setJSON(CHATS_KEY, chats);
    }


    function currentUsername() {

        const profile = getProfile();

        return profile && profile.username
            ? profile.username
            : "me";
    }


    function chatKey(type, id) {
        return type + ":" + id;
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const chatPage = document.getElementById("justiceChatPage");
    const openChatBtn = document.getElementById("openChatBtn");
    const closeChatBtn = document.getElementById("closeChatBtn");

    if (!chatPage) {
        return;
    }


    /* =====================================================
       OPEN / CLOSE CHAT
    ===================================================== */

    function openChat() {

        chatPage.classList.add("active");

        loadProfile();

        showChatView("profile");

        renderChatList();

        renderGroups();
    }


    function closeChat() {

        chatPage.classList.remove("active");

        const homePage = document.getElementById("homePage");

        if (homePage) {
            homePage.style.display = "";
            homePage.classList.add("active");
        }
    }


    if (openChatBtn) {

        openChatBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            openChat();

        });

    }


    if (closeChatBtn) {

        closeChatBtn.addEventListener("click", function () {

            closeChat();

        });

    }


    /* =====================================================
       SIDEBAR
    ===================================================== */

    document.querySelectorAll("[data-chat-view]").forEach(function (button) {

        button.addEventListener("click", function () {

            const view = button.getAttribute("data-chat-view");

            showChatView(view);

        });

    });


    function showChatView(view) {

        document.querySelectorAll(".jn-chat-view").forEach(function (section) {
            section.classList.remove("active");
        });


        document.querySelectorAll(".jn-sidebar-btn").forEach(function (button) {
            button.classList.remove("active");
        });


        let targetId = "";


        if (view === "profile") {
            targetId = "jnViewProfile";
        }

        if (view === "search") {
            targetId = "jnViewSearch";
        }

        if (view === "chats") {
            targetId = "jnViewChats";
            renderChatList();
        }

        if (view === "groups") {
            targetId = "jnViewGroups";
            renderGroups();
        }


        const target = document.getElementById(targetId);

        if (target) {
            target.classList.add("active");
        }


        const activeButton =
            document.querySelector(
                '[data-chat-view="' + view + '"]'
            );

        if (activeButton) {
            activeButton.classList.add("active");
        }

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    const usernameInput =
        document.getElementById("jnUsernameInput");

    const profileNameInput =
        document.getElementById("jnProfileNameInput");

    const profilePreview =
        document.getElementById("jnProfilePreview");

    const profileImageInput =
        document.getElementById("jnProfileImageInput");

    const saveProfileBtn =
        document.getElementById("jnSaveProfile");

    const deleteProfileBtn =
        document.getElementById("jnDeleteProfile");

    const profileStatus =
        document.getElementById("jnProfileStatus");


    let pendingProfileImage = "";


    function loadProfile() {

        const profile = getProfile();

        if (!profile) {

            if (usernameInput) {
                usernameInput.value = "";
            }

            if (profileNameInput) {
                profileNameInput.value = "";
            }

            if (profilePreview) {
                profilePreview.innerHTML = "<span>👤</span>";
            }

            return;
        }


        if (usernameInput) {
            usernameInput.value = profile.username || "";
        }


        if (profileNameInput) {
            profileNameInput.value = profile.name || "";
        }


        pendingProfileImage = profile.image || "";


        if (profilePreview) {

            if (profile.image) {

                profilePreview.innerHTML =
                    '<img src="' +
                    profile.image +
                    '" alt="Profile">';

            } else {

                profilePreview.innerHTML =
                    "<span>👤</span>";

            }

        }

    }


    if (profileImageInput) {

        profileImageInput.addEventListener("change", function () {

            const file = this.files && this.files[0];

            if (!file) {
                return;
            }


            const reader = new FileReader();


            reader.onload = function (event) {

                pendingProfileImage =
                    event.target.result;


                if (profilePreview) {

                    profilePreview.innerHTML =
                        '<img src="' +
                        pendingProfileImage +
                        '" alt="Profile">';

                }

            };


            reader.readAsDataURL(file);

        });

    }


    if (saveProfileBtn) {

        saveProfileBtn.addEventListener("click", function () {

            const username =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";

            const name =
                profileNameInput
                    ? profileNameInput.value.trim()
                    : "";


            if (!username || !name) {

                if (profileStatus) {
                    profileStatus.textContent =
                        "Please enter username and profile name.";
                }

                return;
            }


            const profile = {
                username: username.replace(/^@/, ""),
                name: name,
                image: pendingProfileImage || "",
                online: true
            };


            setJSON(PROFILE_KEY, profile);


            /*
             * Save this profile as a searchable local user.
             */

            let users = getUsers();


            const existingIndex = users.findIndex(function (user) {

                return user.username.toLowerCase() ===
                    profile.username.toLowerCase();

            });


            if (existingIndex >= 0) {

                users[existingIndex] = profile;

            } else {

                users.push(profile);

            }


            setJSON(USERS_KEY, users);


            if (profileStatus) {

                profileStatus.textContent =
                    "Profile saved successfully.";

            }

        });

    }


    if (deleteProfileBtn) {

        deleteProfileBtn.addEventListener("click", function () {

            const confirmed =
                window.confirm(
                    "Delete your chat profile?"
                );

            if (!confirmed) {
                return;
            }


            localStorage.removeItem(PROFILE_KEY);


            if (usernameInput) {
                usernameInput.value = "";
            }

            if (profileNameInput) {
                profileNameInput.value = "";
            }


            pendingProfileImage = "";


            if (profilePreview) {
                profilePreview.innerHTML =
                    "<span>👤</span>";
            }


            if (profileStatus) {

                profileStatus.textContent =
                    "Profile deleted.";

            }

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("jnUserSearchInput");

    const searchButton =
        document.getElementById("jnSearchUserBtn");

    const searchResults =
        document.getElementById("jnSearchResults");


    function performSearch() {

        if (!searchResults) {
            return;
        }


        const query =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";


        if (!query) {

            searchResults.innerHTML = `
                <div class="jn-empty-state">
                    <span>🔍</span>
                    <h3>Search for a user</h3>
                    <p>Enter a username or profile name above.</p>
                </div>
            `;

            return;
        }


        const users = getUsers();

        const myProfile = getProfile();


        const matches = users.filter(function (user) {

            if (
                myProfile &&
                user.username.toLowerCase() ===
                myProfile.username.toLowerCase()
            ) {
                return false;
            }


            return (
                user.username.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query)
            );

        });


        if (!matches.length) {

            searchResults.innerHTML = `
                <div class="jn-empty-state">
                    <span>👤</span>
                    <h3>No user found</h3>
                    <p>Try another username or profile name.</p>
                </div>
            `;

            return;
        }


        searchResults.innerHTML = "";


        matches.forEach(function (user) {

            const result =
                document.createElement("div");

            result.className = "jn-user-result";


            const avatar =
                user.image
                    ? `<img src="${user.image}" alt="Profile">`
                    : "👤";


            result.innerHTML = `

                <div class="jn-user-main">

                    <div class="jn-user-avatar">
                        ${avatar}
                    </div>

                    <div class="jn-user-info">

                        <h3>${escapeHTML(user.name)}</h3>

                        <p>@${escapeHTML(user.username)}</p>

                    </div>

                </div>


                <button
                    type="button"
                    class="jn-primary-btn jn-message-user-btn">
                    💬 Message
                </button>

            `;


            const messageButton =
                result.querySelector(".jn-message-user-btn");


            messageButton.addEventListener(
                "click",
                function () {

                    openPrivateChat(user);

                }
            );


            searchResults.appendChild(result);

        });

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       NEW CHAT
    ===================================================== */

    const newChatSearchBtn =
        document.getElementById("jnNewChatSearchBtn");


    if (newChatSearchBtn) {

        newChatSearchBtn.addEventListener(
            "click",
            function () {

                showChatView("search");

                if (searchInput) {
                    searchInput.focus();
                }

            }
        );

    }


    /* =====================================================
       PRIVATE CHAT
    ===================================================== */

    let activeConversation = null;


    function openPrivateChat(user) {

        activeConversation = {
            type: "private",
            id: user.username,
            title: user.name,
            username: user.username,
            image: user.image || ""
        };


        openMessageView();

    }


    function openMessageView() {

        document.querySelectorAll(".jn-chat-view")
            .forEach(function (section) {
                section.classList.remove("active");
            });


        const messageView =
            document.getElementById("jnViewMessages");


        if (messageView) {
            messageView.classList.add("active");
        }


        renderActiveConversation();

    }


    function renderActiveConversation() {

        if (!activeConversation) {
            return;
        }


        const title =
            document.getElementById("jnMessageTitle");

        const status =
            document.getElementById("jnMessageStatus");

        const avatar =
            document.getElementById("jnMessageAvatar");


        if (title) {
            title.textContent =
                activeConversation.title;
        }


        if (status) {

            status.textContent = "● Online";

            status.classList.add("online");

        }


        if (avatar) {

            if (activeConversation.image) {

                avatar.innerHTML =
                    `<img src="${activeConversation.image}" alt="Profile">`;

            } else {

                avatar.innerHTML = "👤";

            }

        }


        renderMessages();

    }


    /* =====================================================
       MESSAGE STORAGE
    ===================================================== */

    function getActiveMessages() {

        if (!activeConversation) {
            return [];
        }


        const chats = getChats();

        const key =
            chatKey(
                activeConversation.type,
                activeConversation.id
            );


        return chats[key] || [];

    }


    function saveActiveMessages(messages) {

        if (!activeConversation) {
            return;
        }


        const chats = getChats();


        const key =
            chatKey(
                activeConversation.type,
                activeConversation.id
            );


        chats[key] = messages;

        saveChats(chats);

    }


    /* =====================================================
       RENDER MESSAGES
    ===================================================== */

    function renderMessages() {

        const container =
            document.getElementById(
                "jnMessagesContainer"
            );


        if (!container) {
            return;
        }


        const messages =
            getActiveMessages();


        container.innerHTML = "";


        if (!messages.length) {

            container.innerHTML = `
                <div class="jn-empty-state">
                    <span>💬</span>
                    <h3>Start a conversation</h3>
                    <p>Send your first message.</p>
                </div>
            `;

            return;
        }


        messages.forEach(function (message) {

            const row =
                document.createElement("div");


            row.className =
                "jn-message-row" +
                (message.mine ? " mine" : "");


            const bubble =
                document.createElement("div");


            bubble.className =
                "jn-message-bubble";


            if (message.type === "image") {

                bubble.innerHTML = `

                    <img
                        src="${message.content}"
                        class="jn-message-image"
                        alt="Sent image">

                    <div class="jn-message-time">
                        ${escapeHTML(message.time)}
                    </div>
                `;

            } else if (message.type === "voice") {

                bubble.innerHTML = `

                    <div class="jn-voice-message">

                        <span>🎤</span>

                        <audio
                            controls
                            src="${message.content}">
                        </audio>

                    </div>

                    <div class="jn-message-time">
                        ${escapeHTML(message.time)}
                    </div>

                `;

            } else {

                bubble.innerHTML = `

                    <div>
                        ${escapeHTML(message.content)}
                    </div>

                    <div class="jn-message-time">
                        ${escapeHTML(message.time)}
                    </div>

                `;

            }


            row.appendChild(bubble);

            container.appendChild(row);

        });


        container.scrollTop =
            container.scrollHeight;

    }


    /* =====================================================
       TEXT MESSAGE
    ===================================================== */

    const messageInput =
        document.getElementById(
            "jnMessageInput"
        );


    const sendMessageBtn =
        document.getElementById(
            "jnSendMessageBtn"
        );


    function sendTextMessage() {

        if (!activeConversation || !messageInput) {
            return;
        }


        const text =
            messageInput.value.trim();


        if (!text) {
            return;
        }


        const messages =
            getActiveMessages();


        messages.push({

            id: makeId("msg"),

            type: "text",

            content: text,

            mine: true,

            sender: currentUsername(),

            time: new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

        });


        saveActiveMessages(messages);


        messageInput.value = "";


        renderMessages();

        renderChatList();

        renderGroups();

    }


    if (sendMessageBtn) {

        sendMessageBtn.addEventListener(
            "click",
            sendTextMessage
        );

    }


    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendTextMessage();

                }

            }
        );

    }


    /* =====================================================
       BACK FROM MESSAGE
    ===================================================== */

    const backMessageBtn =
        document.getElementById(
            "jnBackFromMessage"
        );


    if (backMessageBtn) {

        backMessageBtn.addEventListener(
            "click",
            function () {

                if (
                    activeConversation &&
                    activeConversation.type === "group"
                ) {

                    showChatView("groups");

                } else {

                    showChatView("chats");

                }

                activeConversation = null;

            }
        );

    }


    /* =====================================================
       IMAGE MESSAGE
    ===================================================== */

    const imageBtn =
        document.getElementById("jnImageBtn");

    const imageInput =
        document.getElementById("jnImageInput");


    if (imageBtn && imageInput) {

        imageBtn.addEventListener(
            "click",
            function () {

                imageInput.click();

            }
        );


        imageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files && this.files[0];


                if (!file || !activeConversation) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        const messages =
                            getActiveMessages();


                        messages.push({

                            id: makeId("image"),

                            type: "image",

                            content:
                                event.target.result,

                            mine: true,

                            time:
                                new Date().toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }
                                )

                        });


                        saveActiveMessages(messages);

                        renderMessages();

                        imageInput.value = "";

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       VOICE MESSAGE
    ===================================================== */

    const voiceBtn =
        document.getElementById(
            "jnVoiceBtn"
        );


    let mediaRecorder = null;

    let voiceChunks = [];

    let voiceStream = null;


    async function startVoiceRecording() {

        if (!activeConversation) {

            alert(
                "Please open a chat first."
            );

            return;
        }


        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            alert(
                "Voice recording is not supported by this browser."
            );

            return;

        }


        try {

            voiceStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });


            voiceChunks = [];


            mediaRecorder =
                new MediaRecorder(
                    voiceStream
                );


            mediaRecorder.ondataavailable =
                function (event) {

                    if (event.data.size > 0) {
                        voiceChunks.push(event.data);
                    }

                };


            mediaRecorder.onstop =
                function () {

                    const audioBlob =
                        new Blob(
                            voiceChunks,
                            {
                                type:
                                    mediaRecorder.mimeType ||
                                    "audio/webm"
                            }
                        );


                    const audioURL =
                        URL.createObjectURL(
                            audioBlob
                        );


                    /*
                     * Store the voice message in this
                     * browser session.
                     */

                    const messages =
                        getActiveMessages();


                    messages.push({

                        id: makeId("voice"),

                        type: "voice",

                        content: audioURL,

                        mine: true,

                        temporary: true,

                        time:
                            new Date().toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            )

                    });


                    saveActiveMessages(messages);


                    renderMessages();


                    if (voiceStream) {

                        voiceStream
                            .getTracks()
                            .forEach(function (track) {
                                track.stop();
                            });

                    }


                    voiceStream = null;

                };


            mediaRecorder.start();


            if (voiceBtn) {

                voiceBtn.classList.add(
                    "jn-recording"
                );

                voiceBtn.textContent = "⏹";

                voiceBtn.title =
                    "Stop recording";

            }

        } catch (error) {

            console.error(error);

            alert(
                "Microphone permission was not allowed."
            );

        }

    }


    function stopVoiceRecording() {

        if (
            mediaRecorder &&
            mediaRecorder.state !== "inactive"
        ) {

            mediaRecorder.stop();

        }


        if (voiceBtn) {

            voiceBtn.classList.remove(
                "jn-recording"
            );

            voiceBtn.textContent = "🎤";

            voiceBtn.title =
                "Voice message";

        }

    }


    if (voiceBtn) {

        voiceBtn.addEventListener(
            "click",
            function () {

                if (
                    mediaRecorder &&
                    mediaRecorder.state === "recording"
                ) {

                    stopVoiceRecording();

                } else {

                    startVoiceRecording();

                }

            }
        );

    }


    /* =====================================================
       EMOJI
    ===================================================== */

    const emojiBtn =
        document.getElementById(
            "jnEmojiBtn"
        );


    const emojiPanel =
        document.getElementById(
            "jnEmojiPanel"
        );


    const emojiList = [

        "😀","😃","😄","😁","😆","😅","😂","🤣",
        "😊","😇","🙂","🙃","😉","😌","😍","🥰",
        "😘","😗","😙","😚","😋","😛","😝","😜",
        "🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳",
        "😏","😒","😞","😔","😟","😕","🙁","☹️",
        "😣","😖","😫","😩","🥺","😢","😭","😤",
        "😠","😡","🤬","🤯","😳","🥵","🥶","😱",
        "😨","😰","😥","😓","🤗","🤔","🫣","🤭",
        "🤫","🤥","😶","😐","😑","😬","🙄","😯",
        "😦","😧","😮","😲","🥱","😴","🤤","😪",
        "😵","🤐","🥴","🤢","🤮","🤧","😷","🤒",
        "🤕","🤑","🤠","😈","👿","👹","👺","🤡",
        "💩","👻","💀","☠️","👽","👾","🤖","🎃",
        "😺","😸","😹","😻","😼","😽","🙀","😿",
        "😾","❤️","🧡","💛","💚","💙","💜","🖤",
        "🤍","🤎","💔","❣️","💕","💞","💓","💗",
        "💖","💘","💝","💟","👍","👎","👌","✌️",
        "🤞","🤟","🤘","🤙","👏","🙌","👐","🤝",
        "🙏","💪","🔥","✨","⭐","🌟","💯","🎉",
        "🎊","✅","❌","⚖️","🚨","📞","💬","🎤"

    ];


    function buildEmojiPanel() {

        if (!emojiPanel) {
            return;
        }


        emojiPanel.innerHTML = "";


        emojiList.forEach(function (emoji) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "jn-emoji-item";

            button.textContent =
                emoji;


            button.addEventListener(
                "click",
                function () {

                    if (!messageInput) {
                        return;
                    }


                    messageInput.value += emoji;

                    messageInput.focus();

                }
            );


            emojiPanel.appendChild(button);

        });

    }


    buildEmojiPanel();


    if (emojiBtn && emojiPanel) {

        emojiBtn.addEventListener(
            "click",
            function () {

                emojiPanel.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       MESSAGE MENU
    ===================================================== */

    const messageMenuBtn =
        document.getElementById(
            "jnMessageMenuBtn"
        );


    const messageMenu =
        document.getElementById(
            "jnMessageMenu"
        );


    if (messageMenuBtn && messageMenu) {

        messageMenuBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                messageMenu.classList.toggle(
                    "active"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        function () {

            if (messageMenu) {
                messageMenu.classList.remove(
                    "active"
                );
            }


            if (emojiPanel) {
                emojiPanel.classList.remove(
                    "active"
                );
            }

        }
    );


    if (messageMenu) {

        messageMenu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       MUTE / DELETE / BLOCK
    ===================================================== */

    document.querySelectorAll(
        "[data-menu-action]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.getAttribute(
                        "data-menu-action"
                    );


                if (!activeConversation) {
                    return;
                }


                if (action === "mute") {

                    alert(
                        "Notifications setting changed."
                    );

                }


                if (action === "delete-chat") {

                    const chats =
                        getChats();


                    const key =
                        chatKey(
                            activeConversation.type,
                            activeConversation.id
                        );


                    delete chats[key];

                    saveChats(chats);


                    alert(
                        "Chat deleted."
                    );


                    renderMessages();

                    renderChatList();

                }


                if (action === "delete-messages") {

                    const messages =
                        getActiveMessages();


                    const myMessages =
                        messages.filter(function (message) {
                            return !message.mine;
                        });


                    saveActiveMessages(
                        myMessages
                    );


                    renderMessages();

                    alert(
                        "Your messages were deleted."
                    );

                }


                if (action === "block") {

                    alert(
                        "User blocked in this prototype."
                    );

                }


                messageMenu.classList.remove(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       CHAT LIST
    ===================================================== */

    function renderChatList() {

        const list =
            document.getElementById(
                "jnChatList"
            );


        if (!list) {
            return;
        }


        const chats =
            getChats();


        const keys =
            Object.keys(chats);


        if (!keys.length) {

            list.innerHTML = `
                <div class="jn-empty-state">
                    <span>💬</span>
                    <h3>No chats yet</h3>
                    <p>Search for a user to start chatting.</p>
                </div>
            `;

            return;
        }


        list.innerHTML = "";


        keys.forEach(function (key) {

            const messages =
                chats[key];


            if (!messages || !messages.length) {
                return;
            }


            const parts =
                key.split(":");


            const type =
                parts[0];


            const id =
                parts.slice(1).join(":");


            if (type !== "private") {
                return;
            }


            const users =
                getUsers();


            const user =
                users.find(function (item) {

                    return item.username === id;

                });


            const title =
                user
                    ? user.name
                    : id;


            const image =
                user
                    ? user.image
                    : "";


            const last =
                messages[messages.length - 1];


            const item =
                document.createElement("div");


            item.className =
                "jn-conversation";


            item.innerHTML = `

                <div class="jn-user-avatar">
                    ${
                        image
                            ? `<img src="${image}" alt="">`
                            : "👤"
                    }
                </div>

                <div class="jn-conversation-info">

                    <h3>${escapeHTML(title)}</h3>

                    <p>
                        ${
                            last.type === "text"
                                ? escapeHTML(last.content)
                                : last.type === "voice"
                                    ? "🎤 Voice message"
                                    : "🖼 Image"
                        }
                    </p>

                </div>

            `;


            item.addEventListener(
                "click",
                function () {

                    openPrivateChat({

                        username: id,

                        name: title,

                        image: image || ""

                    });

                }
            );


            list.appendChild(item);

        });

    }


    /* =====================================================
       GROUP CREATION
    ===================================================== */

    const createGroupBtn =
        document.getElementById(
            "jnCreateGroupBtn"
        );


    const closeGroupPanel =
        document.getElementById(
            "jnCloseGroupPanel"
        );


    const createGroupPanel =
        document.getElementById(
            "jnCreateGroupPanel"
        );


    const groupNameInput =
        document.getElementById(
            "jnGroupNameInput"
        );


    const groupImageInput =
        document.getElementById(
            "jnGroupImageInput"
        );


    const groupPicturePreview =
        document.getElementById(
            "jnGroupPicturePreview"
        );


    const groupMemberSearch =
        document.getElementById(
            "jnGroupMemberSearch"
        );


    const addGroupMemberBtn =
        document.getElementById(
            "jnAddGroupMemberBtn"
        );


    const groupMemberResults =
        document.getElementById(
            "jnGroupMemberResults"
        );


    const selectedMembersList =
        document.getElementById(
            "jnSelectedMembersList"
        );


    const saveGroupBtn =
        document.getElementById(
            "jnSaveGroupBtn"
        );


    let pendingGroupImage = "";

    let selectedGroupMembers = [];


    if (createGroupBtn) {

        createGroupBtn.addEventListener(
            "click",
            function () {

                createGroupPanel.classList.add(
                    "active"
                );

            }
        );

    }


    if (closeGroupPanel) {

        closeGroupPanel.addEventListener(
            "click",
            function () {

                createGroupPanel.classList.remove(
                    "active"
                );

            }
        );

    }


    if (groupImageInput) {

        groupImageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files && this.files[0];


                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        pendingGroupImage =
                            event.target.result;


                        if (groupPicturePreview) {

                            groupPicturePreview.innerHTML =
                                `<img src="${pendingGroupImage}" alt="">`;

                        }

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    function searchGroupMember() {

        if (!groupMemberResults) {
            return;
        }


        const query =
            groupMemberSearch
                ? groupMemberSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        if (!query) {

            groupMemberResults.innerHTML = "";

            return;
        }


        const users =
            getUsers();


        const myProfile =
            getProfile();


        const results =
            users.filter(function (user) {

                if (
                    myProfile &&
                    user.username.toLowerCase() ===
                    myProfile.username.toLowerCase()
                ) {
                    return false;
                }


                return user.username
                    .toLowerCase()
                    .includes(query);

            });


        groupMemberResults.innerHTML = "";


        if (!results.length) {

            groupMemberResults.innerHTML = `
                <div class="jn-member-result">
                    <span>No user found.</span>
                </div>
            `;

            return;
        }


        results.forEach(function (user) {

            const alreadySelected =
                selectedGroupMembers.some(
                    function (member) {
                        return member.username ===
                            user.username;
                    }
                );


            const item =
                document.createElement("div");


            item.className =
                "jn-member-result";


            item.innerHTML = `

                <span>
                    <strong>
                        ${escapeHTML(user.name)}
                    </strong>

                    <small>
                        @${escapeHTML(user.username)}
                    </small>
                </span>

                <button
                    type="button"
                    class="jn-secondary-btn">
                    ${
                        alreadySelected
                            ? "Added"
                            : "+ Add"
                    }
                </button>

            `;


            const button =
                item.querySelector("button");


            if (alreadySelected) {

                button.disabled = true;

            } else {

                button.addEventListener(
                    "click",
                    function () {

                        selectedGroupMembers.push(
                            user
                        );


                        renderSelectedMembers();

                        searchGroupMember();

                    }
                );

            }


            groupMemberResults.appendChild(item);

        });

    }


    if (addGroupMemberBtn) {

        addGroupMemberBtn.addEventListener(
            "click",
            searchGroupMember
        );

    }


    if (groupMemberSearch) {

        groupMemberSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchGroupMember();

                }

            }
        );

    }


    function renderSelectedMembers() {

        if (!selectedMembersList) {
            return;
        }


        selectedMembersList.innerHTML = "";


        selectedGroupMembers.forEach(
            function (member, index) {

                const item =
                    document.createElement("span");


                item.className =
                    "jn-selected-member";


                item.innerHTML = `

                    ${escapeHTML(member.name)}

                    <button
                        type="button"
                        title="Remove">
                        ✕
                    </button>

                `;


                item.querySelector("button")
                    .addEventListener(
                        "click",
                        function () {

                            selectedGroupMembers
                                .splice(index, 1);

                            renderSelectedMembers();

                            searchGroupMember();

                        }
                    );


                selectedMembersList.appendChild(item);

            }
        );

    }


    /* =====================================================
       SAVE GROUP
       IMPORTANT:
       MEMBER ADDING DOES NOT OPEN CHAT.
       ONLY SAVE GROUP OPENS MESSAGE PAGE.
    ===================================================== */

    if (saveGroupBtn) {

        saveGroupBtn.addEventListener(
            "click",
            function () {

                const groupName =
                    groupNameInput
                        ? groupNameInput.value.trim()
                        : "";


                if (!groupName) {

                    alert(
                        "Please enter a group name."
                    );

                    return;

                }


                const group = {

                    id: makeId("group"),

                    name: groupName,

                    image: pendingGroupImage || "",

                    members:
                        selectedGroupMembers.map(
                            function (member) {
                                return member.username;
                            }
                        ),

                    createdBy:
                        currentUsername(),

                    createdAt:
                        Date.now()

                };


                const groups =
                    getGroups();


                groups.push(group);

                setJSON(
                    GROUPS_KEY,
                    groups
                );


                /*
                 * Only after Save Group:
                 * open group message page.
                 */

                activeConversation = {

                    type: "group",

                    id: group.id,

                    title: group.name,

                    image: group.image,

                    members: group.members

                };


                createGroupPanel.classList.remove(
                    "active"
                );


                groupNameInput.value = "";


                if (groupMemberSearch) {
                    groupMemberSearch.value = "";
                }


                pendingGroupImage = "";

                selectedGroupMembers = [];


                if (selectedMembersList) {
                    selectedMembersList.innerHTML = "";
                }


                if (groupPicturePreview) {
                    groupPicturePreview.innerHTML = "👥";
                }


                renderGroups();

                openMessageView();

            }
        );

    }


    /* =====================================================
       GROUP LIST
    ===================================================== */

    function renderGroups() {

        const list =
            document.getElementById(
                "jnGroupList"
            );


        if (!list) {
            return;
        }


        const groups =
            getGroups();


        if (!groups.length) {

            list.innerHTML = `
                <div class="jn-empty-state">
                    <span>👥</span>
                    <h3>No groups yet</h3>
                    <p>Create a group to start group chat.</p>
                </div>
            `;

            return;
        }


        list.innerHTML = "";


        groups.forEach(function (group) {

            const item =
                document.createElement("div");


            item.className =
                "jn-group-item";


            item.innerHTML = `

                <div class="jn-group-picture">

                    ${
                        group.image
                            ? `<img src="${group.image}" alt="">`
                            : "👥"
                    }

                </div>

                <div class="jn-group-info">

                    <h3>
                        ${escapeHTML(group.name)}
                    </h3>

                    <p>
                        ${group.members.length}
                        member(s)
                    </p>

                </div>

            `;


            item.addEventListener(
                "click",
                function () {

                    activeConversation = {

                        type: "group",

                        id: group.id,

                        title: group.name,

                        image: group.image || "",

                        members:
                            group.members

                    };


                    openMessageView();

                }
            );


            list.appendChild(item);

        });

    }


    /* =====================================================
       CALL SYSTEM
    ===================================================== */

    const callBtn =
        document.getElementById(
            "jnCallBtn"
        );


    const callOverlay =
        document.getElementById(
            "jnCallOverlay"
        );


    const callAvatar =
        document.getElementById(
            "jnCallAvatar"
        );


    const callName =
        document.getElementById(
            "jnCallName"
        );


    const callStatus =
        document.getElementById(
            "jnCallStatus"
        );


    const endCallBtn =
        document.getElementById(
            "jnEndCallBtn"
        );


    const muteCallBtn =
        document.getElementById(
            "jnMuteCallBtn"
        );


    let callStream = null;

    let callTimer = null;

    let callSeconds = 0;

    let callMuted = false;


    async function startCall() {

        if (!activeConversation) {

            alert(
                "Please open a chat first."
            );

            return;

        }


        if (!callOverlay) {
            return;
        }


        if (callName) {

            callName.textContent =
                activeConversation.title;

        }


        if (callAvatar) {

            if (activeConversation.image) {

                callAvatar.innerHTML =
                    `<img src="${activeConversation.image}" alt="">`;

            } else {

                callAvatar.innerHTML =
                    "👤";

            }

        }


        callOverlay.classList.add(
            "active"
        );


        if (callStatus) {

            callStatus.textContent =
                "Requesting microphone...";

            callStatus.classList.remove(
                "jn-call-connected"
            );

        }


        /*
         * Ask for microphone permission.
         * This makes the Call button actually
         * interact with the microphone.
         */

        if (
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia
        ) {

            try {

                callStream =
                    await navigator.mediaDevices
                        .getUserMedia({
                            audio: true
                        });


                if (callStatus) {

                    callStatus.textContent =
                        "Call connected";

                    callStatus.classList.add(
                        "jn-call-connected"
                    );

                }


                startCallTimer();


            } catch (error) {

                console.error(error);


                if (callStatus) {

                    callStatus.textContent =
                        "Microphone permission denied";

                }

            }

        } else {

            if (callStatus) {

                callStatus.textContent =
                    "Call started";

            }

            startCallTimer();

        }

    }


    function startCallTimer() {

        stopCallTimer();

        callSeconds = 0;


        callTimer =
            setInterval(
                function () {

                    callSeconds++;


                    const minutes =
                        Math.floor(
                            callSeconds / 60
                        );


                    const seconds =
                        callSeconds % 60;


                    if (callStatus) {

                        callStatus.textContent =
                            "Call connected • " +
                            String(minutes).padStart(2, "0") +
                            ":" +
                            String(seconds).padStart(2, "0");

                        callStatus.classList.add(
                            "jn-call-connected"
                        );

                    }

                },
                1000
            );

    }


    function stopCallTimer() {

        if (callTimer) {

            clearInterval(callTimer);

            callTimer = null;

        }

    }


    function endCall() {

        stopCallTimer();


        if (callStream) {

            callStream
                .getTracks()
                .forEach(function (track) {
                    track.stop();
                });

            callStream = null;

        }


        callMuted = false;


        if (muteCallBtn) {

            muteCallBtn.classList.remove(
                "active"
            );

            muteCallBtn.textContent =
                "🎤";

        }


        if (callOverlay) {

            callOverlay.classList.remove(
                "active"
            );

        }

    }


    if (callBtn) {

        callBtn.addEventListener(
            "click",
            startCall
        );

    }


    if (endCallBtn) {

        endCallBtn.addEventListener(
            "click",
            endCall
        );

    }


    if (muteCallBtn) {

        muteCallBtn.addEventListener(
            "click",
            function () {

                if (!callStream) {
                    return;
                }


                const audioTracks =
                    callStream.getAudioTracks();


                if (!audioTracks.length) {
                    return;
                }


                callMuted =
                    !callMuted;


                audioTracks.forEach(
                    function (track) {

                        track.enabled =
                            !callMuted;

                    }
                );


                muteCallBtn.classList.toggle(
                    "active",
                    callMuted
                );


                muteCallBtn.textContent =
                    callMuted
                        ? "🔇"
                        : "🎤";

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (
                    callOverlay &&
                    callOverlay.classList.contains("active")
                ) {

                    endCall();

                    return;

                }


                if (
                    chatPage &&
                    chatPage.classList.contains("active")
                ) {

                    closeChat();

                }

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadProfile();

    renderChatList();

    renderGroups();

})();
// 1. Search Bar Event Listener
const searchInput = document.getElementById('jnUserSearchInput');

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const searchText = e.target.value.trim().toLowerCase();

        // Agar input khali ho to default empty state wapas dikhayein
        if (searchText === "") {
            resetSearchState();
            return;
        }

        try {
            // Firestore Query (username field par prefix search)
            const querySnapshot = await db.collection("users")
                .where("username", ">=", searchText)
                .where("username", "<=", searchText + "\uf8ff")
                .get();

            let userList = [];
            querySnapshot.forEach((doc) => {
                userList.push({ id: doc.id, ...doc.data() });
            });

            console.log("Search Results:", userList);
            renderSearchResults(userList);

        } catch (error) {
            console.error("Firestore Search Error:", error);
        }
    });
}

// 2. Search Results Render Function (Aapke Container ID 'jnSearchResults' ke sath)
function renderSearchResults(users) {
    const resultsContainer = document.getElementById('jnSearchResults');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = ''; // Pehle wale results/empty state clear karein

    if (users.length === 0) {
        resultsContainer.innerHTML = `
            <div class="jn-empty-state">
                <span>⚠️</span>
                <h3>No user found</h3>
                <p>Try searching with another username.</p>
            </div>
        `;
        return;
    }

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('jn-user-card'); // Aapki CSS classes ke mutabiq adjust kar sakte hain

        // Display name setup
        const displayName = user.username || user.profileName || user.name || "User";

        userElement.innerHTML = `
            <div class="user-info" style="padding: 10px; border-bottom: 1px solid #ccc; cursor: pointer;">
                <p style="margin:0;"><strong>${displayName}</strong></p>
                <small style="color: #666;">${user.email || ''}</small>
            </div>
        `;

        // User par click karke chat start karne ki logic
        userElement.addEventListener('click', () => {
            console.log("Selected user for chat:", user);
            if (typeof openChatWithUser === 'function') {
                openChatWithUser(user);
            }
        });

        resultsContainer.appendChild(userElement);
    });
}

// 3. Reset Function (Jab Search box clear ho jaye)
function resetSearchState() {
    const resultsContainer = document.getElementById('jnSearchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="jn-empty-state">
                <span>🔍</span>
                <h3>Search for a user</h3>
                <p>Enter a username or profile name above.</p>
            </div>
        `;
    }
}
// Global Cached Users List
let jnCachedUsers = [];

// 1. Users list fetch function
async function jnFetchAllUsers() {
    try {
        const snapshot = await db.collection("users").get();
        jnCachedUsers = [];
        snapshot.forEach(doc => {
            jnCachedUsers.push({ id: doc.id, ...doc.data() });
        });
        console.log("Search system loaded users:", jnCachedUsers.length);
    } catch (err) {
        console.error("Firestore user fetch error:", err);
    }
}

// 2. Global Event Listener using Delegation (Taaki HTML load hone ke baad bhi trigger ho)
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'jnUserSearchInput') {
        const searchText = e.target.value.trim().toLowerCase();
        const resultsContainer = document.getElementById('jnSearchResults');

        if (!resultsContainer) return;

        // Reset state agar input khali ho
        if (searchText === "") {
            resultsContainer.innerHTML = `
                <div class="jn-empty-state">
                    <span>🔍</span>
                    <h3>Search for a user</h3>
                    <p>Enter a username or profile name above.</p>
                </div>`;
            return;
        }

        // Search in cached data
        const matched = jnCachedUsers.filter(user => {
            const uName = (user.username || "").toLowerCase();
            const pName = (user.profileName || "").toLowerCase();
            const email = (user.email || "").toLowerCase();
            return uName.includes(searchText) || pName.includes(searchText) || email.includes(searchText);
        });

        // Display results
        if (matched.length === 0) {
            resultsContainer.innerHTML = `
                <div class="jn-empty-state">
                    <span>⚠️</span>
                    <h3>No user found</h3>
                    <p>No matching profile found with that name.</p>
                </div>`;
            return;
        }

        resultsContainer.innerHTML = '';
        matched.forEach(user => {
            const displayName = user.username || user.profileName || user.name || "User";
            const subTitle = user.email || user.username || "";

            const userCard = document.createElement('div');
            userCard.className = 'jn-user-card';
            userCard.style.cssText = "padding: 12px; border-bottom: 1px solid #eee; cursor: pointer;";
            userCard.innerHTML = `
                <h4 style="margin:0; font-size:15px; color:#333;">${displayName}</h4>
                ${subTitle ? `<small style="color:#777;">${subTitle}</small>` : ''}
            `;

            userCard.addEventListener('click', () => {
                if (typeof openChatWithUser === 'function') {
                    openChatWithUser(user);
                }
            });

            resultsContainer.appendChild(userCard);
        });
    }
});

// Init on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', jnFetchAllUsers);
} else {
    jnFetchAllUsers();
}
