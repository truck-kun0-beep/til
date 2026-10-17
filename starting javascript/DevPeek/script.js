const form = document.getElementById("search-form");
const input = document.getElementById("username-input");
const searchBtn = document.getElementById("search-btn");
const message = document.getElementById("message");
const profile = document.getElementById("profile");

const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const loginEl = document.getElementById("login");
const bioEl = document.getElementById("bio");
const reposEl = document.getElementById("repos");
const followersEl = document.getElementById("followers");
const followingEl = document.getElementById("following");
const locationItem = document.getElementById("location-item");
const companyItem = document.getElementById("company-item");
const joinedItem = document.getElementById("joined-item");
const profileLink = document.getElementById("profile-link");
const repoList = document.getElementById("repo-list");

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

function hideMessage() {
  message.classList.add("hidden");
}

function hideProfile() {
  profile.classList.add("hidden");
}

function validateUsername(username) {
  if (username === "") {
    return "Please enter a username.";
  }
  if (username.length > 39) {
    return "GitHub usernames can't be longer than 39 characters.";
  }

  const pattern = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d]))*$/i;
  if (!pattern.test(username)) {
    return "Invalid username. Use only letters, numbers and single hyphens.";
  }
  return "";
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function setOptionalField(element, icon, value) {
  if (value) {
    element.textContent = icon + " " + value;
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

async function fetchProfile(username) {
  const response = await fetch("https://api.github.com/users/" + username);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found. Check the spelling and try again.");
    }
    if (response.status === 403) {
      throw new Error("GitHub rate limit reached. Please wait a while and try again.");
    }
    throw new Error("Something went wrong (error " + response.status + ").");
  }

  const data = await response.json();
  return data;
}

function displayProfile(user) {
  avatar.src = user.avatar_url;
  avatar.alt = user.login + "'s profile picture";

  nameEl.textContent = user.name || user.login;
  loginEl.textContent = "@" + user.login;
  bioEl.textContent = user.bio || "No bio provided.";

  reposEl.textContent = user.public_repos;
  followersEl.textContent = user.followers;
  followingEl.textContent = user.following;

  setOptionalField(locationItem, "📍", user.location);
  setOptionalField(companyItem, "🏢", user.company);
  setOptionalField(joinedItem, "📅 Joined", formatDate(user.created_at));

  profileLink.href = user.html_url;

  profile.classList.remove("hidden");
}

async function loadRepos(username) {
  repoList.textContent = "";

  try {
    const response = await fetch(
      "https://api.github.com/users/" + username + "/repos?per_page=100"
    );

    if (!response.ok) {
      throw new Error("Could not load repos");
    }

    const repos = await response.json();

    if (repos.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "No public repositories yet.";
      repoList.appendChild(emptyItem);
      return;
    }

    repos.sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count;
    });

    const topFive = repos.slice(0, 5);

    for (const repo of topFive) {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.textContent = repo.name;
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener";

      const description = document.createElement("p");
      description.textContent = repo.description || "No description.";

      const meta = document.createElement("span");
      meta.className = "repo-meta";
      meta.textContent =
        "⭐ " + repo.stargazers_count + "  •  " + (repo.language || "Unknown");

      li.appendChild(link);
      li.appendChild(description);
      li.appendChild(meta);

      repoList.appendChild(li);
    }
  } catch (error) {
    const errorItem = document.createElement("li");
    errorItem.textContent = "Couldn't load repositories.";
    repoList.appendChild(errorItem);
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = input.value.trim();

  const validationError = validateUsername(username);
  if (validationError) {
    hideProfile();
    showMessage(validationError, "error");
    return;
  }

  hideProfile();
  showMessage("Loading...", "loading");
  searchBtn.disabled = true;

  try {
    const user = await fetchProfile(username);
    hideMessage();
    displayProfile(user);
    loadRepos(user.login);

    localStorage.setItem("lastUsername", user.login);
  } catch (error) {
    if (error instanceof TypeError) {
      showMessage("Network error. Check your internet connection.", "error");
    } else {
      showMessage(error.message, "error");
    }
  } finally {
    searchBtn.disabled = false;
  }
});

const savedUsername = localStorage.getItem("lastUsername");
if (savedUsername) {
  input.value = savedUsername;
}