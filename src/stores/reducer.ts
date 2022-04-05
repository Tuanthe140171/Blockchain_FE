import profileEditPersonReducer from "./reducer/profile-edit-person.reducer";
import userLayoutReducer from "./reducer/user-layout.reducer";
import userPostDataReducer from "./reducer/user-post.reducer";
import { combineReducers } from "redux";

export interface IObject {
  [key: string]: any;
}
// const reducer: IObject = {};

const rootReducer = combineReducers({
  profileEditPerson: profileEditPersonReducer,
  userLayout: userLayoutReducer,
  userPostData: userPostDataReducer,
});

export default rootReducer;
