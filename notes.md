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

# Aula 2 - parte web

Nossa aplicação por enquanto nao irá trabalhar com autenticação 

Começaremos criando as tabelas do banco de dados.

dando uma olhada no layout, precisamos analisar quais tabelas serão necessárias.

→ tabela cadastro de habitos 

→ tabela que armazena cada um dos habitos que foram completados por dia

cada dia do nosso calendario pode ter varios habitos e esses habitos podem estar completos ou não (relacionamento n:n)

levando isso pro código, temos a tabela habito, a tabela dia e uma tabela pivo que relaciona essas duas informacoes.

na tabela pivo (DayHabit), alem de ter seu proprio id, ela tambem armazena os ids das tabelas que ela esta relacionando

nem todos os dias necessariamente, eu vou lembrar de preencher os habitos, portanto precisamos ter um campo data em Day. o registro na tabela Day, so sera feito caso seja completado pelo menos algum habito.

ainda em Day, podemos criar o campo unique com o campo date, para indicar que nao poderemos ter dois dias iguais

um mesmo habito, nao pode ser completado duas vezes num mesmo dia

um mesmo habito nao pode ter dois dias iguais

ainda precisamos de uma ultima tabela (HabitWeekDays), que vai armazenar a recorrencia do habito.

nem todos os habitos precisam ser praticados todos os dias da semana, necessariamente, e por isso essa tabela vai ter um relacionamento de 1 pra muitos. cada habito pode estar disponivel em varios dias da semana

um habito so pode estar disponivel uma vez por cada dia da semana

feito tudo isso, `npx prisma migrate dev` para armazenar as mudanças do nosso banco de dados

dessa forma o prisma nao criou as foreignKeys

precisamos criar entao essas referencias botando a coluna com a tabela que queremos referenciar.

shift+alt+f para formatar e o prisma criar as relations automaticamente.

depois de todas as relations feitas: `npx prisma migrate dev` para salvar

se quisermos ter uma noção mais visual de como ficou o diagrama, existe uma ferramenta que podemos instalar para poder gerar o ERD e visualiza-lo no navegador

`npm i -D prisma-erd-generator @mermaid-js/mermaid-cli`

em schema.prisma colar essa linha:

```
generator erd {
	provider = "prisma-erd-generator"
}
```

`npx prisma generate` vai criar um ERD.svg que abrindo no navegador, deve ficar assim:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a552d95a-5696-418c-9740-0d29e7efef31/Untitled.png)

**SEED**

é um populador de banco de dados

cria dados ficticios para nao precisarmos trabalhar com o banco de dados vazio enquanto estivermos desenvolvendo nossa aplicação

em 📁 prisma → new 📄 seed.ts

para acharmos a estrutura do seed, podemos pesquisar na documentaçao do prisma

 e em package.json adicionar a segunte linha:

```
"prisma":{
    "seed": "tsx prisma/seed.ts"
  }
```

para rodar o seed: `npx prisma db seed` para criar

`npx prisma studio` para vermos no navegador a tabela

alem de criarmos um dado no banco de dados, é interessante também excluirmos todos os dados com o seed. pois da maneira que criamos, toda vez que rodarmos o seed, ele vai criar o mesmo habito varias vezes, entao podemos adicionar uma linha que deleta todos os habitos e vai funcionar como um reset para cada vez que rodarmos o seed.

nos materiais da aula ja tem um modelo de seed que é só copiarmos 

esse seed esta sendo criado 3 habitos.

agora podemos separar um pouco melhor os arquivos da nossa aplicacao, começando pela conexao com o banco, se eu vou usa-la varias vezes, posso separa-la em um arquivo proprio e importar ela desse arquivo.

📁src → new 📁 lib → new 📄 prisma.ts

alem disso, vamos separar também as rotas da nossa aplicacao

📁 src → new 📄 routes.ts

**criacao de rotas back-end**

rota de criacao de habito

recebe o titulo do habito e os dias da semana que esse habito vai estar disponivel

vamos instalar a biblioteca zod  `npm i zod` e a dayjs `npm i dayjs`

rota que retorna o detalhe do dia, os habitos daquele dia

→ vamos dar uma pausa no backend e fazer algo de front, layout da aplicacao web

biblioteca de icones: `npm i phosphor-react`

criamos a header da nossa aplicacao como um componente

e criamos também os quadradinhos que vamos usar para marcar os nossos habitos.

# Aula 2 - parte mobile

**nativewind**

serve para usarmos o tailwind no react native

para instalar: `npm i nativewind` feita a intalacao no nativeWind, podemos instalar o tailwind como dependencia de desenvolvimento `npm i tailwindcss --save-dev`

`npx tailwindcss init` para criar o config

 alteraremos o conteudo do 📄 tailwind.config.js

alteramos também o conteudo do 📄 babel.config.js

em src criamos a 📁 screens que irá armazenar todas as nossas telas

o typescript aqui no react-native nao idendifica as className q nem na parte web, entao temos que fazer uma configuraçao pra ele poder entender.

criar uma 📁@types → new 📄app.d.ts com o seguinte conteudo:

```
/// <reference types="nativewind/types" />
```

demos inicio a criaçao da pagina home e seus respectivos componentes como header…

uma obs.: o react native nao suporta o uso de svg, para isso precisamos da biblioteca `npx expo install react-native-svg` e ainda a `npm i react-native-svg-transformer --save-dev`

[https://github.com/kristerkari/react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)

`npm install dayjs`

fizemos a mesma logica dos quadrinhos que fizemos no mobile

e o resto fica pra proxima aula