"use strict";

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

//Export object literal with all controller actions
module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses
    });
  }
};
