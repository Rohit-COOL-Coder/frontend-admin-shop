import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userReducer from "./userReducer"
import productReducer from "./productReducer"
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

let persistConfig={
key:"root",
version:1,
storage
}

const rootReducer=combineReducers({
  user:userReducer,
  product:productReducer
})

let persistedReducer=persistReducer(persistConfig,rootReducer)

export let store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
})

export let persistor=persistStore(store)