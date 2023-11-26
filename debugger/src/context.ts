import { createContext } from "react";

export type Data = Record<string, unknown> & { date?: Date }

export const DataContext = createContext<{ 
  data: Data[], 
  setData: (value: Data[] | ((value: Data[]) => Data[])) => void 
  current: Data | null,
  setCurrent: (value: Data) => void
}>({
  data: [],
  setData: () => {},
  current: null,
  setCurrent: () => {}
});