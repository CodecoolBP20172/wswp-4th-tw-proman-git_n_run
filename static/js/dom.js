dom = {
	showBoards: function() {
		var targetBody = document.getElementById("body_id");
		targetBody.innerHTML = ""
		var newdiv = document.createElement("div");
		newdiv.setAttribute("class", "container")
		newdiv.setAttribute("id", "wrapper")
		newdiv.innerHTML = `
        <div class="row" id="header">
            <div class="col" id="title">Proman</div>
            <div class="col"><button class="btn btn-dark" id="board_creator" onclick="dom.addBoard()">Create board</button></div>
        </div>
        </div>
        `
		targetBody.appendChild(newdiv);
		var targetWrapper = document.getElementById("wrapper")
		var newdiv = document.createElement("div");
		dataHandler.getBoards(function(tablelist) {
			console.log(tablelist)
			for (let i = 0; i < tablelist.length; i++) {
				newdiv.innerHTML += `<div class="container" id="board${tablelist[i].id}" board>
                                <div class="row">
                                <div class="col" id="board_title">${tablelist[i].title}</div>
                                <div onclick="dom.showCards(${tablelist[i].id})" class="col" id="drop_down_button">▼</div>
                                </div></div>`
				targetWrapper.appendChild(newdiv)
			}
		})
	},

	showCards: function(boardId) {
		dataHandler.getCardsByBoardId(boardId, function(cardList) {
			var targetBoard = document.getElementById("board" + boardId);

			var isBoardOpened = false;
			for (var i = 0; i < targetBoard.children.length; i++) { //checking children of target
				if (targetBoard.children[i].dataset.table == "true") {
					isBoardOpened = true; //if board_table is found the dropdown is opened
				}
			}


			if (isBoardOpened == false) {
				var tableDiv = document.createElement("div");
				tableDiv.setAttribute("class", "row");
				tableDiv.setAttribute("data-table", "true");



				tableDiv.innerHTML = `
                <div name="status_new" id="status_new" class="col"> New </div>
                <div name="status_progress" id="status_progress" class="col"> In Progress</div>
                <div name="status_testing" id="status_testing" class="col"> Testing </div>
                <div name="status_done" id="status_done" class="col"> Done </div>`
				targetBoard.appendChild(tableDiv);


				var areaDiv = document.createElement("div");
				areaDiv.setAttribute("class", "row");
				areaDiv.setAttribute("data-area", "true");
				areaDiv.innerHTML = `
                <div ondrop="drag_and_drop.drop(event)" ondragover="drag_and_drop.allowDrop(event)" 
                name="area_new" id="${boardId}status_id1" class="col" area_new></div>

                <div ondrop="drag_and_drop.drop(event)" ondragover="drag_and_drop.allowDrop(event)" 
                name="area_progress" id="${boardId}status_id2" class="col" area_progress></div>

                <div ondrop="drag_and_drop.drop(event)" ondragover="drag_and_drop.allowDrop(event)" 
                name="area_testing" id="${boardId}status_id3" class="col" area_testing></div>

                <div ondrop="drag_and_drop.drop(event)" ondragover="drag_and_drop.allowDrop(event)" 
                name="area_done" id="${boardId}status_id4" class="col" area_done></div>
                </div>
        `
				targetBoard.appendChild(areaDiv);
				var newcard = document.createElement("div");
				for (let statusid = 1; statusid < 5; statusid++) {
					targetStatus = document.getElementById(boardId + "status_id" + statusid)
					for (let card_id = 0; card_id < cardList.length; card_id++) {
						newcard.innerHTML = cardList[card_id].title
						if (cardList[card_id].status_id == targetStatus.id.slice(-1)) {
							targetStatus.innerHTML += ` 
                                        <div ondrop="drag_and_drop.doNothing(event)" draggable="true" ondragstart="drag_and_drop.drag(event)" 
                                        class="card" ondblclick="dom.editField(${cardList[card_id].id}, ${cardList[card_id].board_id})"
                                        id=${cardList[card_id].id}>${cardList[card_id].title}
                                        <div id="edit_div">

                                        <a href="#" id="edit_card_button" onclick="dom.editField(${cardList[card_id].id}, ${cardList[card_id].board_id})">
                                        <i class="fa fa-pencil" id="edit_card_pencil" aria-hidden="true"></i>
                                        </a></div>
                                        </div>`
						}
					}
				}

				//This should be looked, placed, etc... 
				targetBoard = document.getElementById("board" + boardId);
				var divForCreateButton = document.createElement("div"); //create a button to make a new task
				divForCreateButton.setAttribute("data-create_button", "true");
				divForCreateButton.innerHTML = `<button button class="btn btn-dark" id="create_new_task" 
                                            onclick="dom.addNewCard(${boardId})">Create new task</button>`;
				targetBoard.appendChild(divForCreateButton);
			} else {
				targetBoard = document.getElementById("board" + boardId);
				for (var i = 0; i < targetBoard.children.length; i++) { //if dropdown clicked and opned, it removes the board and the create button
					if (targetBoard.children[i].dataset.table == "true") {
						targetBoard.removeChild(targetBoard.children[i]);
					}
				}
				for (var i = 0; i < targetBoard.children.length; i++) {
					if (targetBoard.children[i].dataset.area == "true") {
						targetBoard.removeChild(targetBoard.children[i]);
					}
				}
				for (var i = 0; i < targetBoard.children.length; i++) {
					if (targetBoard.children[i].dataset.create_button == "true") {
						targetBoard.removeChild(targetBoard.children[i]);
					}
				}

			}
		})
	},


	addBoard: function() {
		var newBoardTitle = prompt("Please write your new board's name", "New board name");
		if (newBoardTitle == null || newBoardTitle == "") {
			this.addBoard();
		} else {
			dataHandler.createNewBoard(newBoardTitle);
			this.showBoards();
		}
	},


	addNewCard: function(boardId) {
		var createdCardTitle = prompt("Please write your new card's name", "new card name");
		if (createdCardTitle == null || createdCardTitle == "") {
			this.editField(cardTitle, cardID);
		} else {
			dataHandler.createNewCard(createdCardTitle, boardId);
			this.showBoards();
			this.showCards(boardId);
		}

	},


	editField: function(cardId, cardBoardId) {
		var newCardTitle = prompt("Editing Title", "cardTitle");
		if (newCardTitle == null || newCardTitle == "") {
			this.editField(cardTitle, cardID);
		} else {
			dataHandler.editCardTitle(cardId, newCardTitle);
			this.showBoards();
			this.showCards(cardBoardId);
		}
	},
	droppedOnCard: false

}