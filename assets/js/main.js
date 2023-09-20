const initHamburger = () => {
    if (document.querySelector(".menu-toggle")) {
        document.querySelector(".menu-toggle").parentElement.onclick = (e) => {
            document.querySelector("nav").classList.toggle("mobile");
            e.preventDefault();
        };
    }
};

const pinNews = () => {
    // pin the news panel:
    const el = document.querySelector(".news");
    const observer = new IntersectionObserver(
        ([e]) => {
            e.target.classList.toggle("pinned", e.intersectionRatio >= 1);
        },
        { threshold: [1] }
    );
    observer.observe(el);
};

const displayNews = async () => {
    const response = await fetch("/assets/data/news.json");
    const data = await response.json();
    const maxLength = 3;
    if (data.length > maxLength) {
        data = data.slice(0, maxLength);
        console.log(data);
    }

    const html = data
        .map((news, idx) => {
            const extraStyleOnFirstElement =
                idx == 0 ? 'style="padding-top: 5px"' : "";
            return `
            <section ${extraStyleOnFirstElement}>
                <h2>${news.title}</h2>
                <p class="date">${news.date}</p>
                <p>${news.description}</p>
            </section>
            <hr />
        `;
        })
        .join("\n");
    document.querySelector(".news").insertAdjacentHTML("beforeend", html);
};

// const displayCoursesTaught = async () => {
//     const response = await fetch("/assets/data/courses.json");
//     const data = await response.json();
//     console.log(data);
// };

initHamburger();
displayNews();
pinNews();
// displayCoursesTaught();
