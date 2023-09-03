console.log("works!");

$(document).ready(onReady);

function onReady() {
    addNav();

    addFooter();
}

function addNav() {
    console.log("addNav");

    let navHtmlString =
        `
        <nav>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="passtimes.html">Passtimes</a></li>
                <li><a href="personal.html">Personal</a></li>
                <li><a href="professional.html">Professional</a></li>
                <li><a href="projects.html">Projects</a></li>
            </ul>
        </nav>

        <h1 class="FirstName">Andrew</h1>
        <h1 class="LastName">Harasymiw</h1>
        <h2>Developer for hire</h2>
        `

    $('header').append(navHtmlString);
}

function addFooter() {
    console.log("addNav");

    let navHtmlString =
        `
        <p>&#169; 2023 by Andrew Harasymiw.</p>
        <nav>
            <ul>
                <li>
                    <a href="https://github.com/aharasymiw">
                        <img class=".social-image" src="../images/github_logo.svg"
                                alt="Github Logo, and link to github." height="20" width="20">
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/aharasymiw" class=".image-link">
                        <img class=".social-image" src="../images/linkedin_logo.svg"
                                alt="LinkedIn Logo, and link to LinkedIn." height="20" width="20">
                    </a>
                </li>
                <li>
                    <a href="https://hachyderm.io/@aharasymiw" rel="me" class=".image-link">
                        <img class=".social-image" src="../images/mastodon_logo.svg"
                                alt="Mastadon Logo, and link to https://hachyderm.io/@aharasymiw on Mastadon." height="20" width="20">
                    </a>
                </li>
                <li>
                    <a href="mailto:aharasymiw@gmail.com" class=".image-link">
                        <img class=".social-image" src="../images/email_icon.svg"
                                alt="Email icon, and link to send an email." height="20" width="20">
                    </a>
                </li>
            </ul>
        </nav>
        `

    $('footer').append(navHtmlString);

}
