let post = window.location.pathname.split("/");

// Function allowing user to edit posts
const editPost = async (event) => {
  event.preventDefault();

  // get text and trim whitespace
  const comment_body = document.getElementById("edit-btn").value.trim();


  document.location.assign(`/createPost/${post[2]}`);
};

const editButton = document.querySelectorAll("#edit-btn");

// Iterates over all buttons on the page allowing for edit functionality
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}