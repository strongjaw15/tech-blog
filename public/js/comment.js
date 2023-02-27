const commentForm = document.querySelector('#commentForm');

const postComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment").value

  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({comment: comment, user_id: blogPostData.user_id, post_id: blogPostData.post_id}),
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