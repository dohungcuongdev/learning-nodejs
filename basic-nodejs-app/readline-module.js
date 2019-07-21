const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;
rl.question(`What is ${num1} + ${num2}?\n`, (userinput) => {
    if (userinput == answer) {
        rl.close();
    } else {
        rl.setPrompt(`Incorrect answer, please try again, What is ${num1} + ${num2}?\n`);
        rl.prompt();
        // readline is an instance of EventEmitter
        rl.on('line', (userinput) => {
            if (userinput == answer) {
                rl.close();
            } else {
                rl.setPrompt(`Your answer of ${userinput} is incorrect, try again,  What is ${num1} + ${num2}?\n`);
                rl.prompt();
            }
        })
    }
});

// readline is an instance of EventEmitter
rl.on('close', () => {
    console.log("Correct Answer!!!")
})