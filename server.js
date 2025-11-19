const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const path = require('path');
app.set('views', path.join(__dirname, 'views')); 

app.engine('handlebars', exphbs.engine({ defaultLayout: false}));
app.set('view engine', 'handlebars');

const carregarPessoas = () => {
    const dados = fs.readFileSync(path.join(__dirname, 'pessoas.json'), 'utf-8');
    return JSON.parse(dados);
};

const salvarPessoas = (pessoas) => {
    fs.writeFileSync(path.join(__dirname, 'pessoas.json'), JSON.stringify(pessoas, null, 2));
};

let pessoas = carregarPessoas();

const reorganizarIDs = () => {
    pessoas.forEach((pessoa, index) => {
        pessoa.id = index + 1; 
    });
    salvarPessoas(pessoas); 
};

app.get('/', (req, res) => {
    res.render('lobby');
});

app.get('/homePessoas', (req, res) => {
    res.render('homePessoas');
});

app.get('/pessoas', (req, res) =>{
    res.render('listarPessoas', { pessoas });
});

app.get('/pessoas/nova', (req,res) => {
    res.render('cadastrarPessoa')
});

app.post('/pessoas', (req,res) => {
    const { pessoa } = req.body;
    const { senha } = req.body;
    const { idade } = req.body;
    const novaPessoa = {id: pessoas.length + 1, pessoa, senha, idade};
    pessoas.push(novaPessoa);

    salvarPessoas(pessoas);
    
    res.render('listarPessoas', { pessoas })
    
});

app.get('/pessoas/ver/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    res.render('detalharPessoa', { pessoa });
});

app.get('/pessoas/:id/editar', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');
    res.render('editarPessoa', { pessoa });
});

app.post('/pessoas/:id/editar/', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);  
    
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    pessoa.pessoa = req.body.pessoa;
    pessoa.senha = req.body.senha;

    salvarPessoas(pessoas);

    res.render('listarPessoas', { pessoas });

    
});

app.post('/pessoas/excluir/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Pesssoa não encontrada');

    pessoas.splice(index, 1);

    salvarPessoas(pessoas);

    reorganizarIDs()

    res.redirect('/pessoas');
});


app.get('/homeBicicletas', (req, res) => {
    res.render('homePessoas');
});

app.get('/bicicletas', (req, res) =>{
    res.render('listarPessoas', { pessoas });
});

app.get('/bicicletas/nova', (req,res) => {
    res.render('cadastrarPessoa')
});

app.post('/bicicletas', (req,res) => {
    const { pessoa } = req.body;
    const { senha } = req.body;
    const { idade } = req.body;
    const novaPessoa = {id: pessoas.length + 1, pessoa, senha, idade};
    pessoas.push(novaPessoa);

    salvarPessoas(pessoas);
    
    res.render('listarPessoas', { pessoas })
    
});

app.get('/bicicletas/ver/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    res.render('detalharPessoa', { pessoa });
});

app.get('/bicicletas/:id/editar', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');
    res.render('editarPessoa', { pessoa });
});

app.post('/bicicletas/:id/editar/', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);  
    
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    pessoa.pessoa = req.body.pessoa;
    pessoa.senha = req.body.senha;

    salvarPessoas(pessoas);

    res.render('listarPessoas', { pessoas });

    
});

app.post('/bicicletas/excluir/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Pesssoa não encontrada');

    pessoas.splice(index, 1);

    salvarPessoas(pessoas);

    reorganizarIDs()

    res.redirect('/pessoas');
});


app.get('/homeServicos', (req, res) => {
    res.render('homePessoas');
});

app.get('/servicos', (req, res) =>{
    res.render('listarPessoas', { pessoas });
});

app.get('/servicos/nova', (req,res) => {
    res.render('cadastrarPessoa')
});

app.post('/servicos', (req,res) => {
    const { pessoa } = req.body;
    const { senha } = req.body;
    const { idade } = req.body;
    const novaPessoa = {id: pessoas.length + 1, pessoa, senha, idade};
    pessoas.push(novaPessoa);

    salvarPessoas(pessoas);
    
    res.render('listarPessoas', { pessoas })
    
});

app.get('/servicos/ver/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    res.render('detalharPessoa', { pessoa });
});

app.get('/servicos/:id/editar', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');
    res.render('editarPessoa', { pessoa });
});

app.post('/servicos/:id/editar/', (req,res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);  
    
    if (!pessoa) return res.status(404).send('Pesssoa não encontrada');

    pessoa.pessoa = req.body.pessoa;
    pessoa.senha = req.body.senha;

    salvarPessoas(pessoas);

    res.render('listarPessoas', { pessoas });

    
});

app.post('/servicos/excluir/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Pesssoa não encontrada');

    pessoas.splice(index, 1);

    salvarPessoas(pessoas);

    reorganizarIDs()

    res.redirect('/pessoas');
});

app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});

