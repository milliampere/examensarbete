const initialState = {
  standard: [],
  vitamin: [],
  mineral: [],
  fat: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ROW":    
      return {...state, 
        [action.tab]: [...state[action.tab], action.value]}
      break;
    default:
      return state;
  }

}

export default reducer;