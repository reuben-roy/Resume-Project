// Cache object to store user data and timestamp
const userCache = {
    data: null,
    timestamp: null,
    ttl: 30 * 60 * 1000 // 5 minutes in milliseconds
};

export function fetchAndDisplayHabiticaUser(headers) {
    const now = Date.now();

    // Check if we have cached data that's still valid
    if (userCache.data && userCache.timestamp && (now - userCache.timestamp) < userCache.ttl) {
        displayUserData(userCache.data);
        return;
    }

    fetch('https://habitica.com/api/v3/user', {
        method: "GET", headers: headers
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then((userData) => {
            // Cache the data
            userCache.data = userData;
            userCache.timestamp = now;

            displayUserData(userData);
        })
        .catch((error) => {
            console.error(error);
        });
}

function displayUserData(userData) {
    const stats = userData.data.stats;
    const data = userData.data;

    document.getElementById("lvl").innerHTML = `<p class="stat-level">Reuben Roy -- Level: ${stats.lvl} -- ${stats.class.toUpperCase()}</p>`;

    document.getElementById('health').innerHTML = `Health:<br>${stats.hp.toFixed(1)}/${stats.maxHealth}`;
    document.getElementById('exp').innerHTML = `Experience:<br>${stats.exp.toFixed(1)}/${stats.toNextLevel}`;
    document.getElementById('mana').innerHTML = `Mana:<br>${stats.mp.toFixed(1)}/${stats.maxMP}`;

    // Update progress bars
    document.getElementById('healthProgress').value = stats.hp;
    document.getElementById('healthProgress').max = stats.maxHealth;

    document.getElementById('expProgress').value = stats.exp;
    document.getElementById('expProgress').max = stats.toNextLevel;

    document.getElementById('manaProgress').value = stats.mp;
    document.getElementById('manaProgress').max = stats.maxMP;

    document.getElementById("lastUpdate").innerHTML = `
        <div class="stat-info">Last check in: ${data.auth.timestamps.loggedin.slice(0, 10)}</div>`;
}