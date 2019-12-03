
var fs = require("fs");

function processMassFile(inputFile) {
    const inputFileAsText = fs.readFileSync(inputFile).toString('utf-8');

    const listOfMassStrings = inputFileAsText.split('\n');

    const listOfMassInts = listOfMassStrings.map(string => {
        return parseInt(string)
    });

    const sanitizedListOfMassInts = listOfMassInts.filter((input) => {
        return !Number.isNaN(input);
    })

    return sanitizedListOfMassInts
}

function calculateTotalFuelRequired(massList) {
    const fuelList = massList.map(mass => {
        return calculateFuelForMass(mass)
    });


    const sum = fuelList.reduce((acc, val) => {
        return acc + val;
    });

    return sum;
}

function calculateFuelForMass(mass) {
    const requiredFuel = Math.floor(mass / 3 - 2);

    return requiredFuel;
}

let massList = processMassFile('./input')
let fuelTotal = calculateTotalFuelRequired(massList)

console.log(`Total Required Fuel: ${fuelTotal}`)