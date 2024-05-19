

const express = require('express');
const fetch = require('fetch');
const router = express.Router();

const userRoutes = require('./user-routes');
const projectRoutes = require('./projects-routes');



// Define routes
router.use('/api/users', userRoutes);
router.use('/api/projects', projectRoutes);


router.post('/api/ai', async (req, res) =>
{
    fetch.fetchUrl('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.CHAT_GPT,
            'content-type': 'application/json',
        },
        payload: JSON.stringify(req.body)
    }, (ab, b, c) => {
        res.send(JSON.parse(c));
    });
});

module.exports = router;