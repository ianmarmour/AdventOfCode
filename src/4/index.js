const passwordGenerator = () => {

    let validPasswords = []
    let startingValue = 272091
    const endingValue = 815432

    const areTwoDigitsAdjacent = (inputNumberArray) => {
        const trackingArray = []

        for(i = 0; i < inputNumberArray.length; i++) {
            let number = inputNumberArray[i]

            if(trackingArray.length != 0) {
                let lastTrackedNumber = trackingArray[trackingArray.length - 1][0]

                if(number == lastTrackedNumber) {
                    trackingArray[trackingArray.length -1].push(number)
                } else {
                    trackingArray.push([number])
                }
            } else {
                trackingArray.push([number])
            }
        }

        let trackingLengthsArray = trackingArray.map(subArray => {
            return subArray.length
        })

        if(trackingLengthsArray.includes(2)) {
            return true
        } else {
            return false
        }
    }

    const doDigitsDecrease = (inputNumberArray) => {
        previousNumber = null

        for(i = 0; i < inputNumberArray.length; i++) {
            let number = inputNumberArray[i]

            if(previousNumber != null) {
                if(number < previousNumber) {
                    return false
                }
            }

            previousNumber = number
        }

        return true
    }

    const convertNumberArrayToInt = (inputNumberArray) => {
        return parseInt(inputNumberArray.join(''))
    }

    const convertIntToNumberArray = (integer) => {
        return integer.toString().split('').map(Number);
    }

    for(startingValue; startingValue < endingValue; startingValue++) {
        let inputNumberArray = convertIntToNumberArray(startingValue)

        if (areTwoDigitsAdjacent(inputNumberArray) == true && doDigitsDecrease(inputNumberArray) == true) {
            validPasswords.push(convertNumberArrayToInt(inputNumberArray))
        }
    }
    return validPasswords
}

console.log(passwordGenerator().length)