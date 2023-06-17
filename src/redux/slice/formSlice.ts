import { createSlice } from '@reduxjs/toolkit';
import { FirstForm } from '../../components/simple/FirstForm';
import { TFormState } from '../../types/TFormState';

const initialState: TFormState = {
  step: 1,
  form: FirstForm,
}

const formSilce = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action) {
      state.form = action.payload.form;
      state.step = action.payload.step;
    }
  }
});

const formSliceReducer = formSilce.reducer;
const { updateForm } = formSilce.actions;

export { formSliceReducer, updateForm };