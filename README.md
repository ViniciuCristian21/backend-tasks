# API Para criação de task

## Tecnologias usadas 🚩

- Typescript 
- NodeJs
- Prisma
- Fastify

## Sobre<br>

Projeto feito na intenção de aprender e exercitar conhecimentos sobre algumas tecnologias.

```
git clone https://github.com/ViniciuCristian21/backend-tasks.git
```
```
npm install

npm run dev
```

```
pegar todas tasks -> http://localhost:3333/notes
pegar uma task por id -> http://localhost:3333/notes/:id
excluir uma task -> http://localhost:3333/remove/:id
criar uma task -> http://localhost:3333/create

{
    "title": "",
    "description": ""
}

atualizar uma task -> http://localhost:3333/update/:id

{
    "id": "",
    "title": "",
    "description": ""
}

filtrar um tasks -> http://localhost:3333/filter/:id

```