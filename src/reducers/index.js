import { combineReducers } from 'redux';

// Reducers
import totalNutrients from './totalNutrients';

const rootReducer = combineReducers({
    totalNutrients: totalNutrients
});

export default rootReducer;