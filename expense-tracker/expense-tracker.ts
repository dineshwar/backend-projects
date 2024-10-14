#!/usr/bin/env node

const { Command } = require("commander");

const expenseTrackerCli = new Command();

expenseTrackerCli
  .version("1.0.0")
  .description("An expense tracker cli");

expenseTrackerCli.parse();
