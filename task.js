//console.log("Hello, World!");

const fs = require("fs");

const taskFile = `${process.cwd()}/task.txt`;
const completedFile = `${process.cwd()}/completed.txt`;

const usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;

//console.log(usage);

const addTask = (priority, task) => {
    if (!task) {
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    } 
    const taskLine = `${priority} ${task}`;
    fs.appendFileSync(taskFile, taskLine + "\n");
    console.log(`Added task: "${task}" with priority ${priority}`);
}

const cli = () => {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(usage);
        return;
    }
    const [cmd, ...cmdArgs] = args;
    switch (cmd) {
        case "add":
            const [priority, ...parts] = cmdArgs;
            const task = parts.join("");
            addTask(priority, task);
            break;
    }

};

cli();