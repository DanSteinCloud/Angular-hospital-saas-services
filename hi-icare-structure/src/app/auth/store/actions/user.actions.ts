import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
 
import { userStateInterface } from "src/app/shared/types/user.interface"
 
export const loadUsers = createAction('[User/API] Load Users', props<{ users: userStateInterface[] }>());
export const addUser = createAction('[User/API] Add User', props<{ user: userStateInterface }>());
export const setUser = createAction('[User/API] Set User', props<{ user: userStateInterface }>());
export const upsertUser = createAction('[User/API] Upsert User', props<{ user: userStateInterface }>());
export const addUsers = createAction('[User/API] Add Users', props<{ users: userStateInterface[] }>());
export const upsertUsers = createAction('[User/API] Upsert Users', props<{ users: userStateInterface[] }>());
export const updateUser = createAction('[User/API] Update User', props<{ update: Update<userStateInterface> }>());
export const updateUsers = createAction('[User/API] Update Users', props<{ updates: Update<userStateInterface>[] }>());
export const mapUsers = createAction('[User/API] Map Users', props<{ entityMap: EntityMap<userStateInterface> }>());
export const deleteUser = createAction('[User/API] Delete User', props<{ id: string }>());
export const deleteUsers = createAction('[User/API] Delete Users', props<{ ids: string[] }>());
export const deleteUsersByPredicate = createAction('[User/API] Delete Users By Predicate', props<{ predicate: Predicate<userStateInterface> }>());
export const clearUsers = createAction('[User/API] Clear Users');