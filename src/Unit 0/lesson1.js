let name = "Jon Wexler";
console.log(name);
class Goat {
  eat(foodType) {
    console.log(`I love eating ${foodType}`);
  }
}
let billy = new Goat();
billy.eat("tin cans");
billy.eat("pooh");

//In the REPL environment, you have access to all the core modules that come with Node.js.
// Core modules are JavaScript files that come with your Node.js installation.
// I talk more about modules in unit 1.
// You’ll soon see in your own custom applications that you need to import some modules to use them in REPL.
// For a short list of commands to use in REPL

// REPL command Description
// .break (or clear) Exits a block within the REPL session, which is useful if you get stuck in a block of code.
// .editor - Opens an internal editor for you to write multiple lines of code.ctrl. d saves and quits the editor
// .exit - Quits the REPL session
// .help - Lists other commands and useful tips to help you feel comfortable with this interactive shell environment
// .load - Followed by a local filename; gives REPL access to that file’s code
// .save - Followed by a new filename of your choice; saves your REPL session’s code to a file
