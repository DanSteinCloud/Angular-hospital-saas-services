import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { userStateInterface } from "src/app/shared/types/user.interface"
import * as UserActions from "src/app/auth/store/actions/user.actions";
 
export interface State extends EntityState<userStateInterface> {
  // additional entities state properties
  selectedUserId: number | null;
}
 
export const adapter: EntityAdapter<userStateInterface> = createEntityAdapter<userStateInterface>();
 
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});
 
const usrReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => {
    return adapter.addOne(user, state)
  }),
  on(UserActions.setUser, (state, { user }) => {
    return adapter.setOne(user, state)
  }),
  on(UserActions.upsertUser, (state, { user }) => {
    return adapter.upsertOne(user, state);
  }),
  on(UserActions.addUsers, (state, { users }) => {
    return adapter.addMany(users, state);
  }),
  on(UserActions.upsertUsers, (state, { users }) => {
    return adapter.upsertMany(users, state);
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(UserActions.updateUsers, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(UserActions.mapUsers, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(UserActions.deleteUsers, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(UserActions.loadUsers, (state, { users }) => {
    return adapter.setAll(users, state);
  }),
  on(UserActions.clearUsers, state => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);
 
export function userReducer(state: State | undefined, action: Action) {
  return usrReducer(state, action);
}
 
export const getSelectedUserId = (state: State) => state.selectedUserId;
 
// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
 
// select the array of user ids
export const selectUserIds = selectIds;
 
// select the dictionary of user entities
export const selectUserEntities = selectEntities;
 
// select the array of users
export const selectAllUsers = selectAll;
 
// select the total user count
export const selectUserTotal = selectTotal;