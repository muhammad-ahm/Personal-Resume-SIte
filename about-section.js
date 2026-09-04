
const ABOUT_DATA = {
    summary: `I'm a <i>Computer Science student</i> at <b>SZABIST University</b>, with a solid
        background in <i>OOP with Java</i> and <i>C programming</i>. I focus on developing
        sound logical reasoning and writing clean, organized code. I'm studying the
        <i>game development pipeline</i> — from system design and core programming ideas to
        gameplay logic — because I see it as a technical and problem-solving discipline, not
        just a tool-based skill. Alongside that, I work on web development projects to sharpen
        my understanding of design principles, user interaction, and front-end technologies.`,

    experience: [
        {
            title: "Front-end AI Engineering Intern",
            org: "FlyRank AI",
            period: "July 2026 – Present",
            desc: "Working on the front-end side of AI-driven products, translating product ideas into real, working interfaces."
        },
        {
            title: "Web Developer",
            org: "ALLTASKER",
            period: "November 2025 – August 2026",
            desc: "Built React and WordPress websites for clients with a strong emphasis on SEO-driven architecture — from first line of code to full site delivery."
        },
        {
            title: "WordPress Developer",
            org: "Sysartx (Internship)",
            period: "July 2025 – September 2025",
            desc: "Built and customized responsive WordPress sites, designed and modified themes with HTML/CSS/PHP/JS, integrated plugins, and contributed to SEO and performance optimization."
        }
    ],

    education: `<b>SZABIST University:</b><br><i>BS Computer Science</i> (Sep 2024 – Dec 2028)<br>
        <b>Govt. Degree College Boys and Girls SRE III Majeed:</b><br>
        <i>Intermediate, Pre-Engineering</i> (Jun 2022 – Jul 2024)<br>
        <b>Arqam Public School:</b><br><i>Matric, Computer Science</i> (May 2020 – May 2022)`,

    skills: [
        { label: "Godot & Unity (Game Development)", value: 68 },
        { label: "React (Component-Based UI)", value: 75 },
        { label: "WordPress & PHP", value: 82 },
        { label: "Java & C Programming (OOP)", value: 80 },
        { label: "HTML, CSS & JavaScript", value: 85 },
        { label: "Critical Thinking & Problem-Solving", value: 85 },
        { label: "Git & Version Control", value: 72 }
    ],

    certifications: [
        "AI for Beginners",
        "Query Quest — Certificate of Achievement",
        "What is Artificial Intelligence? — HackerRank"
    ],

    languages: `English: Fluent <br><br> Urdu: Native`
};

function renderSkillBar(skill) {
    const safeValue = Math.max(0, Math.min(100, skill.value));
    return `
        <div class="skill-item">
            <div class="skill-track" role="progressbar" aria-valuenow="${safeValue}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.label}">
                <div class="skill-fill" style="width: ${safeValue}%;"></div>
            </div>
            <p class="skill-label">${skill.label}</p>
        </div>`;
}

function renderExperienceEntry(job) {
    return `
        <div class="experience-item">
            <p class="about-text"><b>${job.title}</b> — ${job.org}<br>
            <span class="experience-period">${job.period}</span><br>
            ${job.desc}</p>
        </div>`;
}

function renderAboutSection() {
    const skillsHtml = ABOUT_DATA.skills.map(renderSkillBar).join("");
    const experienceHtml = ABOUT_DATA.experience.map(renderExperienceEntry).join("<br>");
    const certificationsHtml = ABOUT_DATA.certifications.map(function (c) {
        return `<li>${c}</li>`;
    }).join("");

    return `
        <section id="about" class="reveal">
            <h2>ABOUT</h2>
            <br>
            <div>
                <h3 id="topic">SUMMARY</h3>
                <br>
                <p class="about-text">${ABOUT_DATA.summary}</p>
            </div>
            <br>
            <div>
                <h3 id="topic">EXPERIENCE</h3>
                <br>
                ${experienceHtml}
            </div>
            <br>
            <div>
                <h3 id="topic">EDUCATION</h3>
                <br>
                <p class="about-text">${ABOUT_DATA.education}</p>
            </div>
            <br>
            <div>
                <h3 id="topic">SKILLS</h3>
                <br>
                ${skillsHtml}
            </div>
            <br>
            <div>
                <h3 id="topic">CERTIFICATIONS</h3>
                <br>
                <ul class="about-text certifications-list">${certificationsHtml}</ul>
            </div>
            <br>
            <div>
                <h3 id="topic">LANGUAGES</h3>
                <br>
                <p class="about-text">${ABOUT_DATA.languages}</p>
            </div>
        </section>`;
}

document.addEventListener("DOMContentLoaded", function () {
    const mount = document.getElementById("about-mount");
    if (mount) {
        mount.innerHTML = renderAboutSection();
    }
});
