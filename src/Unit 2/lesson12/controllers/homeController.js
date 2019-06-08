exports.showIndex = (req, res) => {
  res.render("index");
};
exports.showSignUp = (req, res) => {
  res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

const courses = [
  {
    title: "Event Driven Javascript",
    cost: 50
  },
  {
    title: "Deep JS Foundations",
    cost: 99
  },
  {
    title: "React Fundamentals",
    cost: 80
  }
];
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};
