var fs = require("fs");

const processTextInputLines = (inputFile) => {
    const inputFileAsText = fs.readFileSync(inputFile).toString('utf-8');
    const twoStrings = inputFileAsText.split('\n');

    const listOfLines = twoStrings.map(string => {
        return string.split(',')
    })

    listOfLines.pop()

    return listOfLines
}

const returnLowestSteps = (lines) => {   

    locationLists = [[], []]

    const directionsToDistance = (inputDirection) => {
        switch(inputDirection) {
            case 'L':
                return -1
            case 'R':
                return +1
            case 'U':
                return +1
            case 'D':
                return -1
            default:
                return 0
        }
    }

    lines.forEach((line, index) => {
        tracker = { 
            x: 0,
            y: 0,
            steps: 0
        }

        line.forEach(input => {
            direction = input[0]
            duration = parseInt(input.slice(1))

            for(var i = 0; i < duration; i++) {
                if(direction == 'L' || direction == 'R') {
                    tracker.x += directionsToDistance(direction)
                }
                if(direction == 'U' || direction == 'D') {
                    tracker.y += directionsToDistance(direction)
                }

                tracker.steps += 1
                locationLists[index].push({ ...tracker})
            }
        })

        // Reset the tracker between lines.
        tracker.x = 0
        tracker.y = 0
        tracker.steps = 0
    })

    const trackingSetsJson = locationLists.map(trackingList => {
        const stringList = trackingList.map(entry => {
            const entryCopy = {...entry}
            delete entryCopy['steps']

            return JSON.stringify(entryCopy)
        })
        return new Set(stringList)
    })

    let intersections = new Set(
        [...trackingSetsJson[0]].filter(x => trackingSetsJson[1].has(x)));

    let interSectionsArray = Array.from(intersections)

    let interSectionsObjectArray = interSectionsArray.map(intersectionString => {
        return JSON.parse(intersectionString)
    })

    let distances = interSectionsObjectArray.map(intersection => {
        let steps = 0

        locationLists.forEach(trackingList => {
            trackingList.forEach(entry => {
                if(entry.x == intersection.x && entry.y == intersection.y) {
                    steps += entry.steps
                }
            })
        })

        return { distance: Math.abs(intersection.x) + Math.abs(intersection.y), steps: steps }
    })

    const sortedDistances = distances.sort((a, b) => (a.steps > b.steps) ? 1 : -1)
    return sortedDistances[0]
}

let inputLines = processTextInputLines('./input');

let distance = returnLowestSteps(inputLines)

console.log(distance)