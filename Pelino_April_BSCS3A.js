let schoolName = "CCNHS";
let schoolYear = 2026;
let passingGrade = 75;

let students = ["April", "Kent", "Vanna"];
let subjects = ["Math", "Science", "English"];
let grades = [85, 72, 90];

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Hello, my name is ${this.name}.`;
    }

    getAge() {
        return this.age;
    }
}

class Student extends Person {
    constructor(name, age, studentId, grade) {
        super(name, age);
        this.studentId = studentId;

        let _grade = grade;

        this.getGrade = function () {
            return _grade;
        };

        this.setGrade = function (newGrade) {
            if (newGrade >= 0 && newGrade <= 100) {
                _grade = newGrade;
            }
        };
    }

    study() {
        return `${this.name} is studying.`;
    }

    checkResult() {
        if (this.getGrade() >= passingGrade) {
            return `${this.name} passed!`;
        } else {
            return `${this.name} failed.`;
        }
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    teach() {
        return `${this.name} is teaching ${this.subject}.`;
    }
}

class School {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    showStudents() {
        this.students.forEach(student => {
            console.log(student.name);
        });
    }
}


let student1 = new Student("April", 20, "S001", 85);

let student2 = new Student("Vanna", 21, "S002", 72);

let teacher1 = new Teacher("Mr. Yu", 35, "CSElec1");

let school1 = new School("Calbayog City National High School", "Calbayog City");


let address = {
    city: "Calbayog City",
    province: "Samar",
    country: "Philippines"
};

let schoolInfo = {
    principal: "Mr. Ortiz",
    totalStudents: 500,
    established: 1995
};


class BankAccount {
    #balance; 

    constructor(owner, balance) {
        this.owner = owner;
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

let account1 = new BankAccount("Vanna", 1000);


class Animal {
    makeSound() {
        throw new Error("makeSound() must be implemented.");
    }
}

class Dog extends Animal {
    makeSound() {
        return "Dog says: Woof!";
    }
}


class Cat extends Animal {
    makeSound() {
        return "Cat says: Meow!";
    }
}

let dog = new Dog();
let cat = new Cat();

console.log(dog.makeSound());
console.log(cat.makeSound());


if (schoolYear >= 2026) {
    console.log("Current school year.");
}

if (grades[0] >= passingGrade) {
    console.log("Vanna passed Math.");
} else {
    console.log("Vanna failed Math.");
}

if (students.length >= 3) {
    console.log("There are at least 3 students.");
}


for (let i = 0; i < students.length; i++) {
    console.log("Student:", students[i]);
}

for (let subject of subjects) {
    console.log("Subject:", subject);
}

let i = 0;

while (i < grades.length) {
    console.log("Grade:", grades[i]);
    i++;
}


console.log(student1.introduce());
console.log(student1.study());
console.log(student1.checkResult());

console.log(student2.introduce());
console.log(student2.checkResult());

console.log(teacher1.introduce());
console.log(teacher1.teach());

school1.addStudent(student1);
school1.addStudent(student2);

console.log("Students enrolled:");
school1.showStudents();

account1.deposit(500);
console.log("Bank balance:", account1.getBalance());

console.log("Address:", address.city, address.province);
console.log("Principal:", schoolInfo.principal);