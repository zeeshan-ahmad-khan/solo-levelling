export interface IHome {
  readonly id: string;
  name: string;
  points: number;
  level: number;
  todos: ITodo[];
}

export interface ITodo {
  readonly id: string;
  title: string;
  points: number;
  isDone: boolean;
}
