#!/usr/bin/env deno

import { Command } from 'commander';

const expenseTrackerCli = new Command();

interface AddOptions  {
  description: string;
  amount: number;
}

expenseTrackerCli
  .version('1.0.0')
  .description('An expense tracker cli');
// Add command 
  expenseTrackerCli.command('add')
  .requiredOption('--description <description>', 'Description of the expense')
  .requiredOption('--amount <amount>', 'Amount of the expense')
  .action((options: AddOptions) => {
    const { description, amount } = options;
    console.log(`${description} ${amount}`)
  });
  
  expenseTrackerCli.command('list')
    .action(() => {

  })

  expenseTrackerCli.command('summary')
    .option('--month').action((options) => {

  })
  
  expenseTrackerCli.command('delete')
    .requiredOption('--id')
    .action((options) => {

  })

expenseTrackerCli.parse();
