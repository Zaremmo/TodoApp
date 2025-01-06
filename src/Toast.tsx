import { useTodoContext } from "./TodoContext";

function Toast() {
  const { toastMessage } = useTodoContext();

  return toastMessage ? (
    <div className="toast">
      <div className="alert alert-info">
        <span>{toastMessage}</span>
      </div>
    </div>
  ) : null;
}

export default Toast;
