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
};

const listTasks = () => {
  if (!fs.existsSync(taskFile)) {
    console.log("There are no pending tasks!");
    return;
  }

  const tasks = fs
    .readFileSync(taskFile, "utf8")
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .map(([priority, ...parts]) => ({
      priority: parseInt(priority),
      task: parts.join(" "),
    }))
    .filter(({ priority }) => !isNaN(priority))
    .sort((a, b) => a.priority - b.priority);

  if (tasks.length === 0) {
    console.log("There are no pending tasks!");
    return;
  }

  tasks.forEach((task, idx) => {
    const taskLine = `${idx + 1}. ${task.task} [${task.priority}]`;
    console.log(taskLine);
  });
};

const deleteTask = (idx) => {
    if (!fs.existsSync(taskFile)) {
        console.log("Error: Missing NUMBER for deleting tasks.");
        return;
    }

    const tasks = fs.readFileSync(taskFile, 'utf8').trim().split('\n');

    if (idx < 1 || idx > tasks.length) {
        console.log(
          `Error: task with index #${idx} does not exist. Nothing deleted.`
        );
        return;
    }

    const deletedTask = tasks.splice(idx - 1, 1);
    fs.writeFileSync(taskFile, tasks.join('\n'), 'utf8');

    console.log(`Deleted task #${idx}`);
    console.log(deleteTask);
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
      const task = parts.join(" ");
      addTask(priority, task);
      break;
    case "help":
      console.log(usage);
      break;
    case "ls":
      listTasks();
      break;
    case "del":
      const index = parseInt(cmdArgs[0]);
      deleteTask(index);
      break;
  }
};

cli();
