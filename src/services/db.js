import Dexie from 'dexie';

import { areArgumentsValid } from './utils';
import { useLiveQuery } from 'dexie-react-hooks';


const db = new Dexie('database');
db.version(1).stores({
    taskDetails: '++id, taskId, content',
    tasks: '++id, label, isCompleted, status, type, detailsId'
});
// detailsId => 0: rien, 1 : GPS, 2 : Ajouter un fichier
// status =>  1 : lower priority, 2 : medium priority, 3 : higher priority,

//. status taskDetails => false : not completed, true : completed

const addTask = async (label, type, contentDetails) => {
    if (!areArgumentsValid(label, type)) {
        return { result: false, message: 'Veuillez entrer des données valides pour la tâche' };
    }
    try {
        const taskId = await db.tasks.add({ label, isCompleted: false, status: 3, type });
        if (type === 1 || type === 2) {
            await db.taskDetails.add({
                taskId, content: contentDetails
            });
        }
        return { result: true, message: 'Tâche ajoutée avec succès' };
    } catch (error) {
        console.error(error);
        return { result: false, message: 'Échec de l\'ajout de la tâche, veuillez réessayer.' };
    }
};

const removeTask = async (id) => {
    try {
        await db.taskDetails.where({ taskId: id }).delete();
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

const deleteAllTasks = async () => {
    try {
        await db.tasks.clear();
        await db.taskDetails.clear();
        return 'Toutes les tâches et détails associés retirés avec succès';
    } catch (error) {
        console.error(error);
    }
};

const changeTaskStatus = async (newStatus, taskId) => {
    try {
        await db.tasks.update(taskId, { status: newStatus });
        return { result: true, message: 'Statut de la tâche modifié avec succès' };
    } catch (error) {
        console.error(error);
    }
};

const TaskStatistics = () => {
    const taskStats = useLiveQuery(async () => {
        const allTasks = await db.tasks.toArray();
        const completedTasks = allTasks.filter(task => task.isCompleted);
        const completedCount = completedTasks.length;
        const totalCount = allTasks.length;

        return `Tâches complétées : ${completedCount} / ${totalCount}`;
    }, []);
}

const killDb = async () => {
    await db.tasks.clear();
    await db.taskDetails.clear();
}

export { db, addTask, removeTask, taskCompletedToggle, deleteAllTasks, changeTaskStatus, TaskStatistics, killDb };
