import Dexie from 'dexie';
import { areArgumentsValid } from './utils';


const db = new Dexie('database');
db.version(1).stores({
    taskDetails: '++id, taskId, detail',
    tasks: '++id, label, isCompleted, status'
});

// status =>  1 : lower priority, 2 : medium priority, 3 : higher priority,

const addTask = async (label) => {
    if (!areArgumentsValid(label)) {
        return { result: false, message: 'Veuillez entrer une tâche valide' }
    }
    try {
        await db.tasks.add({ label, isCompleted: false, status: 1 });
        return { result: true, message: 'Tâche ajoutée avec succès' };
    } catch (error) {
        console.error(error);
    }
};

const removeTask = async (id) => {
    try {
        await db.taskDetails.where({ todoId: id }).delete();
        await db.tasks.delete(id);
        return 'Tâche et détails associés retirés avec succès';
    } catch (error) {
        console.error(error);
    }
};

const taskCompletedToggle = async (id, status) => {
    try {
        await db.tasks.update(id, { isCompleted: status });
        return { result: true, message: 'Tâche marquée comme terminée avec succès' };
    } catch (error) {
        console.error(error);
    }
}

export { db, addTask, removeTask, taskCompletedToggle };
