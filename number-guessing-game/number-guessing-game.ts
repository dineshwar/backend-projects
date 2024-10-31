#!/usr/bin/env -S deno run -A
import readline from 'node:readline';

const choices = [1, 2, 3];
const choicesName = ['Easy', 'Medium', 'Hard'];
const chances = [10, 5, 3];

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
const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};
async function main() {
  const randNum = getRandomNumber();
  let success = false;
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("You have 5 chances to guess the correct number.");
  console.log();
  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");
  console.log();
  const choice = await askInput("Enter your choice: ");
  console.log();
  if ( choices.includes(choice) ) {
    console.log(`Great! You have selected the ${choicesName[choice - 1]} difficulty level.`);
    console.log("Let's start the game!");
    console.log();
    for(let i=1;i<=chances[choice - 1];i++) {
      let guessNum = await askInput("Enter your guess: ");
      if (guessNum == randNum) {
        success = true;
        console.log(`Congratulations! You guessed the correct number in ${i} attempts.`);
        break;
      }
      const compareStatus = (randNum > guessNum) ? "greater" : "less";
      console.log(`Incorrect! The number is ${compareStatus} than ${guessNum}.`)
    }
    if (!success) {
      console.log("Chances over!!");
      console.log(`The correct number is ${randNum}`)
    }
  } else {
    console.log("Invalid choice!!!")
  }

  rl.close()
}

main();
