import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUserState } from '../../types/TUserState';

const initialState: TUserState = {
  info: {
    phone: '',
    email: '',
    nickname: '',
    name: '',
    sername: '',
    sex: '',
    advantages: ['', '', ''],
    checkbox: [],
    radioGroup: 0,
    about: '',
  },
};

const postData = createAsyncThunk('user/postDate', async (data: TUserState) => {
  try {
    const responce = await fetch('https://api.sbercloud.ru/content/v1/bootcamp/frontend', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data.info),
    });

    return responce.json();
  } catch (err) {
    return err;
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateData(state, action) {
      state.info = { ...state.info, ...action.payload };
    },
  },
});

const userSliceReducer = userSlice.reducer;
const { updateData } = userSlice.actions;

export { userSliceReducer, updateData, postData };
