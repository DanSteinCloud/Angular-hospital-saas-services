import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { prsnlStateInterface } from "src/app/shared/types/prsnl.interface"
import * as PrsnlActions from "src/app/auth/store/actions/prsnl.actions";
 
export interface State extends EntityState<prsnlStateInterface > {
  // additional entities state properties
  selectedUserId: number | null;
}
 
export const adapter: EntityAdapter<prsnlStateInterface > = createEntityAdapter<prsnlStateInterface >();
 
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});
 
const persnlReducer = createReducer(
  initialState,
  on(PrsnlActions.addPrsnl, (state, { prsnl }) => {
    return adapter.addOne(prsnl, state)
  }),
  on(PrsnlActions.setPrsnl, (state, { prsnl }) => {
    return adapter.setOne(prsnl, state)
  }),
  on(PrsnlActions.upsertPrsnl, (state, { prsnl }) => {
    return adapter.upsertOne(prsnl, state);
  }),
  on(PrsnlActions.addPrsnls, (state, { prsnls }) => {
    return adapter.addMany(prsnls, state);
  }),
  on(PrsnlActions.upsertPrsnls, (state, { prsnls }) => {
    return adapter.upsertMany(prsnls, state);
  }),
  on(PrsnlActions.updatePrsnl, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(PrsnlActions.updatePrsnls, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(PrsnlActions.mapPrsnls, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(PrsnlActions.deletePrsnl, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(PrsnlActions.deletePrsnls, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(PrsnlActions.deletePrsnlsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(PrsnlActions.loadPrsnls, (state, { prsnls }) => {
    return adapter.setAll(prsnls, state);
  }),
  on(PrsnlActions.clearPrsnls, state => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);

export function prsnlReducer(state: State | undefined, action: Action) {
  return persnlReducer(state, action);
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