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

    document.getElementById("lvl").innerHTML = `
        <div class="stat-level">
            <p>Level: ${stats.lvl}</p>
            <p>Class: ${stats.class.toUpperCase()}</p>
        </div>`;

    document.getElementById("health").innerHTML = `
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Health</h6>
                <span class="stat-value">${stats.hp.toFixed(1)}/${stats.maxHealth}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-health" value="${stats.hp}" max="${stats.maxHealth}"></progress>
            </div>
        </div>`;

    document.getElementById("exp").innerHTML = `
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Exp</h6>
                <span class="stat-value">${stats.exp.toFixed(1)}/${stats.toNextLevel}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-exp" value="${stats.exp}" max="${stats.toNextLevel}"></progress>
            </div>
        </div>`;

    document.getElementById("mana").innerHTML = `
        <div class="stat-row">
            <div class="stat-header">
                <h6 class="stat-label">Mana</h6>
                <span class="stat-value">${stats.mp.toFixed(1)}/${stats.maxMP}</span>
            </div>
            <div class="progress-container">
                <progress class="progress progress-mana" value="${stats.mp}" max="${stats.maxMP}"></progress>
            </div>
        </div>`;

    document.getElementById("lastUpdate").innerHTML = `
        <div class="stat-info">Stats last logged in: ${data.auth.timestamps.loggedin.slice(0, 10)}</div>`;

    document.getElementById("streak").innerHTML = `
        <div class="stat-info">Streak: ${data.achievements.streak}</div>`;
}