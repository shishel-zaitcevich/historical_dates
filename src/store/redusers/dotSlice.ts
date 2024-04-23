// dotsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dot {
    id: string;
    ref: React.RefObject<HTMLDivElement>;
    radius: number;
    isSelected: boolean;
  }

const initialState: Dot[] = [];

// Создаем слайс для управления состоянием точек
const dotsSlice = createSlice({
  name: 'dots',
  initialState,
  reducers: {
    // Устанавливаем новое состояние точек
    setDots: (state, action: PayloadAction<Dot[]>) => {
      return action.payload;
    },
  },
});

export const { setDots } = dotsSlice.actions;

export default dotsSlice.reducer;
