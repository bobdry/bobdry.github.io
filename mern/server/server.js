//const ances
const express = require('express');

const app = express();

const bodyParser = requires('body-parser');

//apps
app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/issues', (req,res) => {
    db.collection('issues').find().toArray().then(issues => {
        const metadata = {total_count:issues.length};
        res.json({_metadata: metadata, records:issues})
    }).catch(error => {
        console.log(error);
        res.status(500).json({message:'Internal Server Error: ${error}'});
    });
});

app.listen(3000, () => {
    console.log('App started on port 3000');
}); 

//connect to mongo db constants
const MongoClient = require('mongodb').MongoClient;
const Issue = require('./issue.js');

let db;
MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
    db = connection;
    app.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR:', error);
});

//error handling
const validIssueStatus = { New: true, Open: true, Assigned: true, Fixed: true, Verified: true, Closed: true, }; 
const issueFieldType = { status: 'required', owner: 'required', effort: 'optional',created: 'required', completionDate: 'optional', title: 'required', }; 

function validateIssue(issue) { 
    for (const field in issueFieldType) { 
        const type = issueFieldType[field]; 
        if (!type) { 
            delete issue[field]; } 
        else if (type === 'required' && !issue[field]) { 
            return `${field} is required .`; } } 
        if (!validIssueStatus[issue.status]) return `${issue.status} is not a valid status.`; return null; 
} 

//Create API
app.post('/api/issues', (req, res) => { 
        const newIssue = req.body; 
        newIssue.created = new Date(); 
        if (!newIssue.status) 
        newIssue.status = 'New'; 
            //error handling
            const err = Issue.validateIssue(newIssue) 
            if (err) { 
                res.status(422).json({ message: `Invalid requrest: ${err}` });return; 
            } 
            //error handling
        db.collectionn('issues').insertOne(newIssue).then(result => db.collection('issues').find({
            _id: result.insertID
        }).limit(1).next()
        ).then(newIssue => {
            res.json(newIssue);
        }).catch(error => {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error: ${error}'});          
        });
});