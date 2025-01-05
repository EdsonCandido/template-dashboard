#!/bin/bash

output=$(git pull 2>&1)

if [[ $? -ne 0 ]]; then
  echo -e "\nErro ao executar git pull:\n$output\n"
  exit 1
fi

if [[ $output == *"Already up to date."* ]]; then
  echo -e "\nNão há atualizações.\n"
  exit 0
fi

npm install

npm run build

echo -e "\nSistema atualizado.\n"