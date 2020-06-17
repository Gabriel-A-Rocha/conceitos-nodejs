const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //display all repositories
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  //destructuring incoming data
  const { title, url, techs } = request.body;
  //creating a unique id for the repository
  const id = uuid();
  //each repository starts with 0 likes
  const likes = 0;
  //building the object
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };
  //storing the new repository in the array
  repositories.push(repository);
  //returning the object created
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  //receiving id sent by the client
  const { id } = request.params;
  //searching id in the reporitories array
  searchIndex = repositories.findIndex((repository) => repository.id === id);
  //if the requested id does not exist
  if (searchIndex < 0) {
    return response.status(400).json({ error: "Repository id not found." });
  }
  //copying the new title, url and techs fields provided
  const { title, url, techs } = request.body;
  //updating the repository
  repositories[searchIndex].title = title;
  repositories[searchIndex].url = url;
  repositories[searchIndex].techs = techs;
  //return the modified repository
  return response.json(repositories[searchIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  //receiving id sent by the client
  const { id } = request.params;
  //searching id in the reporitories array
  searchIndex = repositories.findIndex((repository) => repository.id === id);
  //if the requested id does not exist
  if (searchIndex < 0) {
    return response.status(400).json({ msg: "Repository id not found." });
  }
  //deleting repository
  repositories.splice(searchIndex, 1);
  //return the deleted repository title
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  //receiving id sent by the client
  const { id } = request.params;
  //searching id in the reporitories array
  searchIndex = repositories.findIndex((repository) => repository.id === id);
  //if the requested id does not exist
  if (searchIndex < 0) {
    return response.status(400).json({ error: "Repository id not found." });
  }
  //incrementing the repository likes
  repositories[searchIndex].likes++;
  //return confirmation
  return response.status(200).json(repositories[searchIndex]);
});

module.exports = app;
