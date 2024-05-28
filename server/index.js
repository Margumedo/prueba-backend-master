const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 6500;

app.use(express.json());
app.use(cors());

//Obtener los 10 reposositorios más relevantes

app.get('/github', async (req, res) => {

    try {

        const response = await axios.get('https:api.github.com/users/google/repos');
        const repos = response.data;

        //Odenar los repositorios por ranking de estrellas
        const reposOrden = repos.sort((a, b) => b.stargazer_count - a.stargazers_count);
        const topRepos = repos.slice(0, 10);

        res.json(topRepos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los repositorios')
    }
})

app.get('/', (req, res) => {
    res.send("Hola desde Node")
})

app.listen(port, () => {
    console.log(`Servidor activo --> http://localhost:${port}`)
})
