#!/usr/bin/env node

const { Command } = require('commander');

const expenseTrackerCli = new Command();

expenseTrackerCli
  .version('1.0.0')
  .description('An expense tracker cli')
  .command('add')
  .requiredOption('--description <description>', 'Description of the expense')
  .requiredOption('--amount <amount>', 'Amount of the expense');

expenseTrackerCli.parse();
