import { createContext } from "react";

export type Data = Record<string, unknown> 

export const DataContext = createContext<{ data: Data[], setData: (value: Data[]) => void }>({
  data: [],
  setData: () => {}
});