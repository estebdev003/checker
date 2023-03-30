require('dotenv').config();
const FacebookService = require('./src/services/FacebookService');
const express = require('express');
const CsvService = require('./src/services/CsvService');
const path = require('path');
const { pass } = require('./src/middlewares/pass');

const app = express();

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

app.post('/groups-without-revision/batch', pass, async (req, res) => {
    const groups = req.query.groups;
    const facebookService = new FacebookService(groups);
    const groupsWithoutRevision = await facebookService.getGroupsWithoutRevision();

    if (req.headers['accept'] === 'text/csv') {
        const csv = await new CsvService(
            groupsWithoutRevision.map(group => ({id: group}))
        ).convertToCsv();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=groups-without-revision.csv');
        res.send(csv);
        return;
    }

    res.send({ groups: groupsWithoutRevision });
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});