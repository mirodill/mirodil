import { configureStore } from '@reduxjs/toolkit';
import interactionReducer from '../features/posts/postInteractionSlice'; // Manzilni tekshiring!

export const store = configureStore({
  reducer: {
    interaction: interactionReducer,
  },
});