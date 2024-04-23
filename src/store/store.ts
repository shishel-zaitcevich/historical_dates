// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({})

// export const setupStore = () =>{
//   return configureStore({
//     reducer: rootReducer
//   })
// }

// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']


import { configureStore } from '@reduxjs/toolkit';
import dotsReducer from '../store/redusers/dotSlice';

// Создаем Redux Store с редьюсером для управления состоянием точек
const store = configureStore({
  reducer: {
    dots: dotsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;