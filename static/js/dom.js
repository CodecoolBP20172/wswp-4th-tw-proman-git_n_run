// It uses data_handler.js to visualize elements
dom = { 
    showBoards: function() {
        var target = document.getElementById("body_id");
        var newdiv = document.createElement("div");
        newdiv. innerHTML = `
        <div class="wrapper" id="wrapper">
        <div class="header">
            <div class="title">Proman</div>
            <div class="new_board_button">
                <button onclick="dom.addBoard()">Create board</button>
            </div>
        </div>
        `
        target.appendChild(newdiv);
        // loads and shows boards appending them to #boards div
        // it adds necessary event listeners also
    },
    showCards: function(boardId) { 0
        // loads and shows the cards of a board
        // it adds necessary event listeners also
    },
    addBoard: function() {
        var target = document.getElementById("wrapper")
        var newdiv = document.createElement("div")
        newdiv.innerHTML = `<div class="board"><div class="board_title">Board title</div><div class="dropdown_button">Dropdown button</div></div>`
        target.appendChild(newdiv)
    }
    // here comes more features
}   
