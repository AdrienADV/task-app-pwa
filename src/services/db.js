import Dexie from 'dexie';

import { areArgumentsValid } from './utils';
import { useLiveQuery } from 'dexie-react-hooks';


const db = new Dexie('database');
db.version(1).stores({
    taskDetails: '++id, taskId, detail',
    tasks: '++id, label, isCompleted, status, type'
});

// status =>  1 : lower priority, 2 : medium priority, 3 : higher priority,

const addTask = async (label) => {
    if (!areArgumentsValid(label)) {
        return { result: false, message: 'Veuillez entrer une tâche valide' }
    }
    try {
        await db.tasks.add({ label, isCompleted: false, status: 3 });
        return { result: true, message: 'Tâche ajoutée avec succès' };
    } catch (error) {
        console.error(error);
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
        // Récupérer toutes les tâches
        const allTasks = await db.tasks.toArray();

        // Filtrer pour obtenir uniquement les tâches complétées
        const completedTasks = allTasks.filter(task => task.isCompleted);

        // Calculer le nombre de tâches complétées et le total des tâches
        const completedCount = completedTasks.length;
        const totalCount = allTasks.length;

        // Retourner un objet avec les statistiques
        return `Tâches complétées : ${completedCount} / ${totalCount}`;
    }, []); // Le tableau de dépendances vide signifie que la requête sera exécutée une fois au montage du composant
}

export { db, addTask, removeTask, taskCompletedToggle, deleteAllTasks, changeTaskStatus, TaskStatistics };
