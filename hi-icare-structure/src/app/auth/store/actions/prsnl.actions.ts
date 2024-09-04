import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, Predicate } from '@ngrx/entity';
 
import { prsnlStateInterface } from "src/app/shared/types/prsnl.interface"
 
export const loadPrsnls = createAction('[Prsnl/API] Load Prsnls', props<{ prsnls: prsnlStateInterface [] }>());
export const addPrsnl = createAction('[Prsnl/API] Add Prsnl', props<{ prsnl: prsnlStateInterface  }>());
export const setPrsnl = createAction('[Prsnl/API] Set Prsnl', props<{ prsnl: prsnlStateInterface  }>());
export const upsertPrsnl = createAction('[Prsnl/API] Upsert Prsnl', props<{ prsnl: prsnlStateInterface  }>());
export const addPrsnls = createAction('[Prsnl/API] Add Prsnls', props<{ prsnls: prsnlStateInterface [] }>());
export const upsertPrsnls = createAction('[Prsnl/API] Upsert Prsnls', props<{ prsnls: prsnlStateInterface [] }>());
export const updatePrsnl = createAction('[Prsnl/API] Update Prsnl', props<{ update: Update<prsnlStateInterface > }>());
export const updatePrsnls = createAction('[Prsnl/API] Update Prsnls', props<{ updates: Update<prsnlStateInterface >[] }>());
export const mapPrsnls = createAction('[Prsnl/API] Map Prsnls', props<{ entityMap: EntityMap<prsnlStateInterface > }>());
export const deletePrsnl = createAction('[Prsnl/API] Delete Prsnl', props<{ id: string }>());
export const deletePrsnls = createAction('[Prsnl/API] Delete Prsnls', props<{ ids: string[] }>());
export const deletePrsnlsByPredicate = createAction('[Prsnl/API] Delete Prsnls By Predicate', props<{ predicate: Predicate<prsnlStateInterface > }>());
export const clearPrsnls = createAction('[Prsnl/API] Clear Prsnls');