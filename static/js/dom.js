// It uses data_handler.js to visualize elements
dom = { 
    showBoards: function() {
        var target = document.getElementById("body_id");
        target.innerHTML = ""
        var newdiv = document.createElement("div");
        newdiv.innerHTML = `
        <div class="wrapper" id="wrapper">
        <div class="header">
            <div class="title">Proman</div>
            <div class="new_board_button">
                <button id="board_creator">Create board</button>
            </div>

        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            Please, provide a name if the new board!
            <form onSubmit='dom.addBoard(this); return false' action="/#">        
                <input type="text" id="input_title" name="newBoardName"></input>        
            </form>
          </div>
      
        </div>
        `
        target.appendChild(newdiv);
                // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var button = document.getElementById("board_creator");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        button.onclick = function() {
        modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        target = document.getElementById("wrapper")
        newdiv = document.createElement("div");
        tablelist = dataHandler.getBoards();
        for (let i= 0; i < tablelist.length; i++){
            newdiv.innerHTML += `<div class="board" id="board${tablelist[i].id}">
                                <div class="board_title">${tablelist[i].title}</div>
                                <div onclick="dom.showCards(${tablelist[i].id})" class="dropdown_button">Dropdown button
                                </div>


                                </div>`
        target.appendChild(newdiv)
        // loads and shows boards appending them to #boards div
        // it adds necessary event listeners also
    }
    },


    showCards: function(boardId) {
        //var dropdownButton = document.getElementsByClassName("dropdown_button");
        //dropdownButton.addEventListener("click", showCards);


        var target = document.getElementById("board"+boardId);
        var newDiv = document.createElement("div"); //<div></div>
        newDiv.setAttribute("class", "board_table");

        cardList = dataHandler.getCardsByBoardId();

        newDiv.innerHTML = 

        `
        <div class="row_board"><div name="field_new" id="field_new" class="field"> 
                <div name="status_new" id="status_new" class="status"> New 
                <div name="area_new" id="${boardId}status_id1" class="area">
                </div>
                </div>
            </div>
            <div name="field_progress" id="field_progress" class="field">
                <div name="status_progress" id="status_progress" class="status"> In Progress 
                <div name="area_progress" id="${boardId}status_id2" class="area"> 
                    </div>
                </div>
            </div>
            <div name="field_testing" id="field_testing" class="field">
                <div name="status_testing" id="status_testing" class="status"> Testing 
                <div name="area_testing" id="${boardId}status_id3" class="area"> 
                    </div>
                </div>
            </div>
            <div name="field_done" id="field_done" class="field">
                <div name="status_done" id="status_done" class="status"> Done 
                <div name="area_done" id="${boardId}status_id4" class="area"> 
                </div>
                </div>
            </div>
        </div>
            `;
        target.appendChild(newDiv);

        var cardList= dataHandler.getCardsByBoardId(boardId);
        var newcard = document.createElement("div");
        for(let statusid = 1; statusid < 5; statusid ++ ){
            target = document.getElementById(boardId+"status_id" + statusid)
            for (let card_id = 0; card_id < cardList.length; card_id ++){
                newcard.innerHTML = cardList[card_id].title//<div>title</div>
                if(cardList[card_id].status_id == target.id.slice(-1)){
                target.innerHTML += ` <div ondblclick="dom.editField(${cardList[card_id].titles}, ${cardList[card_id].id}, ${cardList[card_id].board_id})"
                                        id=${cardList[card_id].id}>${cardList[card_id].title}</div>`
                }
            }
        }
        
           
    
        // loads and shows the cards of a board
        // it adds necessary event listeners also
    },
    addBoard: function() {
        document.getElementById('myModal').style.display = "none";
        dataHandler.createNewBoard(document.getElementById('input_title').value);

        this.showBoards();
    },
    editField: function(cardTitle, cardID, cardBoardID) {
        var newCardTitle = prompt("Editing Title", "cardTitle");
        if (newCardTitle == null || newCardTitle == "") {
            this.editField(cardTitle, cardID);
        } else {
            dataHandler.editCardTitle(cardID, newCardTitle);
            this.showBoards();
            this.showCards(cardBoardID);
        }
    }

    // here comes more features
}   


