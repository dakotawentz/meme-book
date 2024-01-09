document.addEventListener( "DOMContentLoad", function () {
    // Sample data for the profile
    const profileData = {
        firstName: "Ema",
        email: "ema@example.com",
        bio: "Full stack developer.",
        profilePicture: ""
    };
    
    // get handlebars template
    const profileTemplate = document.getElementById("profile-template").innerHTML;
    
    // compile the template
    const compiledTemplate = Handlebars.compile(profileTemplate);
    
    // render the profile using the data
    const renderedProfile = compiledTemplate(profileData);
    
    // Append the render profile to the document
    document.body.innerHTML += renderedProfile;
    });
    
    // Function allows users to delete meme posts on profile page and then redirect them to an updated profile
    const deletePost = async (event) => {
        event.preventDefault();
          
        let memePostId = event.target.getAttribute("data-id");
        
      
        const response = await fetch(`/api/memePost/${memePostId}`, {
          method: "DELETE",
        });
      
        if (response.ok) {
          document.location.assign(`/profile`);
        } else {
          alert(response.statusText);
        }
      };
      
      // Function allows user to edit meme posts on profile page by redirecting them to the /create/:id page
      const editBlogPost = async (event) => {
        event.preventDefault();
          
        let memePostId = event.target.getAttribute("data-id");
      
        document.location.assign(`/create/${memePostId}`);
      };
      
      const editButton = document.querySelectorAll("#edit-btn");
      
      // Iterates over all buttons on the page and allows for edit functionality
      for (let i = 0; i < editButton.length; i++) {
        editButton[i].addEventListener("click", editBlogPost);
      }
      
      const deleteButton = document.querySelectorAll("#delete-btn");
      
      // Iterates over all buttons on the page and allows for delete functionality
      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", deletePost);
      }