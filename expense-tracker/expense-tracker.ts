#!/usr/bin/env -S deno run -A
import fs from 'node:fs';
import { Command } from 'commander';

const EXPENSE_FILE_PATH = './expense.json';

const expenseTrackerCli = new Command();

interface AddOptions  {
  description: string;
  amount: number;
}

interface Expense {
    id: number;
    date: string;
    description: string;
    amount: number;
}

interface ExpenseList {
  expenses: Expense[];
  next_id: number;
}

let expenseList: ExpenseList = {
  expenses:[] as Expense[],
  next_id: 1,
};
try {
  expenseList  = JSON.parse(fs.readFileSync(EXPENSE_FILE_PATH, 'utf8'));
} catch(error){
   fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(expenseList));
}

const writeToFile = (expenses: ExpenseList) => {
  fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(expenses));
  return true;
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
    expenseList.next_id += 1;
    writeToFile(expenseList)
    console.log(`Expense added successfully (ID: ${addExpense.id})`);
  });
  
  expenseTrackerCli.command('list')
    .action(() => {
      console.log("ID     Date       Description         Amount");
      for(let expense of expenseList.expenses) {
         console.log(`${expense.id}     ${expense.date}       ${expense.description}         $${expense.amount}`);
      }
  })

  expenseTrackerCli.command('summary')
    .option('--month').action((options) => {

  })
  
  expenseTrackerCli.command('delete')
    .requiredOption('--id')
    .action((options) => {

  })

expenseTrackerCli.parse();
