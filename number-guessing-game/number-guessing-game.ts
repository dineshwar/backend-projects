#!/usr/bin/env -S deno run -A
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askInput = (question: string): Promise<number> => {
  return new Promise((resolve) => {
    rl.prompt(question, (answer:number) => {
      resolve(Number(answer));
    })
  });
}

async function main() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("You have 5 chances to guess the correct number.");
  console.log("");
  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");
  const choice = await askInput("Enter your choice: ");
  console.log(choice);
}

main();
