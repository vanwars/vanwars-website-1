const toLinks = (courses) => {
    return courses
        .map((course) => {
            let html = "";
            if (course.url) {
                html += `
                <a href="${course.url}" target="_blank">${course.period}</a>
            `;
            } else {
                html += `<span>${course.period}</span>`;
            }
            if (course.notes) {
                html += course.notes;
            }
            return html;
        })
        .join(" &bull; ");
};

const toRows = (sessions) => {
    let html = "";
    for (const key in sessions) {
        const currentSession = sessions[key];
        html += `<tr>
            <th>${key}</th>
            <td>
                ${toLinks(currentSession)}
            </td>
        </tr>`;
    }
    return html;
};

const renderCourse = (data) => {
    return `
            <section class="teaching">
                <section class="details">
                    <h3>
                        ${data.code}: ${data.title}
                    </h3>
                    <div class="course-links">
                        <p>${data.description}</p>
                        <table>
                            ${toRows(data.sessions)}
                        </table>
                    </div>
                </section>
                <p class="years">${data.years}</p>
            </teaching>
            `;
};
const displayCoursesTaught = async () => {
    const response = await fetch("/assets/data/courses.json");
    const data = await response.json();
    const el = document.querySelector(".teaching-section");
    for (const key in data) {
        el.insertAdjacentHTML("beforeend", `<h2>${key}</h2>`);
        const courses = data[key];
        courses.forEach((course) => {
            el.insertAdjacentHTML("beforeend", renderCourse(course));
        });
    }
};
displayCoursesTaught();
