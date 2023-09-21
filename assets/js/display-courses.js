const toLinks = (courses) => {
    return courses
        .map((course) => {
            let html = "";
            if (course.url) {
                html += `<a href="${course.url}" target="_blank">${course.period}</a>`;
            } else {
                html += `<span>${course.period}</span>`;
            }
            html += course.notes ? " " + course.notes : "";
            return html;
        })
        .join(" &bull; ");
};

const toTable = (sessions) => {
    let html = "<table>";
    for (const key in sessions) {
        const currentSession = sessions[key];
        html += `<tr>
            <th>${key}</th>
            <td>
                ${toLinks(currentSession)}
            </td>
        </tr>`;
    }
    html += "</table>";
    return html;
};

const toList = (sessions) => {
    let html = "<ul>";
    for (const key in sessions) {
        const currentSession = sessions[key];
        html += `<li>
            ${key}: </strong>
                ${toLinks(currentSession)}
        </li>`;
    }
    html += "</ul>";
    return html;
};

const renderCourse = (data) => {
    return `
        <section class="teaching">
            <section class="details">
                <h3>
                    ${data.code ? `${data.code}: ${data.title}` : data.title}
                </h3>
                <div class="courses">
                    <p>${data.description}</p>
                    ${toTable(data.sessions)}
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
        // header:
        el.insertAdjacentHTML("beforeend", `<h2>${key}</h2>`);
        const courses = data[key];

        // associated courses:
        courses.forEach((course) => {
            el.insertAdjacentHTML("beforeend", renderCourse(course));
        });
    }
};

displayCoursesTaught();
