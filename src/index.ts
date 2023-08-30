import express from 'express'
const app = express()
const port = 3000

const MiddleWare = express.json()
app.use(MiddleWare)

const Baza = {
    VseHello:[
        {id:1,title:'hello'},
        {id:2,title:'heloo'},
        {id:3,title:'hii'}
    ]
}
const HTTP_STATUSES={
    OK_200:200,
    CREATED_201:201,
    NOCONTENT_204:204,

    BADREQUEST_400:400,
    NOTFOUND_404:404

}
app.get('/', (req, res) => {
    let FoundHeyFirst = Baza.VseHello
    if(req.query.title)
    {
        FoundHeyFirst = FoundHeyFirst.filter(c => c.title.indexOf(req.query.title as string)> -1)
    }
    res.json(FoundHeyFirst)    
})
app.get('/:id', (req, res) => {
    const Fhello=Baza.VseHello.find(c=>c.id === +req.params.id)
    if(!Fhello)
    {
        res.json("ti molodez");
        return;
    }
    res.json(Fhello)    
})
app.post('/',(req,res) => {
    if(!req.body.title){
        res.sendStatus(HTTP_STATUSES.BADREQUEST_400)
        return        
    }
    const NewPrivet = {
        id: +(new Date()),
        title: req.body.title
    }
    Baza.VseHello.push(NewPrivet)
    console.log(NewPrivet)
    res.status(201).json(NewPrivet)
})
app.delete('/:id', (req, res) => {
    Baza.VseHello=Baza.VseHello.filter(c=>c.id !== +req.params.id)
    res.sendStatus(HTTP_STATUSES.NOCONTENT_204)}
    )
app.put('/:id', (req, res) => {
    if(!req.body.title){
        res.sendStatus(HTTP_STATUSES.BADREQUEST_400);
        return;     
    }
    const Fhello=Baza.VseHello.find(c=>c.id === +req.params.id)
    if(!Fhello)
    {
        res.sendStatus(HTTP_STATUSES.NOTFOUND_404);
        return;
    }
    Fhello.title=req.body.title
    res.sendStatus(HTTP_STATUSES.NOCONTENT_204)    
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
