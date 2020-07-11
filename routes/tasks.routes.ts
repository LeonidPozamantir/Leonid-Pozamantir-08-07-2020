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

const validate = (username: string, phone: string, email: string) => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!username) return 'Username is required';
    if (!phone) return 'Phone is required';
    if (!email) return 'Email is required';
    if (!/^\d{10}$/.test(phone)) return 'Phone should be exactly 10 digits';
    if (!emailRegex.test(email)) return 'Email is invalid';
    return null;
};

router.post('/create', async (req, res) => {
    const validationErrorMessage = validate(req.body.username, req.body.phone, req.body.email);
    if (validationErrorMessage) {
        res.status(200).send({ resultCode: 1, data: {}, message: validationErrorMessage });
        return;
    }
    try {
        await dbConnector.createTask(req.body);
        res.status(200).send({ resultCode: 0, data: {}, message: '' });
    } catch (e) {
        res.status(200).send({ resultCode: 1, data: {}, message: e.message });
    }
});

router.put('/edit', async (req, res) => {
    const validationErrorMessage = validate(req.body.username, req.body.phone, req.body.email);
    if (validationErrorMessage) {
        res.status(200).send({ resultCode: 1, data: {}, message: validationErrorMessage });
        return;
    }
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