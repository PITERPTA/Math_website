function loadContent(page) {
    const contentDiv = document.getElementById("content_zadanie");
    contentDiv.innerHTML = "<p>Loading...</p>";

    // Fetch the content of the requested page
    fetch(`/pages/${page}/${page}.html`)
    
        .then(response => response.ok ? response.text() : "<h1>404 - Page Not Found</h1>")
        .then(data => {
            contentDiv.innerHTML = data; // Insert the content into the page
            history.pushState(null, "", "?zadanie=" + page); // Update the URL
            executeScripts();            
            // Load the corresponding CSS for this page
            loadPageCSS(page);
        })
        .catch(() => {
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
        });
}