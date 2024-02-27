const grid = function() {
    const row0 = ["","",""];
    const row1 = ["","",""];
    const row2 = ["","",""];
    return{row0, row1, row2};
}();

const gridToPlay = grid;

function showGrid(gridToPlay) {
    for (row in gridToPlay) console.log(gridToPlay[row]);
};

function createPlayer(name, marker) {
    return {name, marker};
};      

function play(gridToPlay, row, column, marker) {
    if (!gridToPlay[row][column]) gridToPlay[row][column] = marker;
};

function horitontalCheck(gridToPlay) {
    for (row in gridToPlay) {
        if (gridToPlay[row][0] && 
            gridToPlay[row][0] == gridToPlay[row][1] &&
            gridToPlay[row][0] == gridToPlay[row][2]) return true;
    }
};

function verticalCheck(gridToPlay) {
    for (let i = 0; i <= 2; i ++) {
        if (gridToPlay["row0"][i] &&
            gridToPlay["row1"][i] == gridToPlay["row0"][i] &&
            gridToPlay["row2"][i] == gridToPlay["row0"][i]) return true;
    }
};

function diagonalCheck(gridToPlay) {
    if ((gridToPlay["row1"][1]) &&
       ((gridToPlay["row1"][1] == gridToPlay["row0"][0] && gridToPlay["row1"][1] == gridToPlay["row2"][2]) ||
        (gridToPlay["row1"][1] == gridToPlay["row0"][2] && gridToPlay["row1"][1] == gridToPlay["row2"][0])))
        return true;
};

function winCheck() {
    if (horitontalCheck() || verticalCheck() || diagonalCheck()) return true;
};

function drawCheck(gridToPlay) {
    let flag = 0;
    for (row in gridToPlay) {
        if (row.includes("")) flag = 1;
    };
    if (flag == 0 && !winCheck()) return true;
};

function resetGrid(gridToPlay) {
    for (row in gridToPlay) {
        gridToPlay[row][0] = gridToPlay[row][1] = gridToPlay[row][2] = "";      
    }
};





