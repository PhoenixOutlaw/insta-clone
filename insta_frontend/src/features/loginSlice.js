import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  login:null,
  loading:false,
};



export const loginSlice = createSlice({
  name: 'login',
  initialState,
 
  reducers: {
    login: (state,action) => {
      state.login= action.payload;
      state.loading=false;
    },
    logout: (state) => {
      state.login= null;
    },
    // loadings: (state)=>{
    //   state.loading= true;
    // }
   
  },
 
});

export const { login, logout ,loading} = loginSlice.actions;
export const selectlogin=(state)=> state.login.login;
export const selectloading = (state)=>state.login.loading;
export default loginSlice.reducer;

