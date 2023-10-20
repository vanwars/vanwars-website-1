const getTitle = (item) => {
    return item.doi
        ? `<a href="${item.doi}" target="_blank">${item.title}</a>`
        : `${item.title}`;
};

const getVenue = (item) => {
    let html = `<span class="venue">${item.venue}</span>`;
    if (item.pages) {
        html += ` (${item.pages})`;
    }
    html += ". ";
    return html;
};

const getConferenceInfo = (item) => {
    let html = "";
    if (item.location) {
        html += `${item.location}.`;
    }
    return html;
};

const jsonToHTML = (item) => {
    return `
        <li>
            ${item.authors} 
            (${item.date}). 
            ${getTitle(item)}. 
            ${getVenue(item)} 
            ${getConferenceInfo(item)}
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
        "Refereed Abstracts, Posters and Workshop Papers": ["workshop"],
        "Other Publications": ["book", "magazine"],
        "Doctoral Dissertation": ["dissertation"],
    };

    // Output pub by type:
    for (key in groupings) {
        parent.insertAdjacentHTML("beforeend", `<h2>${key}</h2>`);
        const types = groupings[key];
        const pubs = data.filter((pub) => types.includes(pub.type));
        for (const pub of pubs) {
            parent.insertAdjacentHTML(
                "beforeend",
                `<ul>${jsonToHTML(pub)}</ul>`
            );
        }
    }
};

displayPubs();
