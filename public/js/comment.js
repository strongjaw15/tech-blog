const commentForm = document.querySelector('#commentForm');

const postComment = async (event) => {
  event.preventDefault();

  console.log(blogPostData.post_id);
  console.log(blogPostData.user_id);
  console.log(blogPostData.username);  

  const comment = document.querySelector("#comment").value

  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({content: comment, post_id: blogPostData.post_id}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload()
    } else {
      alert(response.statusText);
    }
  }
};

commentForm.addEventListener('submit', postComment);