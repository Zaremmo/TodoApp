import Toast from "./Toast";
import { TodosContextProvider } from "./TodoContext";
import TodoForm from "./TodoForm";
import TododsTable from "./TodosTable";

function App() {
  return (
    <TodosContextProvider>
      <div className=" w-screen h-screen p-10 flex justify-center items-start ">
        <div className="container flex flex-col lg:flex-row justify-evenly">
          <div className="p-5 lg:w-3/4 w-full">
            <TododsTable />
          </div>
          <div className="p-5 flex flex-col lg:w-1/4 w-full mt-10 lg:mt-0 ">
            <TodoForm />
          </div>
        </div>
        <Toast />
      </div>
    </TodosContextProvider>
  );
}

export default App;
