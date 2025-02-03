function loadPage(page) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<p>Loading...</p>"; // Show loading message

    fetch(`./pages/${page}/${page}.html`)
        .then(response => response.ok ? response.text() : "<h1>404 - Page Not Found</h1>")
        .then(data => {
            contentDiv.innerHTML = data;
            history.pushState(null, "", "?page=" + page);
        })
        .catch(() => {
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
        });
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    loadPage(urlParams.get("page") || "home");
};

window.onpopstate = () => {
    const urlParams = new URLSearchParams(window.location.search);
    loadPage(urlParams.get("page") || "home");
};
