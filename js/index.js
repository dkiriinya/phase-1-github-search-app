document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('github-form'); 

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the value of the input field
            const searchedUserInput = document.getElementById('search').value;

            // Use the fetch API to get user information
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
                    
                    // Clear existing list items
                    userList.innerHTML = '';

                    // Create a new list item for each user and append user data
                    data.items.forEach(user => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                        <img src="${user.avatar_url}" alt="${user.login}" />
                        <div>
                            <p><strong>${user.login}</strong></p>
                            <p>Profile URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
                        </div>`
                        userList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        });
    } else {
        console.error("Element with id 'github-form' not found"); // Updated to match the form ID in your HTML
    }
});
