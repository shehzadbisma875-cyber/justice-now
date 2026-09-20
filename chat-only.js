document.addEventListener("click", function (event) {

    // HOME → CHAT
    const chatButton = event.target.closest("#chatTopBtn");

    if (chatButton) {
        event.preventDefault();
        event.stopPropagation();

        const chatSection = document.getElementById("chatSection");
        const homePage = document.getElementById("homePage");

        if (!chatSection) {
            console.error("ERROR: #chatSection not found");
            alert("Chat section nahi mila. index.html mein id=\"chatSection\" check karein.");
            return;
        }

        // Home hide
        if (homePage) {
            homePage.classList.add("hidden");
        }

        // Chat show
        chatSection.classList.remove("hidden");

        chatSection.style.display = "block";
        chatSection.style.visibility = "visible";
        chatSection.style.opacity = "1";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        console.log("Justice Now Chat opened.");
        return;
    }


    // CHAT → CLOSE
    const closeChat = event.target.closest("#closeChatBtn");

    if (closeChat) {
        event.preventDefault();
        event.stopPropagation();

        const chatSection = document.getElementById("chatSection");
        const homePage = document.getElementById("homePage");

        if (chatSection) {
            chatSection.classList.add("hidden");
        }

        if (homePage) {
            homePage.classList.remove("hidden");
            homePage.style.display = "";
            homePage.style.visibility = "visible";
            homePage.style.opacity = "1";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        console.log("Justice Now Chat closed.");
    }

});