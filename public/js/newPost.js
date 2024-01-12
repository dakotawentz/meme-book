// Function allow users to create new posts
async function createNewPost(event) {
  event.preventDefault();

  // const title = document.querySelector("#titleInput").value.trim();
  const caption = document.querySelector("#post-caption").value.trim();
  const image = document.querySelector("#imageInput").value.trim();

  console.log(caption);
  // const image = document.querySelector('#imageInput').files[0];

  if (caption) {
    const response = await fetch('/api/meme', {
      method: "POST",
      body: JSON.stringify({
        caption,
      }), 
      image,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

// Event Listener
document
  .querySelector("#create-post")
  .addEventListener("submit", createNewPost);
