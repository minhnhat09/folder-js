import select, { Separator } from '@inquirer/select';
import { input } from '@inquirer/prompts';

class Folder {
  constructor(name) {
    this.name = name;
    this.folders = [];
    this.files = [];
  }
}

const root = new Folder('root');
let currentFolder = root;

async function main() {
  let answer = 'start';

  while (answer !== 'exit') {
    answer = await select({
      message: 'Enter Command, when you want to exit type ‘exit’',
      choices: [
        {
          name: 'Create folder',
          value: 'createFolder',
        },
        {
          name: 'Create File',
          value: 'createFile',
        },
        {
          name: 'Go to',
          value: 'goTo',
        },
        {
          name: 'List all folders and files',
          value: 'list',
        },
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    });
    switch (answer) {
      case 'createFolder':
        await createFolder();
        break;
      case 'goTo':
        await goTo();
        console.log('currentFolder outside', currentFolder);
        break;
      case 'list':
        await listFoldersAndFiles(currentFolder);
        break;

      default:
        break;
    }
  }
}

const listFoldersAndFiles = async () => {
  console.log(currentFolder);
};

const goTo = async () => {
  console.log(this, currentFolder.folders);
  let choices = [];
  if (
    currentFolder &&
    currentFolder.folders &&
    currentFolder.folders.length > 0
  ) {
    choices.push({
      name: root.name,
      value: root.name,
    });
    const existFolders = currentFolder.folders.map((folder) => {
      return {
        name: folder.name,
        value: folder.name,
      };
    });
    choices.push(...existFolders);
    const answer = await select({
      message: 'What folder you want to go ?',
      choices,
    });
    console.log(answer, root);
    if (answer === 'root') {
      currentFolder = root;
      return;
    }
    const folderToGo = currentFolder.folders.find((folder) => {
      return folder.name === answer;
    });
    currentFolder = folderToGo;
    console.log('folderToGo', folderToGo);
    console.log('currentFolder', currentFolder);
  } else {
    console.log('There is no folder to go');
  }
};

async function createFolder() {
  console.log(currentFolder);
  const folderName = await input({ message: 'Folder Name ?' });
  if (!folderName) {
    console.log('folder name cannot be empty');
  } else {
    const folder = new Folder(folderName);
    currentFolder.folders.push(folder);
  }
}

main();
