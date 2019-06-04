// As a general overview, web development can largely be broken into two categories:
// • Client - side—(front - end) refers to the code you write that results in something the user
// sees in his web browser.Client - side code typically includes JavaScript used to animate
// the user experience when a web page is loaded.
// • Server - side—(back - end) refers to code used for application logic(how data is organized
// and saved to the database).Server - side code is responsible for authenticating users on a login page, running scheduled tasks, and even ensuring that the client - side code reaches the client.

// This process may sound counterintuitive, but in most applications that don’t require computationally intensive tasks
// (tasks requiring a lot of processing power from your computer), this single thread can quickly manage and execute all the tasks.

// Node.js operates on an event loop using a single thread.
// A thread is the bundle of computing power and resources needed for the execution of a programmed task.
// Generally, a thread is responsible for starting and completing a task; the more tasks needed to run simultaneously, the more threads are needed.
// In most other software, multiple tasks are matched and handled by a pool of threads that the computer can offer at the same time(concurrently).
// Node.js, however, handles only one task at a time and uses more threads only for tasks that can’t be handled by the main thread.

//the Node.js event loop cycles forever in a loop, listening for JavaScript events triggered by the server to notify of some new task or another task’s completion.
// As the number of tasks increases, tasks line up in a queue to be incrementally processed by the event loop.
// You don’t code with this fact in mind, though. You write your code by using asynchronous conventions,
// and the Node.js architecture schedules task handling for you behind the scenes.
// As a result, Node.js has become popular for creating real-time applications that persistently listen for data being sent back and forth.

//the event loop handles a series of tasks, always working on one task at a time and using the computer’s processing power to offload some larger tasks while the event loop shortens the list of tasks.
// On most other platforms, incoming tasks are assigned to new processes, creating a new event loop for each task.
// Increasing the number of tasks, however, is like increasing the number of employees in a finite space.
// You start to run into new issues such as cost, computing power, and shared resources.
//create a server object:

// It’s important to note that the Node.js event loop relies on a single thread to manage all its tasks,
// but it doesn’t necessarily use that thread only to run each task to completion.
// In fact, Node.js is designed to pass larger tasks to the host computer,
// and the computer may create new threads and processes to operate those tasks.

// A thread is an allocated bundle of computer resources used to run a series of instructions in a task.
// Usually, the tasks handled by threads are simple and fast.
// For this reason, the Node.js event loop needs only one thread to act as the manager of all other tasks.
// Threads are made available through computer processes, and some more - intensive tasks require their own process to run.

// A process is also a bundle of computing power and resources used for a task’s execution, though usually for larger tasks than those handled by threads.
// A process must exist to create a thread, which implies that each Node.js application runs on its own process.
// Even though Node.js may be single - threaded, you can have multiple instances of processes running in parallel and processing incoming requests and tasks.
// For this reason, Node.js scales well; it schedules tasks asynchronously, using additional threads and processes only when necessary instead of generating
// new processes for every task.As more processes are needed to handle your task list, demand on your computer increases.
// Node.js works best to minimize the number of concurrent processes.

/*
Node Js Event Loop
1 Node prepares the context of your app and configurations
2 as tasks build up they are queued and enter the poll phase for processing.
3 Callbacks from the queue will run at this stage in the loop. Additional callbacks created here go back in the task queue. 
4 Near the end of the loop operations specified to run immediately run.
5 Tasks set in a time interval or timeout will get evaluated after.
repeat
*/

// True or false: The Node.js event loop runs each task to completion before handling the next task.

// False.
// The Node.js event loop removes tasks from a queue sequentially, but it may offload the task to be handled by the machine
// on which the application is running or wait for certain tasks to complete while handling new tasks.
