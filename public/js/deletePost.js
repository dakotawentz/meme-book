// Function created allowing user to delete posts 
const deletePost = async (event) => {
    event.preventDefault();
      
    let post = window.location.pathname.split("/");
    
    const response = await fetch(`/api/meme/${post[2]}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/home`);
    } else {
      alert(response.statusText);
    }
  };
  
  const deleteButton = document.querySelectorAll("#delete-btn");
  
  // Iterates over all buttons on the page allowing for delete functionality
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePost);
  }