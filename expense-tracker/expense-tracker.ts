#!/usr/bin/env node

const { Command } = require('commander');

const expenseTrackerCli = new Command();

interface AddOptions  {
  description: string;
  amount: number;
}

expenseTrackerCli
  .version('1.0.0')
  .description('An expense tracker cli')
  .command('add')
  .requiredOption('--description <description>', 'Description of the expense')
  .requiredOption('--amount <amount>', 'Amount of the expense')
  .action((options: AddOptions) => {
    const { description, amount } = options;
    console.log(`${description} ${amount}`)
  });

expenseTrackerCli.parse();
