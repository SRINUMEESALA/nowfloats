const initialState = {
  likesList: [],
};

const onClickLikeButton = (state, postId) => {
  if (state.likesList.includes(postId)) {
    return state.likesList.filter((id) => id !== postId);
  } else {
    return [...state.likesList, postId];
  }
};

const reducer = (state = initialState, action) => {
  let newList = [];
  let { postId } = action;
  console.log(postId);
  switch (action.type) {
    case "onClickLikeButton":
      newList = onClickLikeButton(state, postId);
      break;
    default:
      break;
  }
  console.log(state);
  return { ...state, likesList: newList };
};
export default reducer;
