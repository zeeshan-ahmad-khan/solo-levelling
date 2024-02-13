import { ChangeEvent, useState } from "react";
import { IHome, ITodo } from "./type";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoListAtoms } from "../../atoms/todoAtoms";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [activity, setActivity] = useState("");
  const [todosList, setTodosList] = useRecoilState(todoListAtoms);

  return (
    <div className="bg-neutral-800 h-screen p-3 flex flex-col gap-3 text-md">
      <div className="flex items-center justify-between gap-3 text-white">
        <input
          value={activity}
          className="bg-neutral-900 flex-1 rounded-2xl px-3 py-2"
          placeholder="Enter the name of your level"
          onChange={(e) => setActivity(e.target.value)}
        />
        <button
          className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-900/75"
          onClick={() => {
            setTodosList((prev) => [
              ...prev,
              {
                id: Math.floor(Math.random() * 34347388473).toString(),
                name: activity,
                points: 0,
                level: 1,
                todos: [],
              },
            ]);
            setActivity("");
          }}
        >
          <FaPlus />
        </button>
      </div>
      <div className="text-white flex flex-col items-start justify-between gap-2">
        <h3 className="uppercase">Your Levels</h3>
        {todosList.map((d) => (
          <Todo key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}

function Todo({ d }: { d: IHome }) {
  const { id, name, points, level, todos } = d;
  const [activity, setActivity] = useState("");
  const [reward, setReward] = useState<number | "">("");
  const setTodoList = useSetRecoilState(todoListAtoms);

  const handleTodo = () => {
    const data = {
      id: Math.floor(Math.random() * 34347388473).toString(),
      title: activity,
      points: reward,
      isDone: false,
    };

    setTodoList((prev) => {
      return prev.map((d) => {
        if (d.id === id) return { ...d, todos: [...d.todos, data] };
        return d;
      });
    });

    setActivity("");
    setReward("");
  };

  const handleTodoChange = (
    e: ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const newTodos = todos.map((t) => {
      if (t.id === todoId) return { ...t, isDone: e.target.checked };
      return t;
    });

    const calculatedPoints: number | string = newTodos.reduce((acc, t) => {
      return acc + (t.isDone ? (t.points === "" ? 0 : t.points) : 0);
    }, 0);

    const newPoint = calculatedPoints % 100;
    const calculatedLevel = Math.floor(calculatedPoints / 100) + 1;

    setTodoList((prev) => {
      return prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            points: newPoint,
            level: calculatedLevel,
            todos: newTodos,
          };
        }
        return d;
      });
    });
  };

  return (
    <>
      <div className="bg-neutral-900 flex items-center justify-start gap-3 font-bold px-3 py-2 rounded-lg w-full">
        <div className="rounded-full">Lv {level}</div>
        <div className="flex flex-1 items-center justify-between">
          <p>{name}</p>
          <p>{points}</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-between gap-1 text-xs">
        <input
          value={activity}
          className="bg-neutral-900 w-full rounded-2xl px-3 py-2"
          placeholder="Write a todo"
          onChange={(e) => setActivity(e.target.value)}
        />
        <div className="w-full flex items-center justify-center gap-1">
          <input
            value={reward}
            className="bg-neutral-900 rounded-2xl px-3 py-2"
            inputMode="numeric"
            placeholder="Enter points"
            onChange={(e) =>
              setReward(e.target.value === "" ? "" : parseInt(e.target.value))
            }
          />
          <button
            className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-900/75"
            onClick={handleTodo}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div>
        {todos.map((todo: ITodo) => {
          const { id: todoId, title, points: todoPoints, isDone } = todo;
          return (
            <div
              className="w-full flex items-center justify-between gap-2 text-sm"
              key={id}
            >
              <div className="flex gap-2">
                <input
                  checked={isDone}
                  type="checkbox"
                  onChange={(e) => handleTodoChange(e, todoId)}
                />
                <p>{title}</p>
              </div>
              <p>Points: {todoPoints}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
