import { atom } from "recoil";
import { IHome } from "../pages/Home/type";

const todoListAtoms = atom<IHome[]>({
  key: "TodoList",
  default: [],
});

export default todoListAtoms;
