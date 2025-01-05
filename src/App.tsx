import { TodosContextProvider } from "./TodoContext";
import TodoForm from "./TodoForm";
import TododsTable from "./TodosTable";

function App() {
  return (
    <TodosContextProvider>
      <div className=" w-screen h-screen p-10 flex justify-center items-start ">
        <div className="container flex flex-col md:flex-row justify-evenly">
          <TododsTable />

          <TodoForm />
        </div>
      </div>
    </TodosContextProvider>
  );
}

export default App;
