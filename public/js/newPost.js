// Function allow users to create new posts
async function createNewPost(event) {
  console.log("CLICKED");
    event.preventDefault();
  
    // const title = document.querySelector("#titleInput").value.trim();
    const caption = document.querySelector("#post-caption").value.trim();
    console.log(caption, "caption");
  
    if (caption) {
      const response = await fetch(`/api/meme`, {
        method: "POST",
        body: JSON.stringify({  
          caption,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/homepage");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  // Event Listener
  document
    .querySelector("#create-post")
    .addEventListener("submit", createNewPost);