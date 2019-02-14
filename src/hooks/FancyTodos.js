import React from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false
        }
      ];

    case 'DELETE':
      return state.filter(item => item.id !== action.payload);

    case 'COMPLETED':
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });

    case 'RESET':
      return action.payload;

    default:
      return state;
  }
}

const Context = React.createContext();

function useEffectOnce(cb) {
  const didRun = React.useRef(false);

  React.useEffect(() => {
    if (!didRun.current) {
      cb();
      didRun.current = true;
    }
  });
}

export default function FancyTodosApp() {
  const [state, dispatch] = React.useReducer(appReducer, []);

  useEffectOnce(() => {
    const raw = localStorage.getItem('data');
    dispatch({ type: 'RESET', payload: JSON.parse(raw) });
  });

  React.useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <div>
        <h2>Todos App</h2>
        <br />
        <button onClick={() => dispatch({ type: 'ADD' })}>NEW TODO</button>
        <br />
        <br />
        <TodosList items={state} />
        <br />
        <hr />
      </div>
    </Context.Provider>
  );
}

function TodosList({ items }) {
  return items.map(item => <TodosItem key={item.id} {...item} />);
}

function TodosItem({ id, completed, text }) {
  const dispatch = React.useContext(Context);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: 'COMPLETED', payload: id })}
      />

      <input type="text" defaultValue={text} />

      <button onClick={() => dispatch({ type: 'DELETE', payload: id })}>
        Delete
      </button>
    </div>
  );
}
