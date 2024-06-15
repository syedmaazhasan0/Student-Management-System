#! /usr/bin/env node
import inquirer from "inquirer";

console.log("Welcome to Student Management System!\n");

class Student {
  static idCounter: number = 0;
  studentID: number;
  cources: string[] = [];
  balance: number = 0;

  constructor(private name: string) {
    Student.idCounter++;
    this.studentID = this.generateStudentID();
  }

  generateStudentID() {
    return 10000 + Student.idCounter;
  }

  enrollCourse(course: string) {
    this.cources.push(course);
    this.balance += 1000;
  }

  viewBalance(): number {
    return this.balance;
  }

  payCoursesFee(amount: number) {
    this.balance -= amount;
  }

  showStatus() {
    console.log(`
            Name: ${this.name}
            studentID: ${this.studentID}
            Courses Enrolled: ${this.cources.join(", ")}
            Blance: ${this.balance}`);
  }

  getStudentID(): number {
    return this.studentID;
  }

  getName() {
    return this.name;
  }
}

const students: Student[] = [];

// main menu() starts
async function mainMenu() {
  const userInputMenu = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "Select your Menu!",
      choices: [
        "1. Add New Student",
        "2. Enroll Student in courses",
        "3. View Student Balance",
        "4. Pay Course Fee",
        "5. Show Student Status",
        "6. End Menu",
      ],
    },
  ]);
  const { menu } = userInputMenu;
  if (menu === "1. Add New Student") await addNewStudent();
  if (menu === "2. Enroll Student in courses") await enrollStudent();
  if (menu === "3. View Student Balance") await viewBalance();
  if (menu === "4. Pay Course Fee") await payTution();
  if (menu === "5. Show Student Status") await showStatus();
  if (menu === "6. End Menu") {
    console.log("Thank you for using Student Management System!\n");
    process.exit();
  }
  mainMenu();
}
// main menu() ends

// addNewStudent() starts

async function addNewStudent() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Student Name",
    },
  ]);
  const student = new Student(userInput.name);
  students.push(student);
  console.log(
    `Student ${student.getName()} added with ID ${student.getStudentID()} \n`
  );
}
// adddNewStudent ()ends

// enrollStudent ()starts

async function enrollStudent() {
  const student = await selectStudent();
  if (student) {
    const userInput = await inquirer.prompt({
      type: "list",
      name: "course",
      message: "Select Courses to Enroll",
      choices: ["Typescript", "Javascript", "Python", "Next.js", "HTML", "CSS"],
    });
    student.enrollCourse(userInput.course);
    console.log(`Successfully Enrolled in course ${userInput.course}`);
  }
}
// enrollStudent() ends
// view balance ()start
async function viewBalance() {
  const student = await selectStudent();
  if (student) {
    console.log(`Balance: ${student.viewBalance()}`);
  }
}
// view balance() ends
// paytutionfee ()start
async function payTution() {
  const student = await selectStudent();
  if (student) {
    const userInput = await inquirer.prompt({
      type: "input",
      name: "amount",
      message: "Enter Amount you want to Pay",
    });
    student.payCoursesFee(parseFloat(userInput.amount));
    console.log(
      `Successfully Paid ${
        userInput.amount
      } . Balance Remaining: ${student.viewBalance()}`
    );
  }
}
// paytutionfee () ends
// showStatus() starts

async function showStatus() {
  const student = await selectStudent();
  if (student) {
    student.showStatus();
  }
}
// showStatus() ends
// selectStudent() starts here
async function selectStudent() {
  if (students.length === 0) {
    console.log(`No Students available.\n`);
  } else {
    const stdSelect = await inquirer.prompt({
      type: "list",
      name: "stdID",
      message: "Select a Student!",
      choices: students.map((std) => ({
        name: std.getName(),
        value: std.getStudentID(),
      })),
    });
    return (
      students.find((std) => std.getStudentID() === stdSelect.stdID) || null
    );
  }
}

mainMenu();
