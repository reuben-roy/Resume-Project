export function fetchAndDisplayHabiticaUser(headers) {
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
            document.getElementById("lvl").innerHTML = `<h6 style="flex-basis: 100%">Level: ${userData.data.stats.lvl}</h6>
            <h6 style="flex-basis: 100%">Class: ${userData.data.stats.class.toUpperCase()}</h6>`
            document.getElementById("health").innerHTML = `<h6 class="flex-col1">Health</h6>
            <progress
            class="progress progress-info w-56 flex-col2"
            value="${userData.data.stats.hp}"
            max="${userData.data.stats.maxHealth}"
            ></progress>
            <h6 class="flex-col3">${userData.data.stats.hp.toFixed(1) + "/" + userData.data.stats.maxHealth}</h6>`
            document.getElementById("exp").innerHTML = `<h6 class="flex-col1">Exp</h6>
            <progress
            class="progress progress-error w-56 flex-col2"
            value="${userData.data.stats.exp}"
            max="${userData.data.stats.toNextLevel}"
            ></progress>
            <h6 class="flex-col3">${userData.data.stats.exp.toFixed(1) + "/" + userData.data.stats.toNextLevel}</h6>`
            document.getElementById("mana").innerHTML = `<h6 class="flex-col1">Mana</h6>
            <progress
            class="progress progress-error w-56 flex-col2"
            value="${userData.data.stats.mp}"
            max="${userData.data.stats.maxMP}"
            ></progress>
            <h6 class="flex-col3">${userData.data.stats.mp.toFixed(1) + "/" + userData.data.stats.maxMP}</h6>`
            document.getElementById("lastUpdate").innerHTML = `<h6 class="flex-col1">Stats last logged in on: ${userData.data.auth.timestamps.loggedin.slice(0, 10)}</h6>`
            document.getElementById("streak").innerHTML = `<h6 class="flex-col1">Streak: ${userData.data.achievements.streak}</h6>`
        })
        .catch((error) => {
            console.error(error);
        });
}
