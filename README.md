
Zendesk Frontend Test 2 Solution. Using `react` `redux` & `react-dnd`, `create-react-app`.

=====

- Step 1: Clone the project

```
git clone https://github.com/marani/chloe
```

- Step 2: Run with any http server to serve from `build` directory

```
cd chloe/build
python -m SimpleHTTPServer
open localhost:8000
```

Alternatively, we  can use `pushstate-server`

```
npm i -g pushstate-server
pushstate-server build
open localhost:9000
```

=====

To build & debug, node version >= 4 is required, >= 6 is recommended.
```
npm i -g create-react-app react-scripts
npm i
npm run start
```
