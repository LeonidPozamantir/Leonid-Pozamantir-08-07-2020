
const moment = require('moment');
import knex from './knex';

class DbConnector {
    getAllTasks() {
        return knex<TaskType>('tasks').select()
        .then((tasks) => {
            tasks.forEach(t => {
                t.done = !!t.done;
            });
            return tasks;
        });
    }

    getTask(id: number) {
        return knex<TaskType>('tasks').where({ id }).first();
    }

    createTask(task: NewTaskType) {
        const newRecord = {
            username: task.username,
            phone: task.phone,
            email: task.email,
            done: false,
            date: moment().format('DD.MM.YYYY'),
        };
        return knex<TaskType>('tasks').insert(newRecord);
    }

    async editTask(task: EditTaskType) {
        const updatedTask = { ...task };
        delete updatedTask.id;
        return knex<TaskType>('tasks').where({ id: task.id }).update(updatedTask);
    }

    deleteTask(id: number) {
        return knex('tasks').where({ id }).delete();
    }
};

module.exports = new DbConnector();

export type NewTaskType = {
    username: string,
    phone: string,
    email: string,
};
export type EditTaskType = NewTaskType & {
    id: number,
    done: boolean,
};
export type TaskType = EditTaskType & {
    date: string,
};