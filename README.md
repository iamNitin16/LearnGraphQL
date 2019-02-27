# LearnGraphQL

## Introduction

This repository contains a simple **GraphQL API Server** developed using *nodejs*. The development environment for this *API Server* is setup using *docker* and *docker-compose*. The custom docker image is developed using the given `Dockerfile`.

This repository uses docker development tool `docker-compose` for it's entire development environment setup. This docker image is not configured for *production* yet.

## Dependencies

The only thing you need to install to start hacking on this project is `docker` & `docker-compose`. If you have both these dependencies install then you are good to go.

## Setting ENVIRONMENT_VARIABLE using env file

To set the environment variables according to your development machine, follow the steps below :-

  - Open `dev.env` file in a text editor of your choice.
  - Replace the environment variables value according to your system configuration and save the file.
  - Rename the file `dev.env` to `dev.local.env` and you are good to go.

## Run

To run this project you need to have the `docker-compose` tool installed in your machine.

  - If you are running this project for the first time then start it using the following Command
  ```
  docker-compose up
  ```

  - It will build the docker image and start the desired container.

  - If you want to stop those container then use the following command
  ```
  docker-compose stop
  ```

  - If you want to start the stopped containers then use the following Command
  ```
  docker-compose start
  ```

  - If you want to remove the all the containers, network and volumes created by this image then use the following Command
  ```
  docker-compose down -v
  ```

  - If you don't want to erase all the volumes then remove the `-v` flag from the previous Command.

  - If you want to add a new `npm` package while the server is running(i.e. containers are running) then use the following Command
  ```
  docker-command exec graphql npm install <package_name> --save
  ```

  - But once you stopped the containers you need to build the image again using the following Command
  ```
  docker-compose up --build
  ```

## Contributors

- [iamNitin16](https://github.com/iamNitin16)

Developed with :heart:. Contributors are always welcome :wink:
