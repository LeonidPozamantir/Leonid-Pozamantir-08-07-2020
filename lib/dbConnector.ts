
const moment = require('moment');
const knex = require('./knex');

class DbConnector {
    getAllTasks() {
        return knex('tasks').select()
        .then((tasks: Array<TaskType>) => {
            tasks.forEach(t => {
                t.done = !!t.done;
            });
            return tasks;
        });
    }

    getTask(id: number) {
        return knex('tasks').where({ id }).first();
    }

    createTask(task: NewTaskType) {
        const newRecord = {
            username: task.username,
            phone: task.phone,
            email: task.email,
            done: false,
            date: moment().format('DD.MM.YYYY'),
        };
        return knex('tasks').insert(newRecord);
    }

    async editTask(task: EditTaskType) {
        const updatedTask = { ...task };
        delete updatedTask.id;
        return knex('tasks').where({ id: task.id }).update(updatedTask);
    }

    deleteTask(id: number) {
        return knex('tasks').where({ id }).delete();
    }
};

module.exports = new DbConnector();

type NewTaskType = {
    username: string,
    phone: string,
    email: string,
};
type EditTaskType = NewTaskType & {
    id: number,
    done: boolean,
};
type TaskType = EditTaskType & {
    date: string,
};