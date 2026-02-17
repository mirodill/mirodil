import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reactToPost, toggleSavePost } from "@/api/post.api";

export const handleVote = createAsyncThunk(
  'interaction/handleVote',
  async ({ postId, type }, { rejectWithValue }) => {
    try {
      const res = await reactToPost(postId, type);
      return { postId, data: res?.data?.data || res?.data, type };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const handleSave = createAsyncThunk(
  'interaction/handleSave',
  async (postId, { rejectWithValue }) => {
    try {
      await toggleSavePost(postId);
      return postId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const interactionSlice = createSlice({
  name: 'interaction',
  initialState: {
    posts: {}, 
  },
  reducers: {
    initializePost: (state, action) => {
      const { id, likes_count, dislikes_count, user_reaction, is_saved } = action.payload;
      
      // MUHIM: Agar Redux-da bu post allaqachon bo'lsa VA yangi kelayotgan ma'lumotda 
      // reaction null bo'lsa, biz eskisi (to'g'risi)ni saqlab qolamiz.
      const existingPost = state.posts[id];

      if (!existingPost || user_reaction !== null) {
        state.posts[id] = {
          likes: Number(likes_count) || 0,
          dislikes: Number(dislikes_count) || 0,
          userReaction: user_reaction || (existingPost ? existingPost.userReaction : null),
          isSaved: is_saved !== undefined ? Boolean(is_saved) : (existingPost ? existingPost.isSaved : false)
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleVote.pending, (state, action) => {
        const { postId, type } = action.meta.arg;
        const post = state.posts[postId];
        if (!post) return;
        
        const isRemoving = post.userReaction === type;
        if (isRemoving) {
          type === 'like' ? post.likes-- : post.dislikes--;
          post.userReaction = null;
        } else {
          if (type === 'like') {
            post.likes++;
            if (post.userReaction === 'dislike') post.dislikes--;
          } else {
            post.dislikes++;
            if (post.userReaction === 'like') post.likes--;
          }
          post.userReaction = type;
        }
      })
      .addCase(handleSave.pending, (state, action) => {
        const postId = action.meta.arg;
        if (state.posts[postId]) {
          state.posts[postId].isSaved = !state.posts[postId].isSaved;
        }
      });
  }
});

export const { initializePost } = interactionSlice.actions;
export default interactionSlice.reducer;