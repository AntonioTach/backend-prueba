import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Fetching all users');
});

router.post('/', (_req, res) => {
    res.send('Saving user');
});

export default router;