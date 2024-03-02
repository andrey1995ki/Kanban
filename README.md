# KANBAN

Вэб-приложение kanban-доски

### Особености:

- Неограниченное колличество досок
- Для каждой доски неограниченное колличество колонок, обозначающих ту или иную стадию
- Каждая колонка имеет свой цвет и признак конечно стадии
- У каждой колонки может быть неограниченное колличество задач
- Задачи можно перемещать между колонками с помощью Drag&Drop, а так же через редактирвание задачи
- У задачи имеется заголовок, описание и подзадачи.
- При действии с задачей (Добавление, изменение, удаление) другим работающим в приложении приходит уведомление.

## Состав проекта

### Клиент:
    
Клиентска часть вэб-приложения

#### Реализация:

- Библиотека:
    - [React](https://react.dev/)
- Стейт менеджер:
  - [Redux Toolkit](https://redux-toolkit.js.org/)
- API:
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) из библиотеки Redux Toolkit для запроса к серверу
  - [Apollo Client](https://www.apollographql.com/docs/react/get-started/) для запросов GraphQL
  - Стандартный инструментарий для работы с Websockets
- Стили:
  - scss модули 
- Роутинг:
  - [React Router](https://reactrouter.com/en/main)
- Сборщик:
  - [Vite](https://vitejs.dev/)
- Остальное:
  - [Typescript](https://www.typescriptlang.org/)
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [Storybook](https://storybook.js.org/)

### Серер:

Серверная часть вэб-приложения

#### Реализация:

- Фреймворк:
  - [Express](https://expressjs.com/ru/)
- БД:
  - SQLite в качестве БД
  - [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) в качестве библиотеки для взаимодействия с БД
- GraphQL
  - [json-graphql-server](https://github.com/marmelab/json-graphql-server) для эмуляции GraphQL
- Websockets
  - [express-ws](https://github.com/HenningM/express-ws) для реализации Websocket сервара

## Сборка проекта

[Сервер](./server/Dockerfile) и [Клиент](./client/Dockerfile) собираются в свой _Docker_ контейнер и после разворачиваются через [_Docker Compose_](./docker-compose.yml)

В клиентской части сначала происходит сборка проекта, а после сборка storybook. В последствии всё это запускается через _Nginx_


    
