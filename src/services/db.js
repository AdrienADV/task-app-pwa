import Dexie from 'dexie';


const db = new Dexie('TodoDatabase');
db.version(1).stores({
    taskDetails: '++id, taskId, detail',
    task: '++id, content, isCompleted'
});

const addTodo = async (content) => {
    try {
        await db.todos.add({ content, isCompleted: false });
        return 'Tâche ajoutée avec succès';
    } catch (error) {
        console.error(error);
    }
};

const removeTodo = async (id) => {
    try {
        await db.todoDetails.where({ todoId: id }).delete();
        await db.todos.delete(id);
        return 'Tâche et détails associés retirés avec succès';
    } catch (error) {
        console.error(error);
    }
};

export { db, addTodo, removeTodo };
