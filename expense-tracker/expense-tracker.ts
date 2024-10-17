#!/usr/bin/env deno

import fs from 'node:fs';
import { Command } from 'commander';

const expenseTrackerCli = new Command();

interface AddOptions  {
  description: string;
  amount: number;
}
let expenseList = {
  expenses:[],
  next_id: 1,
};
try {
  expenseList  = JSON.parse(fs.readFileSync('./expense.json', 'utf8'));
} catch(error){
   fs.writeFileSync('./expense.json', JSON.stringify(expenseList));
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
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const addExpense = {
      id: expenseList['next_id'],
      date: formattedDate,
      description: description,
      amount: amount
    }
    expenseList.expenses.push(addExpense);
    expenseList.next_id += 1
    fs.writeFileSync('./expense.json', JSON.stringify(expenseList));
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
