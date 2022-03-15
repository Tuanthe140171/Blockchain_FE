import profileEditPersonReducer from "./reducer/profile-edit-person.reducer";
import { combineReducers } from "redux";

export interface IObject {
  [key: string]: any;
}
// const reducer: IObject = {};

const rootReducer = combineReducers({
  profileEditPerson: profileEditPersonReducer,
});

export default rootReducer;
