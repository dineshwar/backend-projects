#!/usr/bin/env node
const fs = require("node:fs");
const argv = process.argv;

if (argv.length <= 2) {
  console.log("Invalid no of arguments")
}

const action = argv[2];
doAction(action);
function doAction(action) {
  let tasks;
  try {
    tasks = fs.readFileSync('./tasks.json', 'utf8');
  } catch(error){
    tasks = '{"tasks":[],"next_id":1}';
  }
  let tasksList = JSON.parse(tasks);
  switch (action) {
    case 'add':
      const currentTime = new Date().toISOString().slice(0,19).replace('T', '');
      const currentTaskId = tasksList["next_id"];
      const newTask = {
        id: tasksList["next_id"],
        description: argv[3],
        status: 'todo',
        createdAt: currentTime,
        updatedAt: currentTime
      }
      tasksList.tasks.push(newTask);
      tasksList['next_id'] += 1;
      fs.writeFileSync('./tasks.json', JSON.stringify(tasksList));
      console.log(`Task added successfully (ID: ${currentTaskId})`)
      break;
    case 'update':
      let updated = false;
      for(let i in tasksList.tasks) {
        if (tasksList.tasks[i].id == argv[3]) {
          updated = true;
          tasksList.tasks[i].description = argv[4];
          tasksList.tasks[i].updatedAt = new Date().toISOString().slice(0,19).replace('T', '');
        }
      }
      if(updated) {
        fs.writeFileSync('./tasks.json', JSON.stringify(tasksList));
      } else {
        console.log("Error: Invalid id")
      }
      break;
    case 'mark-done':
       let updatedDone = false;
      for(let i in tasksList.tasks) {
        if (tasksList.tasks[i].id == argv[3]) {
          updatedDone = true;
          tasksList.tasks[i].status = 'done';
          tasksList.tasks[i].updatedAt = new Date().toISOString().slice(0,19).replace('T', '');
        }
      }
      if(updatedDone) {
        fs.writeFileSync('./tasks.json', JSON.stringify(tasksList));
      } else {
        console.log("Error: Invalid id")
      }
      break;
    case 'list':
      let listTask = tasksList.tasks;
      let status = '';
      if(argv[3]) {
        status = argv[3];
        listTask = listTask.filter((item) => {
          return item.status === status;
        })
      }
      for(let task of listTask) {
        if(status !== '') {
          console.log(`${task.id}. ${task.description}`)
        } else {
          console.log(`${task.id}. ${task.description} ${task.status}`)
        }
      }
      break;
    case 'mark-in-progress':
       let updatedInProgress = false;
      for(let i in tasksList.tasks) {
        if (tasksList.tasks[i].id == argv[3]) {
          updatedInProgress = true;
          tasksList.tasks[i].status = 'in-progress';
          tasksList.tasks[i].updatedAt = new Date().toISOString().slice(0,19).replace('T', '');
        }
      }
      if(updatedInProgress) {
        fs.writeFileSync('./tasks.json', JSON.stringify(tasksList));
      } else {
        console.log("Error: Invalid id")
      }
    break;
    case 'delete':
      let isDeleted = false;
      const newTasks = tasksList.tasks.filter((item) => {
        if (item.id == argv[3])
        return item.id != argv[3]
      })
      tasksList.tasks = newTasks;
      if (isDeleted) {
        fs.writeFileSync('./tasks.json', JSON.stringify(tasksList));
      } else {
        console.log("Error: Invalid id")
      }
    break;
    default:
      console.log("Invalid action")
  }
}
