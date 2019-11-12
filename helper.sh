#!/usr/bin/env bash

echo -e "React Helper Script\n"

selection=0
name=''
sourcecode="${PWD}/src"
components="${PWD}/src/components"
screens="${PWD}/src/screens"
directory=''

getSelectionAndValidate () {
  echo "Select an option from the following:"
  echo "1: Create a new screen"
  echo "2: Create a new component"

  read -p 'Enter your selection: ' selection
  if [ "${selection}" != "1" -a  "${selection}" != "2" ]
    then
      return 0
  fi

  return 1
}

getNameAndValidate () {
  read -p 'Enter a name for your files: ' name
  # checks if name is alpha & a single word
  if [[ "${name}" =~ ^[[:alpha:]]+$ ]]; then
    return 1
  fi

  return 0
}

createStructure () {
  if [ "${selection}" == "1" ]; then
    directory="${screens}/${name}"
  elif [ "${selection}" == "2" ]; then
    directory="${components}/${name}"
  fi

  mkdir -p "${directory}"
  echo "${directory}"
  cd "${directory}"
}

createFiles () {
  emptyTest=$(ls -1qA "${PWD}")
  if [[ ! -z "${emptyTest}" ]]; then
    echo -e "\n ERROR: DIR NOT EMPTY. Exiting...\n"
    return 0
  fi



  touch "index.css"
  echo -e "\n Created index.css...\n"
  cat > "index.js" << EOF
export { default as $name } from './$name';
EOF
  echo -e "\n Created index.js...\n"
  cat > "${name}.js" << EOF
import React from 'react';
import './index.css';

const $name = props => {
  return (
    <div>
      <h3>$name</h3>
    </div>
  )
}

export default $name;
EOF
  echo -e "\n Created ${name}.js...\n"
  echo "EXITING..."
}


while getSelectionAndValidate; do
echo -e "\nInvalid selection.\n"
done

while getNameAndValidate; do
echo -e "\nInvalid name.\n"
done

createStructure

createFiles


