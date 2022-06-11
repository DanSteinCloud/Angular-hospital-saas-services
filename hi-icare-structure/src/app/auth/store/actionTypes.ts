export enum actionTypes {
    REGISTER = '[Auth] Register',
    REGISTER_SUCCES = '[Auth] Register success',
    REGISTER_FAILURE = '[Auth] Register failure',

    LOGIN= '[Auth] Login',
    LOGIN_SUCCES = '[Auth] Login success',
    LOGIN_FAILURE = '[Auth] Login failure',

    GET_PRSNL_LIST = '[Prsnl API] Get Prsnl List',
    ADD_CURRENT_PRSNL = '[Prsnl API] Add Prsnl',
    SHOW_CURRENT_PRSNL = '[Prsnl API] Show current Prsnl',
    UPDATE_CURRENT_PRSNL = '[Prsnl API] Update current Prsnl',
    DELETE_CURRENT_PRSNL = '[Prsnl API] Delete current Prsnl',

    GET_USER_LIST = '[User API] Get User List',
    ADD_CURRENT_USER = '[User API] Add User',
    SHOW_CURRENT__USER = '[User API] Show current User',
    UPDATE_CURRENT_USER = '[User API] Update current User',
    DELETE_CURRENT__USER = '[User API] Delete current User',
}