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


//=====================================================================================================//
/////  JSON PESSOAS       ///////////////////////////////////////////////////////////////////////////////
//=====================================================================================================//

const carregarPessoas = () => {
    const dados = fs.readFileSync(path.join(__dirname, "./data/pessoas.json"), 'utf-8');
    return JSON.parse(dados);
};

const salvarPessoas = (pessoas) => {
    fs.writeFileSync(path.join(__dirname, './data/pessoas.json'), JSON.stringify(pessoas, null, 2));
};

let pessoas = carregarPessoas();

const reorganizarIDs = () => {
    pessoas.forEach((pessoa, index) => {
        pessoa.id = index + 1; 
    });
    salvarPessoas(pessoas); 
};



//=====================================================================================================//
/////  JSON PRODUTOS      ///////////////////////////////////////////////////////////////////////////////
//=====================================================================================================//

const carregarProdutos = () => {
    const dados2 = fs.readFileSync(path.join(__dirname, "./data/produtos.json"), 'utf-8');
    return JSON.parse(dados2);
};

const salvarProdutos = (produtos) => {
    fs.writeFileSync(path.join(__dirname, './data/produtos.json'), JSON.stringify(produtos, null, 2));
};

let produtos = carregarProdutos();

const reorganizarIDsProd = () => {
    produtos.forEach((produto, index) => {
    produto.id = index + 1;
    });

    salvarProdutos(produtos); 
};


//=====================================================================================================//
/////  JSON SERVIÇOS      ///////////////////////////////////////////////////////////////////////////////
//=====================================================================================================//

const carregarServicos = () => {
    const dados = fs.readFileSync(
        path.join(__dirname, "./data/servicos.json"),
        "utf-8"
    );
    return JSON.parse(dados); // <- espera lista []
};

const salvarServicos = (servicos) => {
    fs.writeFileSync(
        path.join(__dirname, "./data/servicos.json"),
        JSON.stringify(servicos, null, 2)
    );
};

let servicos = carregarServicos();

const reorganizarIDsServ = () => {
    servicos.forEach((servico, index) => {
        servico.id = index + 1; // IDs sequenciais
    });

    salvarServicos(servicos);
};

//=====================================================================================================//
app.get('/', (req, res) => {
    res.render('lobby');
});

app.listen(port, () => { 
    console.log(`Servidor em execução: http://localhost:${port}`); 
        });
//=====================================================================================================//



//=====================================================================================================//
/////  CRUD DAS PESSOAS   ///////////////////////////////////////////////////////////////////////////////
//=====================================================================================================//

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

//======================================================================================================//
///// CRUD DAS BICICLETAS  /////////////////////////////////////////////////////////////////////////////// 
//======================================================================================================//

app.get('/homeBicicletas', (req, res) => {
    res.render('homeBike');
});


app.get('/bicicletas', (req, res) =>{
    res.render('listarBike', { produtos });
});


app.get('/bicicletas/nova', (req,res) => {
    res.render('cadastrarBike');
});


app.post('/bicicletas', (req,res) => {
    const { nome, preco, cor, descricao } = req.body;
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        descricao,
        preco,
        cor
    };

    produtos.push(novoProduto);

    salvarProdutos(produtos);
    
    res.render('listarBike', { produtos });
});


app.get('/bicicletas/ver/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    res.render('detalharBike', { produto });
});


app.get('/bicicletas/:id/editar', (req,res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    res.render('editarBike', { produto });
});


app.post('/bicicletas/:id/editar/', (req,res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);  
    
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    produto.nome = req.body.nome;
    produto.descricao = req.body.descrição;
    produto.preco = req.body.preco;
    produto.cor = req.body.cor;

    salvarProdutos(produtos);

    res.render('listarBike', { produtos });
});


app.post('/bicicletas/excluir/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send('Bicicleta não encontrada');

    produtos.splice(index, 1);

    salvarProdutos(produtos);

    reorganizarIDsProd();

    res.redirect('/bicicletas');
});


//======================================================================================================//
/////   CRUD DOS SERVIÇOS  ///////////////////////////////////////////////////////////////////////////////
//======================================================================================================//

app.get('/homeServicos', (req, res) => {
    res.render('homeServicos');
});


app.get('/servicos', (req, res) => {
    res.render('listarServicos', { servicos });
});


app.get('/servicos/novo', (req, res) => {
    res.render('cadastrarServico');
});


app.post('/servicos', (req, res) => {
    const { nome, descricao, preco } = req.body;

    const novoServico = {
        id: servicos.length + 1,
        nome,
        descricao,
        preco
    };

    servicos.push(novoServico);
    salvarServicos(servicos);

    res.render('listarServicos', { servicos });
});


app.get('/servicos/ver/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const servico = servicos.find(s => s.id === id);

    if (!servico) return res.status(404).send("Serviço não encontrado");

    res.render('detalharServico', { servico });
});


app.get('/servicos/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const servico = servicos.find(s => s.id === id);

    if (!servico) return res.status(404).send("Serviço não encontrado");

    res.render('editarServico', { servico });
});


app.post('/servicos/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const servico = servicos.find(s => s.id === id);

    if (!servico) return res.status(404).send("Serviço não encontrado");

    servico.nome = req.body.nome;
    servico.descricao = req.body.descricao;
    servico.preco = req.body.preco;

    salvarServicos(servicos);

    res.render('listarServicos', { servicos });
});


app.post('/servicos/excluir/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = servicos.findIndex(s => s.id === id);

    if (index === -1) return res.status(404).send("Serviço não encontrado");

    servicos.splice(index, 1);
    reorganizarIDsServ();
    salvarServicos(servicos);

    res.redirect('/servicos');
});
