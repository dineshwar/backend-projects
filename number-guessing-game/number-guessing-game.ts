#!/usr/bin/env -S deno run -A
import readline from 'node:readline';

const choices = [1, 2, 3];
const choicesName = ['Easy', 'Medium', 'Hard'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askInput = (question: string): Promise<number> => {
  return new Promise((resolve) => {
    rl.question(question, (answer:number) => {
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
  if ( choices.includes(choice) ) {
    console.log(`Great! You have selected the ${choicesName[choice - 1]} difficulty level.`);
    console.log("Let's start the game!");
  }
  rl.close()
}

main();
