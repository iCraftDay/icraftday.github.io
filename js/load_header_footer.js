document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden von ${file}`);
                }
                return response.text();
            })
            .then(data => document.getElementById(id).innerHTML = data)
            .catch(error => console.error(error));
    }

    loadComponent("header", "/header.html");
    loadComponent("footer", "/footer.html");
    
});