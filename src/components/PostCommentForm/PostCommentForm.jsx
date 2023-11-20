import React from "react";
import "./PostCommentForm.scss";

function PostCommentForm({ handleInput, handleBlur, comVal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          name="post_comment"
          id="post_comment"
          placeholder="Write a comment..."
          className="comment-form__input"
          onChange={handleInput}
          onBlur={handleBlur}
          value={comVal}
          autoFocus
        ></textarea>
        <button className="comment-form__btn">Comment</button>
      </form>
    </div>
  );
}

export default PostCommentForm;
