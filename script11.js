const app = document.getElementById("app")
const popup = document.getElementById("popup")
const popupBody = document.getElementById("popup-body")
const crossScore = document.getElementById("cross_score")
const zeroScore = document.getElementById("zero_score")
const restartBtn = document.getElementById("restartBtn")



let player = "cross" // zero

let score = {
    "cross": 0,
    "zero": 0,
}

const cells = []
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")

    cell.addEventListener("click", (event) => onClickCell(event, i))
    app.appendChild(cell)
    cells.push(cell)
    
  restartBtn.addEventListener("click", (event) => startGame(event, i, line))
   
}

const line = document.createElement("div")

line.style.background = "red"
line.style.width = "0"
line.style.height = "0"
line.style.borderRadius = "2px"
line.style.position = "absolute"
line.style.transitionDuration = "2s"

app.appendChild(line)




function onClickCell(event, index) {
    const cell = cells[index]

    if (!cell.classList.contains("cross") && !cell.classList.contains("zero")) {
        cell.classList.add(player)
        checkWin(index, player)
        

        if (player === "cross") {

            player = "zero"
        }

        else if (player === "zero") {

            //cells[index].innerText = "o"
            player = "cross"
        }

    }
    

}



function checkWin(index, player) {

    let isWin = false
    let direction

    const row = Math.floor(index / 3)
    const column = index % 3

    const cell1 = cells[row * 3],
        cell2 = cells[row * 3 + 1],
        cell3 = cells[row * 3 + 2]


     if (cell1.classList.contains(player) &&
        cell2.classList.contains(player) &&
        cell3.classList.contains(player)) {
        isWin = true
        score[player] += 1

        direction = "row"

    }

    if (!isWin) {
        const cell1 = cells[column],
            cell2 = cells[column + 3],
            cell3 = cells[column + 6]

        if (cell1.classList.contains(player) &&
            cell2.classList.contains(player) &&
            cell3.classList.contains(player)) {
            isWin = true
            score[player] += 1

            direction = "column"
        }
    }

    if (!isWin) {
        let cell1, cell2, cell3
        if ((row === 0 || row === 2) && (column === 0 || column === 2) || //?? зачем это условие
            row === 1 && column === 1) {
            if (row === 0 && column === 0 ||
                row === 1 && column === 1 ||
                row === 2 && column === 2) {
                cell1 = cells[0]
                cell2 = cells[4]
                cell3 = cells[8]
                direction = "diagonal-lr"
            }


            if (row === 0 && column === 2 ||
                row === 1 && column === 1 ||
                row === 2 && column === 0) {
                cell1 = cells[2]
                cell2 = cells[4]
                cell3 = cells[6]

                direction = "diagonal-rl"
            }

            if (cell1.classList.contains(player) &&
                cell2.classList.contains(player) &&
                cell3.classList.contains(player)) {
                isWin = true
                score[player] += 1


            }

        }

    }


    if (isWin) {

        crossLineWin(row, column, direction)
        showWinPopup(player)
        drawScore(score)
    
    }
}


function crossLineWin(row, column, direction) {

    //const line = document.createElement("div")

    //line.style.background = "red"
    //line.style.width = "90%"
    //line.style.height = "3px"
    //line.style.borderRadius = "2px"
    //line.style.position = "absolute"

    switch (direction) {
        case "row":
            line.style.transitionProperty = "width"
            line.style.top = row * 100 + 50 - 1.5 + "px"
            line.style.left = "5%"

            line.style.width = "90%"
            line.style.height = "3px"
            

            break

        case "column":
            line.style.transitionProperty = "height"
            line.style.top = "5%"
            line.style.left = column * 100 + 50 - 1.5 + "px"

            line.style.width = "3px"
            line.style.height = "90%"
            

            break

        case "diagonal-lr":
            line.style.transitionProperty = "height"
            line.style.width = "3px"
            line.style.height = 90 * Math.sqrt(2) + "%"

            line.style.left = "calc(50% - 1.5px)"
            line.style.top = "calc(5% - 50px - 6px)"
            

            line.style.transform = "rotate(-45deg)"

            break

        case "diagonal-rl":
            line.style.transitionProperty = "height"
            line.style.width = "3px"
            line.style.height = 90 * Math.sqrt(2) + "%"

            line.style.left = "calc(50% - 1.5px)"
            line.style.top = "calc(5% - 50px - 6px)"
            

            line.style.transform = "rotate(45deg)"

            break

    }

    //app.appendChild(line)

}

function showWinPopup(player) {
    popupBody.innerText = `Winner is ${player}!`
    popup.style.display = "flex"  
}

function drawScore(score) {
    crossScore.innerHTML = "Cross: " + score.cross
    zeroScore.innerHTML = "Zero: " + score.zero
}
drawScore(score)

function startGame(event, i, line) {  
    const cell = cells[i]

    for (let i = 0; i < 9; i++){
     
       cell.classList.remove("cross")
       cell.classList.remove("zero")
       
    } 
    popup.style.display = "none"

    line.style.width = 0
    line.style.height = 0
    line.style.top = 0
    line.style.left = 0
    line.style.transform = "none"
  
}

































