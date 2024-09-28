#!/usr/bin/env node
const argv = process.argv;
const argLen = argv.length;

function outputFormat(type, repo, count = null) {
  switch(type) {
    case 'PushEvent':
      return `Pushed ${count} commits to ${repo}`;
    case 'CreateEvent':
      return `Created new repository ${repo}`;
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'IssuesEvent':
      return `Opened a new issue in  ${repo}`;
    case 'DeleteEvent':
      return `Deleted a repository ${repo}`;
    case 'PullRequestEvent':
      return `Created ${count} pull request in ${repo}`
    default:
      return `${type.replace("Event", "")} in ${repo}`
  }
}

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
    for(let event in activity) {
      for(let repo in activity[event]) {
        console.log(outputFormat(event, repo, activity[event][repo]));
      }
    }
  }).catch((err) => {
      console.log(err)
    })
}
