var fs = require("fs");

opCodeHandlers = {
    1: (one, two) => { return one + two},
    2: (one, two) => { return one * two},
    99: () => { throw Error('Halt')}
} 

const opCodeListParser = (opCodeList, opCodeHandlers) => {

    let arrayPointer = 0

    while(arrayPointer < opCodeList.length) {
        const opCodeHandlerFunction = opCodeHandlers[opCodeList[arrayPointer]]

        const firstElementLocation = opCodeList[arrayPointer + 1]
        const secondElementLocation = opCodeList[arrayPointer + 2]
        const resultElementLocation = opCodeList[arrayPointer + 3]

        try {
            opCodeList[resultElementLocation] = opCodeHandlerFunction(opCodeList[firstElementLocation], opCodeList[secondElementLocation])
        } catch {
            console.log(opCodeList)
        }

        arrayPointer += 4
    }

}

function processOpCodeList(inputFile) {
    const inputFileAsText = fs.readFileSync(inputFile).toString('utf-8');

    const listOfMassStrings = inputFileAsText.split(',');

    const listOfMassInts = listOfMassStrings.map(string => {
        return parseInt(string)
    });

    const sanitizedList = listOfMassInts.filter((input) => {
        return !Number.isNaN(input);
    })

    return sanitizedList
}

let opCodeList = processOpCodeList('./input')
opCodeListParser(opCodeList, opCodeHandlers)
