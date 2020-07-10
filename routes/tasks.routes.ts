import { Router } from 'express';

const dbConnector = require('../lib/dbConnector');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await dbConnector.getAllTasks();
        res.status(200).send({ resultCode: 0, data: tasks, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await dbConnector.getTask(parseInt(req.params.id));
        res.status(200).send({ resultCode: 0, data: task, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e });
    }
});

router.post('/create', async (req, res) => {
    try {
        await dbConnector.createTask(req.body);
        res.status(200).send({ resultCode: 0, data: {}, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e.message });
    }
});
// TODO: validators everywhere
router.put('/edit', async (req, res) => {
    try {
        await dbConnector.editTask(req.body);
        res.status(200).send({ resultCode: 0, data: {}, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await dbConnector.deleteTask(parseInt(req.params.id));
        res.status(200).send({ resultCode: 0, data: {}, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e.message });
    }
});

module.exports = router;