import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const userPersistConfig = {
    key: 'user',
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

