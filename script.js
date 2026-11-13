const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
});

async function loadRepositories() {

    const container = document.getElementById("repositories");

    try {

        const response = await fetch(
            "https://api.github.com/users/Louizz7/repos?per_page=100&sort=updated"
        );

        if (!response.ok) {
            throw new Error("GitHub API unavailable");
        }

        const repositories = await response.json();

        const projects = repositories
            .filter(repo => !repo.fork && !repo.archived)
            .slice(0, 6);

        if (!projects.length) {
            container.textContent = "No public projects found.";
            return;
        }

        for (const repo of projects) {

            const card = document.createElement("article");
            card.className = "project";

            const title = document.createElement("h3");
            title.textContent = repo.name.replace(/[-_]/g, " ");

            const description = document.createElement("p");
            description.textContent =
                repo.description || "Explore this project on GitHub.";

            const language = document.createElement("p");
            language.textContent = repo.language || "Project";

            const link = document.createElement("a");
            link.textContent = "View Project ↗";
            link.href = repo.html_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.append(title, description, language, link);
            container.appendChild(card);
        }

    } catch (error) {

        container.textContent =
            "Unable to load projects. Please visit GitHub directly.";

        console.error(error);
    }
}

loadRepositories();
