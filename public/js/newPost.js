// Function allow users to create new posts
async function createNewPost(event) {
  event.preventDefault();

  // const title = document.querySelector("#titleInput").value.trim();
  const description = document.querySelector("#post-description").value.trim();

  if (description) {
    const response = await fetch(`/api/meme`, {
      method: "POST",
      body: JSON.stringify({
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/meme");
    } else {
      alert(response.statusText);
    }
  }
}

// Event Listener
document
  .querySelector("#create-post")
  .addEventListener("submit", createNewPost);
