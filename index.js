const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter repository title",
    },
  ]);
}

//function writeToFile(fileName, data) {}

function init() {
  console.log("hi");
  try {
    const data = promptUser();

    const markdown = generateMarkdown(data);

    writeFileAsync("README.md", markdown);

    console.log("successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}

init();
