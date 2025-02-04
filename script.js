let currentStyle = null; // Variable to store the current page CSS link

// Function to load the page content dynamically
function loadPage(page) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<p>Loading...</p>";

    // Fetch the content of the requested page
    fetch(`pages/${page}/${page}.html`)
        .then(response => response.ok ? response.text() : "<h1>404 - Page Not Found</h1>")
        .then(data => {
            contentDiv.innerHTML = data; // Insert the content into the page
            history.pushState(null, "", "?page=" + page); // Update the URL
            executeScripts();            
            // Load the corresponding CSS for this page
            loadPageCSS(page);
        })
        .catch(() => {
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
        });
}
function updateUrlParam(key, value) {
    const url = new URL(window.location.href);  // Get current URL
    url.searchParams.set(key, value);  // Set the parameter or add if not present
    window.history.pushState({}, '', url);  // Update the URL in the browser
}

function loadContent(page) {
    const contentDiv = document.getElementById("content_zadanie");
    contentDiv.innerHTML = "<p>Loading...</p>";

    // Fetch the content of the requested page
    fetch(`/pages/${page}/${page}.html`)
    
        .then(response => response.ok ? response.text() : "<h1>404 - Page Not Found</h1>")
        .then(data => {
            contentDiv.innerHTML = data; // Insert the content into the page
            updateUrlParam('zadanie', 'zadanie_3') // Update the URL
            executeScripts();            
            // Load the corresponding CSS for this page
            loadPageCSS(page);
        })
        .catch(() => {
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
        });
}

function executeScripts() {
    let scripts = document.getElementById("content").getElementsByTagName("script");
    for (let script of scripts) {
        let newScript = document.createElement("script");
        newScript.textContent = script.textContent; // Copy inline script
        document.body.appendChild(newScript).parentNode.removeChild(newScript); // Run script
    }
}
// Function to load the CSS for the page and remove the old one
function loadPageCSS(page) {
    // Remove the previous CSS link if it exists
    if (currentStyle) {
        currentStyle.remove();
    }

    // Create a new <link> element to load the CSS for the page
    currentStyle = document.createElement("link");
    currentStyle.rel = "stylesheet";
    currentStyle.href = `pages/${page}/style.css`; // Path to the page-specific CSS

    // Append the new CSS to the <head>
    document.head.appendChild(currentStyle);
}

// Load the correct page on refresh
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    loadPage(urlParams.get("page") || "home"); // Default to home if no page is specified
};

