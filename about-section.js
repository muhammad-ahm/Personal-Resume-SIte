// ===================================================
// "About" section renderer
// Mount point required in HTML: <div id="about-mount"></div>
// (Site is a single-page (index.html) layout — About, Projects,
// and Contact all live here as scrollable sections.)
// ===================================================

const ABOUT_DATA = {
    summary: `A recent <i>Computer Science Graduate</i> with a <i>BSCS degree</i> from
        <b>SZABIST University</b>. Equipped with a solid foundation in
        <em>Programming, Problem-Solving, and Technology</em>, I am actively seeking job
        opportunities to apply my skills and contribute to innovative projects in the
        tech industry.`,

    education: `<b>SZABIST University:</b><br><i>Specialization in IT Technician</i><br>
        <b>Govt. Degree College Boys and Girls SRE III Majeed:</b><br>
        <i>Intermediate in Pre-Engineering</i><br>
        <b>Arqam Public School:</b><br><i>Matriculation in Science</i>`,

    skills: [
        { label: "Programming Languages: C, C++, Python", value: 87 },
        { label: "Web Development: HTML, CSS, JavaScript", value: 75 },
        { label: "Database Management: SQL", value: 56 },
        { label: "Operating Systems: Windows, Linux", value: 77 },
        { label: "Problem-Solving and Critical Thinking", value: 90 },
        { label: "Team Collaboration and Communication", value: 65 },
        { label: "Adaptability and Continuous Learning", value: 71 },
        { label: "Attention to Detail and Quality Assurance", value: 69 },
        { label: "Time Management and Project Management", value: 88 }
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
            <h1>ABOUT</h1>
            <br>
            <div>
                <h3 id="topic">SUMMARY</h3>
                <br>
                <p class="about-text">${ABOUT_DATA.summary}</p>
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
