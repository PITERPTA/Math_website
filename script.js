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
            //renderKaTeX();
            
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

function renderKaTeX() {
    if (window.katex) {
        document.querySelectorAll('.math').forEach(el => {
            katex.render(el.textContent, el, { throwOnError: false });
        });
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
