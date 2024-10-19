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
      amount: Number(amount)
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
    .option('--month <number>').action((options) => {
      let totExpense = 0;
      const {month} = options;
      if(month) {
        const summaryMonth = Number(month)
        if (summaryMonth <= 0 || summaryMonth >= 12 ) {
          console.log("Error: Provide a valid month");
        }
        expenseList.expenses.forEach((expense) => {
          const exDate = new Date(expense.date);
          const exMonth = exDate.getMonth() + 1;
          if(exMonth == summaryMonth) {
            totExpense += expense.amount;
          }
        });
      } else {
         totExpense = expenseList.expenses.reduce((acc, expense) => acc + expense.amount, 0)
      }
      console.log(`Total expenses: $${totExpense}`)
      
  })
  
  expenseTrackerCli.command('delete')
    .requiredOption('--id <id>')
    .action((options) => {
    const {id} = options;
    const newExpenses = expenseList.expenses.filter((ex) => ex.id != id)
    expenseList.expenses = newExpenses;
    writeToFile(expenseList)
    console.log("Expense deleted successfully");
  })

expenseTrackerCli.parse();
