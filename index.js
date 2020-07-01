const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const markdown = require("./generateMarkdown");

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your GitHub username?",
      },
      {
        type: "input",
        name: "title",
        message: "Project title: ",
      },
      {
        type: "input",
        name: "description",
        message: "Write a short description of your project: ",
      },
      {
        type: "input",
        name: "installation",
        message: "Installation instructions: ",
      },
      {
        type: "input",
        name: "usage",
        message: "How is this program used?",
      },
      {
        type: "input",
        name: "version",
        message: "What version of the project is this?",
      },
      {
        type: "list",
        name: "license",
        message: "What license are you using?",
        choices: ["MIT", "Apache", "BSD", "ISC", "None"],
      },
      {
        type: "input",
        name: "contributing",
        message: "How to contribute: ",
      },
      {
        type: "input",
        name: "tests",
        message: "Write about your tests here: ",
      },
    ])
    .then(function (data) {
      console.log(data);

      const queryUrl = `https://api.github.com/users/${data.name}`;
      axios
        .get(queryUrl)

        .then(function (res) {
          console.log(res.data);
          data.gitEmail = res.data.email;
          data.gitImage = `${res.data.avatar_url}&s=100`;

          fs.writeFile("README.md", markdown(data), function (err, data) {
            if (err) {
              throw err;
            } else console.log("Success! You have a newly generated READme.md file!");
          });
        });
    })
    .catch(function (err) {
      if (err) throw err;
    });
}
init();
