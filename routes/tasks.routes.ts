import { Router } from 'express';

const dbConnector = require('../lib/dbConnector');

const router = Router();

router.get('/', async (req, res) => {
    const tasks = await dbConnector.getAllTasks();
    res.status(200).send({ resultCode: 0, data: tasks, message: '' });
});

module.exports = router;