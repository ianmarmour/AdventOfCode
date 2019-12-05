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
            return opCodeList[0]
        }

        arrayPointer += 4
    }

}

function instructionChecker(opCodeList, opCodeHandlers) {

    let noun = 0
    let verb = 0

    while(noun < 100) {
        while(verb < 100) {
            let startingMemory = [...opCodeList]
            startingMemory[1] = noun
            startingMemory[2] = verb
            
            let output = opCodeListParser(startingMemory, opCodeHandlers)

            if(output == 19690720) {
                console.log(noun)
                console.log(verb)
                break
            }

            verb += 1
        }

        verb = 0 
        noun += 1
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
instructionChecker(opCodeList, opCodeHandlers)
