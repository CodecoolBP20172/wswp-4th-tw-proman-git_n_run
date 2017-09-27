// It uses data_handler.js to visualize elements
dom = { 
    showBoards: function() {
        var target = document.getElementById("body_id");
        target.innerHTML = ""
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class", "container")
        newdiv.setAttribute("id", "wrapper")
        newdiv.innerHTML = `
        <div class="row" id="header">
            <div class="col" id="title">Proman</div>
            <div class="col"><button class="btn btn-dark" id="board_creator">Create board</button></div>
        </div>
            <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            Please, provide a name if the new board!
            <form onSubmit='dom.addBoard(this); return false' action="/#">        
                <input type="text" id="input_title" name="firstname"></input>        
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
            newdiv.innerHTML += `<div class="container" id="board${tablelist[i].id}" board>
                                <div class="row">
                                <div class="col" id="board_title">${tablelist[i].title}</div>
                                <div onclick="dom.showCards(${tablelist[i].id})" class="col" id="drop_down_button"><img src="static/images/drop_down_icon.png" width="6%"></div>
                                </div></div>`
        target.appendChild(newdiv)
        // loads and shows boards appending them to #boards div
        // it adds necessary event listeners also
    }
    },


    showCards: function(boardId) {
        //var dropdownButton = document.getElementsByClassName("dropdown_button");
        //dropdownButton.addEventListener("click", showCards);


        var target = document.getElementById("board"+boardId);
        
        var isBoardOpened = false;
        for (var i = 0; i < target.children.length; i++) { //checking children of target
            if (target.children[i].dataset.table=="true"){ 
                isBoardOpened = true; //if board_table is found the dropdown is opened
            }
        }
        
        if (isBoardOpened == false) {
        var tableDiv = document.createElement("div");
        tableDiv.setAttribute("class", "row");
        tableDiv.setAttribute("data-table", "true");

        //cardList = dataHandler.getCardsByBoardId();

        tableDiv.innerHTML =`
                <div name="status_new" id="status_new" class="col"> New </div>
                <div name="status_progress" id="status_progress" class="col"> In Progress</div>
                <div name="status_testing" id="status_testing" class="col"> Testing </div>
                <div name="status_done" id="status_done" class="col"> Done </div>`
        target.appendChild(tableDiv);


        var areaDiv = document.createElement("div");
        areaDiv.setAttribute("class","row");
        areaDiv.setAttribute("data-area", "true");
        areaDiv.innerHTML = `
                <div name="area_new" id="${boardId}status_id1" class="col" area_new></div>
                <div name="area_progress" id="${boardId}status_id2" class="col" area_progress></div>               
                <div name="area_testing" id="${boardId}status_id3" class="col" area_testing></div>
                <div name="area_done" id="${boardId}status_id4" class="col" area_done></div>
                </div>
        `
        target.appendChild(areaDiv);

        cardList= dataHandler.getCardsByBoardId(boardId);
        console.log(cardList);
        newcard = document.createElement("div");
        for(let statusid = 1; statusid < 5; statusid ++ ){
            target = document.getElementById(boardId+"status_id" + statusid)
            for (let card_id = 0; card_id < cardList.length; card_id ++){
                newcard.innerHTML = cardList[card_id].title//<div>title</div>
                console.log(newcard.innerHTML)
                if(cardList[card_id].status_id == target.id.slice(-1)){
                target.innerHTML += ` <div class="col" id="card">${cardList[card_id].title}</div>`
                }
            }
        }

        //This should be looked, placed, etc... 
    target = document.getElementById("board"+boardId);
    var divForCreateButton = document.createElement("div"); //create a button to make a new task
    divForCreateButton.setAttribute("data-create_button", "true");
    divForCreateButton.innerHTML = `<button onclick="dom.addNewCard()">Create new task</button>`;
    target.appendChild(divForCreateButton);
        }
    else {
       var target = document.getElementById("board"+boardId);
        for (var i = 0; i < target.children.length; i++) {   //if dropdown clicked and opned, it removes the board and the create button
            if (target.children[i].dataset.table=="true"){
                target.removeChild(target.children[i]);
            }
        }
        for (var i = 0; i < target.children.length; i++) {
             if (target.children[i].dataset.area=="true"){
                target.removeChild(target.children[i]);
            }
        }
        for (var i = 0; i < target.children.length; i++) {
            if (target.children[i].dataset.create_button=="true"){
                target.removeChild(target.children[i]);      
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
       addNewCard: function() {
        //here comes the function
    }

    // here comes more features
}  