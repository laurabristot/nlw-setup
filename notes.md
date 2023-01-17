# Aula 1
Começaremos com a estrutura do projeto backend

# Trilha Ignite

[https://www.figma.com/file/R8G4rOzimArHcxLxx0Wo3F/Habits-(i)-(Community)?node-id=6%3A343&t=aftQeE1wDebSpxjh-0](https://www.figma.com/file/R8G4rOzimArHcxLxx0Wo3F/Habits-(i)-(Community)?node-id=6%3A343&t=aftQeE1wDebSpxjh-0)

# Aula 1 - parte web

## Setup do Back-end

console:

`cd server`

`npm init -y`

`npm install fastify`

`mkdir src`

instalar typescript como dependencia de desenvolvimento

`npm install typescript -D`

`npx tsc --init`

📄 tsconfig.json

→ mudaremos o target para es2020

`npm i tsx -D`

permite a gente executar um arquivo do node com typescript sem precisar fazer qualquer tipo de conversão desse arquivo

para executar o arquivo:

`npx tsx server.ts`

para nao ter q rodar essa linha toda vez que quisermos visualizar o código rodando, podemos criar um script em 📄 package.json:

```
"scripts": {
    "dev": "tsx src/server.ts"
  },
```

ai podemos executar com `npm run dev`

 toda vez que alterar o arquivo, eu vou precisar fazer um run dev novamente, para que eu n precise fazer isso, com o tsx instalado posso adicionar um watch no script e ele vai atualizar sozinho toda vez que tiver uma alteracao no codigo

**Fastify**: usaremos para criar as rotas da aplicacao

com o servidor ainda rodando, abriremos um novo console, e instalaremos o prisma e o prisma/client

`npm i -D prisma`

`npm i @prisma/client`

`npx prisma init --datasource-provider SQLite`

quero utilizar o banco de dados sqlite porque ele cria um arquivo local de banco de dados e assim n precisamos usar docker

dentro de 📄 schema.prima é onde informaremos as tabelas do nosso banco de dados

como usaremos a sintaxe do prisma, é necessário ter a extensão do prisma instalada no VSCode

no console

`npx prisma migrate dev`

para exportar o nosso banco de datos

 `npx prisma studio`

para acessarmos nossa tabela no navegador

**cors**

`npm i @fastify/cors`

usaremos para o front-end acessar os dados do nosso back-end

## Setup do Front-End

com o projeto de back-end rodando, daermos inicio ao projeto front-end

**vite**

template que traz alguma coisas ja prontas, como o build

suporte ao typescript

em uma nova pasta

no terminal:

`npm create vite@latest`

`web`

`react`

`typescript`

`cd web`

`npm install`

`npm run dev`

<aside>
✨ no react, tudo são componentes

</aside>

**componente** é tudo o que queremos reaproveitar/isolar no nosso codigo

**propriedades** são informações enviadas para modificar um componente visual ou comportamental

**tailwind**

para economizar tempo no css usaremos o tailwind para estilizar nossa aplicacao

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`

em 📄 tailwind.config.cjs:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

criar em 📁 src um 📁styles 📄 global.css

```
@tailwind base;
@tailwind utilities;
@tailwind components;
```

em 📄 App.tsx

```
import './styles/global.css'
```

# Aula 1 - parte mobile

configuração de desenvolvimento:

[Rocketseat Docs | Ambiente React Native](https://react-native.rocketseat.dev/)

criaremos a aplicaçao com o **REACT NATIVE**

**EXPO**

para iniciar o projeto, abrimos no terminal a pasta onde estao salvos os nossos back-end e front-end web e rodamos `npx create-expo-app mobile --template`

para iniciar o projeto `npx expo start`

criamos a tela de loading, 

importamos as fontes google com `npx expo install expo-font @expo-google-fonts/inter`

alteramos a pasta assets com os arquivos criados para o projeto