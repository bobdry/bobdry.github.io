//const ances

const express = require('express');

const app = express();

const bodyParser = requires('body-parser');

const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan', created: new Date('2016-08-15'), effort: 5, completionDate: undefined, title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie', created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'), title: 'Missing bottom border on panel',
    },
];


//apps

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/issues', (req,res) => {
    const metadata = { total_count: issues.length };
    res.json( { _metadata: metadata, records: issues});
});

app.listen(3000, () => {
    console.log('App started on port 3000');
}); 

app.post('/api/issues', (req,res) => {
    const newIssue = req.body;
    newIssue.id = issues.lenght + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';
        issues.push(newIssue);
        res.json(newIssue);
});