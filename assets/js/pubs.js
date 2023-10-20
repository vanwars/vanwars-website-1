const getTitle = (item) => {
    return item.doi
        ? `<a href="${item.doi}" target="_blank">${item.title}</a>`
        : `${item.title}`;
};

const getVenue = (item) => {
    let html = `<em>${item.venue}</em>`;
    if (item.volume && item.issue) {
        html += `, ${item.volume}(${item.issue}), ${item.pages}`;
    } else if (item.pages) {
        html += ` (${item.pages})`;
    }
    html += ". ";
    return html;
};

const getBook = (item) => {
    let html = `<em>${item.editors}</em> (Eds.), ${item.book}`;
    if (item.pages) {
        html += ` (${item.pages})`;
    }
    html += ". ";
    return html;
};

const getLocation = (item) => {
    return item.location ? item.location + "." : "";
};

const jsonToHTML = (item) => {
    switch (item.type) {
        case "symposium":
            return jsonToSymposium(item);
        case "book chapter":
            return jsonToHTMLBookChapter(item);
    }
    return jsonToHTMLGeneric(item);
};

const jsonToHTMLGeneric = (item) => {
    return `
        <li>
            ${item.authors} 
            (${item.date}). 
            ${getTitle(item)}. 
            ${getVenue(item)} 
            ${getLocation(item)}
        </li>
    `;
};

const jsonToSymposium = (item) => {
    return `
        <li>
            ${item.authors} 
            (${item.date}). 
            ${getTitle(item)}. In
            ${item.chairs}, ${item.symposium_title} [Symposium].
            ${getVenue(item)} 
            ${getLocation(item)}
        </li>
    `;
};

const jsonToHTMLBookChapter = (item) => {
    return `
        <li>
            ${item.authors} 
            (${item.date}). 
            ${getTitle(item)}. In
            ${getBook(item)} 
        </li>
    `;
};

const fetchData = async () => {
    const response = await fetch("/assets/data/pubs.json");
    return await response.json();
};

const displayPubs = async () => {
    const data = await fetchData();
    const parent = document.querySelector(".publications");
    const groupings = {
        "Refereed Journals & Conference Proceedings": ["journal", "conference"],
        "Refereed Abstracts, Posters and Workshop Papers": [
            "workshop",
            "symposium",
            "poster",
        ],
        "Other Publications": ["book chapter", "magazine"],
        "Doctoral Dissertation": ["dissertation"],
    };

    // Output pub by type:
    for (key in groupings) {
        parent.insertAdjacentHTML("beforeend", `<h2>${key}</h2>`);
        const types = groupings[key];
        const pubs = data.filter((pub) => types.includes(pub.type));
        const html = pubs.map(jsonToHTML).join("\n");
        parent.insertAdjacentHTML("beforeend", `<ul>${html}</ul>`);
    }
};

displayPubs();
