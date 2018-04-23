#!/bin/bash
yarn
if [ $1 = "-p" ]
then
  yarn build
  yarn deploy
else
  yarn build:t
  yarn deploy:t
fi
