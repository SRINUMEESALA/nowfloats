const initialState = {
  likesList: [],
  comments: [
    {
      postId: "JwsTE0i2IoYBAGOJvVZn",
      commentsList: ["Hello! How are you."],
      date: new Date(2023 - 12 - 12),
    },
  ],
};

const onClickLikeButton = (state, postId) => {
  let updatedList = [];
  if (state.likesList.includes(postId)) {
    updatedList = state.likesList.filter((id) => id !== postId);
    // console.log("removed", updatedList);
    return updatedList;
  } else {
    updatedList = [...state.likesList, postId];
    // console.log("added", updatedList);
    return updatedList;
  }
};

const reducer = (state = initialState, action) => {
  let updatedState = state;
  let { postId, type, updatedComments } = action;

  switch (type) {
    case "onClickLikeButton":
      updatedState = {
        ...updatedState,
        likesList: onClickLikeButton(state, postId),
      };
      break;
    case "postComment":
      updatedState = {
        ...updatedState,
        comments: updatedComments,
      };
      break;
    default:
      break;
  }

  return updatedState;
};
export default reducer;
