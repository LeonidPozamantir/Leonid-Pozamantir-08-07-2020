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
};

module.exports = new DbConnector();