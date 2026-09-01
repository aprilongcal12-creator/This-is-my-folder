// Variables
let city = "Calbayog";
let temperature = 30;
let hasWifi = true;

// Arrays
let animals = ["Dog", "Cat", "Bird"];
let scores = [95, 88, 76, 90];
let students = ["April", "Vanna", "Kent", "Kringo"];

// Conditionals
let money = 100;

if (money >= 50) {
    console.log("You can buy it!");
} else {
    console.log("Not enough money.");
}

let password = "1234";

if (password === "1234") {
    console.log("Access granted");
} else {
    console.log("Wrong password");
}

let weather = "rainy";

if (weather === "sunny") {
    console.log("wear sunglasses");
} else if (weather === "rainy") {
    console.log("Bring an umbrella");
} else {
    console.log("Check the weather");
}

// Loops
for (let i = 1; i <= 10; i++) {
    console.log("Number: " + i);
}

let count = 5;

while (count > 0) {
    console.log(count);
    count--;
}

animals.forEach(function(animal) {
    console.log("I like " + animal);
});