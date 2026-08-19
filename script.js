let myAnimes = JSON.parse(localStorage.getItem("myAnimes")) || [];

function addAnime(name, image) {

    let exists = myAnimes.find(anime => anime.name === name);

    if (exists) {
        alert("Anime already in My Animes!");
        return;
    }

    myAnimes.push({
        name: name,
        image: image
    });

    localStorage.setItem("myAnimes", JSON.stringify(myAnimes));

    alert("Anime added to My Animes!");
}

function showMyAnimes() {

    let list = document.getElementById("anime-list");

    if (!list) return;

    list.innerHTML = "";

    myAnimes.forEach(anime => {

        list.innerHTML += `
            <div class="anime-card">

                <img src="${anime.image}">

                <h3>${anime.name}</h3>

                <button>Watch</button>
<button onclick="removeAnime('${anime.name}')">Remove from my Animes</button>

            </div>
        `;

    });
}

showMyAnimes();
function removeAnime(name) {
    myAnimes = myAnimes.filter(anime => anime.name !== name);

    localStorage.setItem("myAnimes", JSON.stringify(myAnimes));

    showMyAnimes();
}
function signUp() {

    let username = document.querySelector('input[placeholder="Username"]').value.trim();
    let email = document.querySelector('input[placeholder="enter your Email"]').value.trim();
    let password = document.querySelectorAll('input[type="password"]')[0].value;
    let confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

    let error = document.getElementById("signup-error");

    // إخفاء الرسالة في كل محاولة جديدة
    error.style.display = "none";

    if (username === "") {
        error.textContent = "Please enter a username.";
        error.style.display = "block";
        return;
    }

    if (email === "") {
        error.textContent = "Please enter your email.";
        error.style.display = "block";
        return;
    }

    if (!email.includes("@")) {
        error.textContent = "Please enter a valid email address.";
        error.style.display = "block";
        return;
    }

    if (password === "") {
        error.textContent = "Please enter a password.";
        error.style.display = "block";
        return;
    }

    if (password.length < 6) {
        error.textContent = "Password must be at least 6 characters.";
        error.style.display = "block";
        return;
    }

    if (confirmPassword === "") {
        error.textContent = "Please confirm your password.";
        error.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        error.style.display = "block";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(user => user.email === email);

    if (exists) {
        error.textContent = "This email is already registered.";
        error.style.display = "block";
        return;
    }

    users.push({
        username: username,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "sign in.html";
}
function signIn() {
    let username = document.querySelector('input[placeholder="Username"]').value;
    let password = document.querySelector('input[placeholder="password"]').value;

    let error = document.getElementById("login-error");

    if (username === "" || password === "") {
        error.style.display = "block";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user =>
        user.username === username && user.password === password
    );

    if (!user) {
        error.style.display = "block";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "index.html";
}
function updateNavbar() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        return;
    }

    let signInLink = document.querySelector(".nav-right a");

    if (signInLink) {
        signInLink.textContent = currentUser.username;
        signInLink.href = "#";
        signInLink.onclick = function () {
            logout();
        };
    }
}

function logout() {
    localStorage.removeItem("currentUser");
window.location.href = "sign in.html";
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
updateNavbar();
function watchEpisode(episode) {
    window.location.href =
        "AOT.W.html?anime=attack-on-titan&episode=" + episode;
}
function getEpisode() {
    let params = new URLSearchParams(window.location.search);
    let episode = params.get("episode");

    if (episode) {
        document.getElementById("episode-title").textContent =
            "Attack on Titan - Episode " + episode;
    }
}

getEpisode();
function searchAnime() {
    let search = document.getElementById("anime-search").value.toLowerCase();

    let cards = document.querySelectorAll(".anime-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(search)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}