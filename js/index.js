document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('github-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const searchedUserInput = document.getElementById('search').value;

            fetch(`https://api.github.com/search/users?q=${searchedUserInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    const userList = document.getElementById('user-list');

                    userList.innerHTML = '';

                    data.items.forEach(user => {
                        const listItem = document.createElement('li');

                        // Add a click event listener to the list item to display user repositories
                        listItem.addEventListener('click', function () {
                            getUserRepos(user.login);
                        });

                        listItem.innerHTML = `
                            <img src="${user.avatar_url}" alt="${user.login}" />
                            <div>
                                <p><strong>${user.login}</strong></p>
                                <p>Profile URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
                            </div>`;
                        userList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        });
    } else {
        console.error("Element with id 'github-form' not found");
    }
});

function getUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
    })
    .then(response => response.json())
    .then(repos => {
        const reposList = document.getElementById('repos-list');
        reposList.innerHTML = '';

        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <p><strong>${repo.name}</strong></p>
                <p>Description: ${repo.description || 'N/A'}</p>
                <p>URL: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>`;
            reposList.appendChild(repoItem);
        });
    })
    .catch(error => {
        console.error(`Error fetching repositories for ${username}:`, error);
    });
}
