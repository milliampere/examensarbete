const initialState = [
    {name: "Hello"}
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ROW":
      return {...state, rows: action.value}
      break;
    default:
      return state;
  }

}

export default reducer;