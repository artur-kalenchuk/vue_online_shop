# tutorial_online_shop

To start this app in the docker need to run:
```
docker build -f Dockerfile .
```
Copy name of the Docker image and run:
```
docker run --rm -p 8080:8080 -e "HOST=0.0.0.0" -it [name of the docker image]
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
