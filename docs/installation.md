# Installation
This guide contains the requirements and installation guide to install Raptor on your system.

## Requirements
Nodejs >= 10 or the Docker container [richardregeer/raptor](https://hub.docker.com/r/richardregeer/raptor/tags)

## Install using Nodejs locally
- Make sure NodeJs (LTS) is installed. Follow this [guide](https://nodejs.org/en/download/) for your system if needed.

- Install Raptor on your system
```
sudo npm install -g raptor-sync
```
- Start Raptor
```
raptor-sync --help
```

## Install using the docker container
- Make sure [Docker](https://docs.docker.com/engine/install/) is installed.
- Pull the latest docker container
```
docker pull richardregeer/raptor:latest
```
- Start Raptor
```
docker run --rm -it richardregeer/raptor -h
```
- You can create an alias to be able to start it easy. You can copy this line to your ~/.bashrc to persist it.
```
alias raptor-sync="docker run --rm -it richardregeer/raptor"
```

Congratulations you have installed Raptor in a Docker container!
