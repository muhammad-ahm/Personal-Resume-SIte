const EMAILJS_PUBLIC_KEY = "aU4yp4QR5pD2y28rt";
const EMAILJS_SERVICE_ID = "service_5wxik6g";
const EMAILJS_TEMPLATE_ID = "template_eb36ya5";

if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

let allowedDomains = [];
let allowedSpecificEmails = [];
let whitelistLoaded = false;
let whitelistLoadFailed = false;

async function loadEmailWhitelist() {
    try {
        const response = await fetch("./allowed-emails.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch whitelist");
        const data = await response.json();
        allowedDomains = (data.allowedDomains || []).map(function (d) { return d.toLowerCase(); });
        allowedSpecificEmails = (data.allowedSpecificEmails || []).map(function (e) { return e.toLowerCase(); });
        whitelistLoaded = true;
    } catch (err) {
        console.error("Could not load allowed-emails.json:", err);
        whitelistLoadFailed = true;
    } finally {
        updateSendButtonState();
    }
}

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("E_mail");
const messageInput = document.getElementById("Message");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("formStatus");
const hpField = document.getElementById("hp_field");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaAnswerInput = document.getElementById("captchaAnswer");

let captchaCorrectAnswer = null;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaCorrectAnswer = a + b;
    if (captchaQuestion) {
        captchaQuestion.textContent = "Human check: " + a + " + " + b + " = ?";
    }
    if (captchaAnswerInput) {
        captchaAnswerInput.value = "";
    }
}

function containsSuspiciousContent(value) {
    const htmlTagPattern = /<[^>]*>/;
    const scriptPattern = /javascript:|on\w+\s*=/i;
    const urlFloodPattern = /(https?:\/\/){3,}/i; // spam link flooding
    return htmlTagPattern.test(value) || scriptPattern.test(value) || urlFloodPattern.test(value);
}

function isPlainTextSafe(value) {
    // Letters (any language), numbers, spaces, and basic punctuation only
    const safePattern = /^[\p{L}\p{N}\s.,!?'"()\-:;@#&/]*$/u;
    return safePattern.test(value) && !containsSuspiciousContent(value);
}

function isValidEmailFormat(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
}

function isTrustedEmailDomain(value) {
    const lowerValue = value.toLowerCase();
    const domain = lowerValue.split("@")[1];
    if (!domain) return false;
    if (allowedSpecificEmails.includes(lowerValue)) return true;
    return allowedDomains.includes(domain);
}

function updateSendButtonState() {
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    const allFilled = nameVal.length > 0 && emailVal.length > 0 && messageVal.length > 0;
    const nameSafe = isPlainTextSafe(nameVal);
    const messageSafe = isPlainTextSafe(messageVal);
    const emailFormatOk = isValidEmailFormat(emailVal);

    const readyToEnable = allFilled && nameSafe && messageSafe && emailFormatOk && whitelistLoaded;

    sendBtn.disabled = !readyToEnable;

    if (whitelistLoadFailed) {
        statusEl.textContent = "Could not load email whitelist — please refresh the page.";
        statusEl.style.color = "#c0392b";
    }
}

[nameInput, emailInput, messageInput].forEach(function (field) {
    field.addEventListener("input", function () {
        statusEl.textContent = "";
        updateSendButtonState();
    });
});

if (contactForm) {
    generateCaptcha();
    loadEmailWhitelist();

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const messageVal = messageInput.value.trim();

        // 1. All fields filled
        if (!nameVal || !emailVal || !messageVal) {
            statusEl.textContent = "Please fill in all fields.";
            statusEl.style.color = "#c0392b";
            return;
        }

        // 5. Text-only check (blocks HTML/script injection attempts)
        if (!isPlainTextSafe(nameVal) || !isPlainTextSafe(messageVal)) {
            statusEl.textContent = "Name and message can only contain plain text — no code or links.";
            statusEl.style.color = "#c0392b";
            return;
        }

        // 2. Email format + trusted domain check
        if (!isValidEmailFormat(emailVal)) {
            statusEl.textContent = "Please enter a valid email address.";
            statusEl.style.color = "#c0392b";
            return;
        }
        if (!isTrustedEmailDomain(emailVal)) {
            statusEl.textContent = "Please use an email from a recognized provider (Gmail, Outlook, Yahoo, etc.) or your organization email.";
            statusEl.style.color = "#c0392b";
            return;
        }

        // Honeypot check — if this hidden field has a value, it's a bot
        if (hpField && hpField.value.trim() !== "") {
            statusEl.textContent = "Submission blocked.";
            statusEl.style.color = "#c0392b";
            return;
        }

        // 3. Human check (captcha)
        const userCaptchaVal = parseInt(captchaAnswerInput.value.trim(), 10);
        if (isNaN(userCaptchaVal) || userCaptchaVal !== captchaCorrectAnswer) {
            statusEl.textContent = "Human check failed — please solve the math question correctly.";
            statusEl.style.color = "#c0392b";
            generateCaptcha();
            return;
        }

        // Keys not configured yet
        if (EMAILJS_PUBLIC_KEY === "aU4yp4QR5pD2y28rt") {
            statusEl.textContent = "Form is wired up — add your EmailJS keys in script.js to go live.";
            statusEl.style.color = "#c0392b";
            return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = "SENDING...";
        statusEl.textContent = "";

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: nameVal,
            reply_to: emailVal,
            message: messageVal
        })
        .then(function () {
            statusEl.textContent = "Message sent successfully! I'll get back to you soon.";
            statusEl.style.color = "#15803d";
            contactForm.reset();
            generateCaptcha();
        })
        .catch(function (error) {
            statusEl.textContent = "Something went wrong. Please try again or email me directly.";
            statusEl.style.color = "#c0392b";
            console.error("EmailJS error:", error);
        })
        .finally(function () {
            sendBtn.textContent = "SEND";
            updateSendButtonState();
        });
    });
}
