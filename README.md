[![Build Status](https://travis-ci.com/richardregeer/raptor.svg?branch=master)](https://travis-ci.com/richardregeer/raptor)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=richardregeer_raptor&metric=alert_status)](https://sonarcloud.io/dashboard?id=richardregeer_raptor)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=richardregeer_raptor&metric=ncloc)](https://sonarcloud.io/dashboard?id=richardregeer_raptor)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=richardregeer_raptor&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=richardregeer_raptor)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=richardregeer_raptor&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=richardregeer_raptor)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=richardregeer_raptor&metric=security_rating)](https://sonarcloud.io/dashboard?id=richardregeer_raptor)
# Raptor
Smart media file syncing tool.

Raptor is a file syncing tool that keeps track of synced files. It can be used the poll a folder with files and only sync the files that are not synced yet. One example where I created this tool for is for SD cards of a camera. I always leave the pictures on the card and copy the pictures that are new. When a SD card contains thousends of pictures it is hard to keep track of which file already copied. With Raptor and just one simple command it will copy the files that are not yet synced from the SD card.

The application is created for a Linux system, but should also work on a OSX or Windows system.

## Index
 - [Installation & requirements](docs/installation.md)
 - [Manual](docs/manual.md)
 - [Development environment](docs/development.md)