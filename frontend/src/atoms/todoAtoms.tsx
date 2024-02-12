import { atom } from "recoil";
import { IHome } from "../pages/Home/type";

export const todoListAtoms = atom<IHome[]>({
  key: "TodoList",
  default: [],
});
