#!/usr/bin/env node
const argv = process.argv;
const argLen = argv.length;
if (argLen != 3) {
  console.log("Invalid number of arguments !!");
} else {
  let userName = argv[2];
  const apiUrl = `https://api.github.com/users/${userName}/events`;
  fetch(apiUrl).then((res) => res.json()).then((events) => {
    const activity = {};
    for (let event of events) {
      if (!activity[event.type]) {
        activity[event.type] = {};
      }
      if(!activity[event.type][event.repo.name]) {
        activity[event.type][event.repo.name] = 0
      }
      activity[event.type][event.repo.name] += 1
    }
    console.log(activity)
  }).catch((err) => {
      console.log(err)
    })
}
