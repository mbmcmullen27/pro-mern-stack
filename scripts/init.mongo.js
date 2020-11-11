db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
    {
        status: 'Open', owner: 'fishbot',
        created: new Date('2020-11-05'), effort: 5,
        completionDate: undefined,
        title: 'Your Screebs do not Screeb',
    },
    {
        status: 'Assigned', owner: 'Fishy',
        created: new Date('2020-11-05'), effort: 14,
        completionDate: new Date ('2020-11-05'),
        title: 'Glub database initialization',
    },
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });