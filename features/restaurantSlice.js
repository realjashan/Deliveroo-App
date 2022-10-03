import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 restaurant:{
    id:null,
    short_description:null,
    imgUrl:null,
    title:null,
    rating:null,
    genre:null,
    address:null,
    dishes:null,
 }
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant:(state,action)=>{
        state.restaurant=action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {setRestaurant} = restaurantSlice.actions;

export const selectRestaurant=(state)=>state.restaurant.restaurant;
 

//to prevent duplicate addition of itemms again and again//
 


 

export default restaurantSlice.reducer;
