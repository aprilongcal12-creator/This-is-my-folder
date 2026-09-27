let studentName = "April";
let age = 21;
let course = "BSCS";
let yearLevel = 3;
let section = "A";
let school = "NWSSU";
let status = "Regular";
let tuition = 15000;
let subjects = 6;
let isEnrolled = true;

const studentID = "2026-001";
const semester = "First Semester";
const department = "College of Computing";
const adviser = "Prof. Yu";
const passingGrade = 75;
const schoolYear = "2026-2027";
const campus = "Main Campus";
const currency = "PHP";
const maxUnits = 21;
const systemName = "NWSSU Student System";

const greet = (name) => `Hello, ${name}!`;
const calculateBalance = (fee, payment) => fee - payment;
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const checkGrade = (grade) => grade >= passingGrade;

console.log(`Student Name: ${studentName}`);
console.log(`Student ID: ${studentID}`);
console.log(`Age: ${age}`);
console.log(`Course: ${course}`);
console.log(`Year Level: ${yearLevel}`);
console.log(`Section: ${section}`);
console.log(`School: ${school}`);
console.log(`Status: ${status}`);
console.log(`Tuition Fee: ${currency} ${tuition}`);
console.log(`Number of Subjects: ${subjects}`);
console.log(`Semester: ${semester}`);
console.log(`School Year: ${schoolYear}`);

const grades = [90, 85, 88, 92];
const [grade1, grade2] = grades;

const names = ["April", "Vanna", "Yuko"];
const [firstName, secondName] = names;

const scores = [95, 89, 91];
const [score1, score2] = scores;

const student = {
    name: "April",
    age: 20,
    course: "BSCS"
};

const { name, age: studentAge } = student;

const enrollment = {
    id: "2026-001",
    semester: "First Semester",
    status: "Enrolled"
};

const { id, semester: currentSemester } = enrollment;

const schoolInfo = {
    schoolName: "NWSSU",
    campusName: "Main Campus",
    location: "Samar"
};

const { schoolName, campusName } = schoolInfo;

const firstSubjects = ["Programming", "Database"];
const secondSubjects = ["Networking", "Web Development"];

const allSubjects = [...firstSubjects, ...secondSubjects];
const newGrades = [...grades, 95, 87];

const basicInfo = {
    name: "April",
    course: "BSCS"
};

const completeInfo = {
    ...basicInfo,
    yearLevel: 3,
    section: "A"
};

const contactInfo = {
    email: "aprilongcal12@gmail.com",
    phone: "09927339224"
};

const studentProfile = {
    ...basicInfo,
    ...contactInfo
};

const doubledGrades = grades.map((grade) => grade * 2);
const upperSubjects = allSubjects.map((subject) => subject.toUpperCase());
const passingGrades = grades.filter((grade) => grade >= 85);
const longSubjects = allSubjects.filter((subject) => subject.length > 10);

const address = {
    city: "Calbayog",
    province: "Samar"
};

const cityName = address?.city;
const zipCode = address?.zipCode;

const guardian = {
    name: "Vanna",
    contact: {
        phone: "09918912532"
    }
};

const guardianName = guardian?.name;
const guardianEmail = guardian?.contact?.email;

console.log(greet(studentName));
console.log(`Balance: ${calculateBalance(tuition, 5000)}`);
console.log(`Sum: ${add(10, 20)}`);
console.log(`Product: ${multiply(5, 4)}`);
console.log(`Passing Grade: ${checkGrade(90)}`);

console.log(`First Grade: ${grade1}`);
console.log(`Second Grade: ${grade2}`);

console.log(`First Name: ${firstName}`);
console.log(`Second Name: ${secondName}`);

console.log(`Score 1: ${score1}`);
console.log(`Score 2: ${score2}`);

console.log(`Student: ${name}`);
console.log(`Student Age: ${studentAge}`);
console.log(`Enrollment ID: ${id}`);
console.log(`Current Semester: ${currentSemester}`);
console.log(`School: ${schoolName}`);
console.log(`Campus: ${campusName}`);

console.log(`All Subjects: ${allSubjects}`);
console.log(`New Grades: ${newGrades}`);

console.log(`Complete Info: ${JSON.stringify(completeInfo)}`);
console.log(`Student Profile: ${JSON.stringify(studentProfile)}`);

console.log(`Doubled Grades: ${doubledGrades}`);
console.log(`Uppercase Subjects: ${upperSubjects}`);

console.log(`Passing Grades: ${passingGrades}`);
console.log(`Long Subjects: ${longSubjects}`);

console.log(`City: ${cityName}`);
console.log(`Zip Code: ${zipCode ?? "Not available"}`);
console.log(`Guardian: ${guardianName}`);
console.log(`Guardian Email: ${guardianEmail ?? "Not available"}`);



