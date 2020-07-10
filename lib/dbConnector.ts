const tasks = [
    {
        id: 1,
        username: 'שם משתמש',
        phone: '0526589595',
        email: 'name@doamin.com',
        done: true,
        date: '14.08.2019',
    },
    {
        id: 2,
        username: 'שם משתמש',
        phone: '0526589595',
        email: 'name@doamin.com',
        done: false,
        date: '13.06.2019',
    }
];

class DbConnector {
    getAllTasks() {
        return Promise.resolve(tasks);
    }

    getTask(id: number) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) return Promise.resolve(tasks[i]);
        }
        return Promise.reject('Task does not exist');
    }

    createTask(task: NewTaskType) {
        tasks.push({
            id: tasks.length + 1,
            username: task.username,
            phone: task.phone,
            email: task.email,
            done: false,
            date: '10.07.2020',
        });
        return Promise.resolve();
    }

    async editTask(task: EditTaskType) {
        const curTask = await this.getTask(task.id);
        if (!curTask) return Promise.reject();
        curTask.username = task.username;
        curTask.phone = task.phone;
        curTask.email = task.email;
        curTask.done = task.done;
        return Promise.resolve();
    }

    deleteTask(id: number) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);
                return Promise.resolve();
            }
        }
        return Promise.reject('Task not found');
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