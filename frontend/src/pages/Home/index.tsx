import { ChangeEvent, useState } from "react";
import { IHome, ITodo } from "./type";
import { useRecoilState, useSetRecoilState } from "recoil";
import todoListAtoms from "../../atoms/todoAtoms";

export default function Home() {
  const [activity, setActivity] = useState("");
  const [todosList, setTodosList] = useRecoilState(todoListAtoms);

  return (
    <div>
      <div className="flex ">
        <input type="text" onChange={(e) => setActivity(e.target.value)} />
        <button
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
          }}
        >
          add
        </button>
      </div>
      <div>
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
  const [reward, setReward] = useState(0);
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
  };

  const handleTodoChange = (
    e: ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const newTodos = todos.map((t) => {
      if (t.id === todoId) return { ...t, isDone: e.target.checked };
      return t;
    });

    const calculatedPoints = newTodos.reduce((acc, t) => {
      return acc + (t.isDone ? t.points : 0);
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
    <div>
      <div className="flex gap-3 font-bold border-black border-2">
        <h1>{name}</h1>
        <p>Points: {points}</p>
        <p>Level: {level}</p>
      </div>
      <div>
        <input type="text" onChange={(e) => setActivity(e.target.value)} />
        <input
          type="number"
          onChange={(e) => setReward(parseInt(e.target.value))}
        />
        <button onClick={handleTodo}>Add Todo</button>
      </div>
      <div>
        {todos.map((todo: ITodo) => {
          const { id: todoId, title, points: todoPoints, isDone } = todo;
          return (
            <div className="flex gap-2" key={id}>
              <input
                checked={isDone}
                type="checkbox"
                onChange={(e) => handleTodoChange(e, todoId)}
              />
              <p>{title}</p>
              <p>Points:{todoPoints}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
