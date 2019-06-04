function print(arr) {
  arr.forEach(element => log(element.toUpperCase()));
}
function log(x) {
  return console.log(x);
}
let messages = ["Code", "Wars", "Reps"];
print(["map", "filter", "reduce"]);
log(messages);
log(`Really`);
let x = "String";
log(`iterpolate ${x}`);
