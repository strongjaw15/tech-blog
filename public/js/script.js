const commentForm = document.querySelector('#commentForm');

const postComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment").value
  const user_id = document.querySelector("#password").value
  const post_id = document.querySelector("#password").value

  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({comment: comment, user_id: user_id, post_id: post_id}),
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