import ITodo from "../interface";

const todos: ITodo[] = [
  { task: "Wash car", complete: false },
  { task: "Clean room", complete: true }
];

const Query = {
  // Get Todos
  async todos(parent, args, ctx, info) {
    return todos;
  }
};

export default Query;
