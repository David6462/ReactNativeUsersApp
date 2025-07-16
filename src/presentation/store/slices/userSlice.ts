import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserListItem } from '../../../domain/entities/User';
import DIContainer from '../../../shared/di/container';

interface UserState {
  users: UserListItem[];
  selectedUser: User | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  searchQuery: '',
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const container = DIContainer.getInstance();
      return await container.getUsersUseCase.execute();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido...');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const container = DIContainer.getInstance();
      return await container.getUserByIdUseCase.execute(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido...');
    }
  }
);

export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (query: string, { rejectWithValue }) => {
    try {
      const container = DIContainer.getInstance();
      return await container.searchUsersUseCase.execute(query);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido...');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer;