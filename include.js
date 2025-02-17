function includeHTML(elementId, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data)
        .catch(error => console.error(`Hilfe! ${file} existiert nicht!: `, error));
}

// Header & Footer automatisch einfügen
document.addEventListener("DOMContentLoaded", function () {
    includeHTML("header", "header.html");
    includeHTML("footer", "footer.html");
});