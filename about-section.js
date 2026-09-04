

const ABOUT_DATA = {
    summary: `I'm a <i>Computer Science student</i> at <b>SZABIST University</b>, currently in my
        second year. I enjoy both sides of the work — sitting in Figma thinking through how a
        screen should feel, and then actually building it. I've shipped a browser extension
        that's live and in use, designed a student LMS as a semester project, and built a
        handful of personal projects just to push myself further. Right now I'm getting more
        serious about <i>React</i> and slowly learning what it takes to build a game from the
        ground up.`,

    experience: `<b>WordPress Developer — Sysartx</b> <i>(Internship)</i><br>
        Themes, plugins, performance, and SEO — handled in a real work environment with real
        clients and real deadlines. This experience taught me how things actually work outside
        the classroom.`,

    education: `<b>SZABIST University:</b><br><i>BS Computer Science (in progress)</i><br>
        <b>Govt. Degree College Boys and Girls SRE III Majeed:</b><br>
        <i>Intermediate in Pre-Engineering</i><br>
        <b>Arqam Public School:</b><br><i>Matriculation in Science</i>`,

    skills: [
        { label: "HTML, CSS & JavaScript", value: 85 },
        { label: "PHP & WordPress Development", value: 80 },
        { label: "React (Component-Based UI)", value: 65 },
        { label: "Java & MySQL", value: 75 },
        { label: "UI/UX Design (Figma)", value: 78 },
        { label: "Debugging & Problem-Solving", value: 82 },
        { label: "Git & Version Control", value: 70 }
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

function renderAboutSection() {
    const skillsHtml = ABOUT_DATA.skills.map(renderSkillBar).join("");

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
                <p class="about-text">${ABOUT_DATA.experience}</p>
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
