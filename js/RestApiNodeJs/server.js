const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const ideas = [
    {
        id: 1,
        text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
        tag: 'Technology',
        username: 'TonyStark',
        date: '2022-01-02',
    },
    {
        id: 2,
        text: 'Milk cartons that turn a different color the older that your milk is getting',
        tag: 'Inventions',
        username: 'SteveRogers',
        date: '2022-01-02',
    },
    {
        id: 3,
        text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
        tag: 'Software',
        username: 'BruceBanner',
        date: '2022-01-02',
    },
];
app.get('/', (req, res) => {
    res.json({message:'Hello World'});
});
app.get('/api/ideas', (req, res) => {
    res.json({success: true, ideas: ideas});
})

app.get('/api/ideas/:id', (req, res) => {
    const idea=ideas.find(idea => idea.id ===+ req.params.id);
    if(!idea){
        return res.status(404).json({success:false, error:'Not Found'});
    }
    return res.json({success: true, data:idea });
})
app.listen(port,()=>console.log(`Server started on port ${port}`));
