function addNav(indexPathPrefix, navPathPrefix) {
    console.log("addNav");

    let navHtmlString =
        `
            <nav>
                <ul>
                    <li><a href='${indexPathPrefix}index.html'>Home</a></li>
                    <li><a href='${navPathPrefix}passtimes.html'>Passtimes</a></li>
                    <li><a href='${navPathPrefix}personal.html'>Personal</a></li>
                    <li><a href='${navPathPrefix}professional.html'>Professional</a></li>
                    <li><a href='${navPathPrefix}projects.html'>Projects</a></li>
                </ul>
            </nav>

            <h1 class='FirstName'>Andrew</h1>
            <h1 class='LastName'>Harasymiw</h1>
            <h2>Developer for hire</h2>
        `

    $('header').append(navHtmlString);
}

function addFooter(imagePathPrefix) {
    console.log("addNav");

    let navHtmlString =
        `
        <p>&#169; 2023 by Andrew Harasymiw.</p>
        <nav>
            <ul>
                <li>
                    <a href="https://github.com/aharasymiw" target="_blank">
                        <img class=".social-image" src="${imagePathPrefix}images/github_logo.svg"
                                alt="Github Logo, and link to github." height="20" width="20">
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/aharasymiw" target="_blank">
                        <img class=".social-image" src="${imagePathPrefix}images/linkedin_logo.svg"
                                alt="LinkedIn Logo, and link to LinkedIn." height="20" width="20">
                    </a>
                </li>
                <li>
                    <a rel="me" href="https://hachyderm.io/@aharasymiw">M</a>
                </li>
                <li>
                    <a href="mailto:aharasymiw@gmail.com" target="_blank">
                        <img class=".social-image" src="${imagePathPrefix}images/email_icon.svg"
                                alt="Email icon, and link to send an email." height="20" width="20">
                    </a>
                </li>
            </ul>
        </nav>
        `

    //     <a href="https://hachyderm.io/@aharasymiw" rel="me" target="_blank">
    //     <img class=".social-image" src="${imagePathPrefix}images/mastodon_logo.svg"
    //             alt="Mastodon Logo, and link to https://hachyderm.io/@aharasymiw on Mastodon." height="20" width="20">
    // </a>

    $('footer').append(navHtmlString);

}
