import { configureStore } from "@reduxjs/toolkit";

import { userSliceReducer } from "./slice/userSlice";
import { formSliceReducer } from "./slice/formSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    form: formSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export { store };