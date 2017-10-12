dataHandler = {

	getBoards: function(callback) {
		$.ajax({
			url: "/get-boards",
			dataType: "json",
			type: "GET",
			success: function(boards) {
				callback(boards)
			}
		})
	},
	getCardsByBoardId: function(boardId, callback) {
		$.ajax({
			url: `/get-cards-by-board-id/${boardId}`,
			dataType: "json",
			type: "GET",
			success: function(cardList) {
				callback(cardList)
			}
		})
		// returns the cards from this.data which has the given board id
	},

	getCard: function(cardId) {
		this.loadData();
		for (var i = 0; i < this.data.cards.length; i++) {
			if (this.data.cards[i].id === cardId) {
				return this.data.cards[i]
			}
		}
		// returns the card with the given id from this.data
	},
	createNewBoard: function(boardTitle) {
		$.ajax({
			url: '/create-new-board',
			dataType: 'json',
			type: "post",
			data: {
				'title': boardTitle
			}
		})
		// creates new board, saves it and returns its id
	},
	createNewCard: function(cardTitle, boardId) {
		$.ajax({
			url: '/create-new-card',
			dataType: 'json',
			type: "POST",
			data: {
				'board_id': boardId,
				'status_id': 1,
				'title': cardTitle
			},
		})
	},
	// creates new card for the given board, saves it and returns its id
	editCardTitle: function(cardID, newCardTitle) {
		$.ajax({
			url: '/edit-card-title',
			dataType: 'json',
			type: "POST",
			data: {
				'id': cardID,
				'title': newCardTitle
			}
		})
	},
	sendLogin: function() { 
		$.ajax({
			url: '/login',
			type: 'POST',
			data: {
				'username': $('#username_input').val(), 
				'password': $('#password_input').val(), 
			},
			success: function(returnValue) { 
				window.location.href = returnValue;
			}
		})
	},
	sendRegister: function() {
		$.ajax({
			url: '/register', 
			type: 'POST', 
			data: { 
				'username': $('#create_username_input').val(),
				'password': $('#create_password_input').val(),
			},
			success: function(returnValue) { 
				window.location.href = returnValue;
			}
		})
	},
	getMaxBoardId: function(callback) {
		$.ajax({
			url: `/get-max-board-id`,
			dataType: "json",
			type: "GET",
			success: function(maximumId) {
				callback(maximumId)
			}
		})
	},
	getMaxCardId: function(callback) {
		$.ajax({
			url: `/get-max-card-id`,
			dataType: "json",
			type: "GET",
			success: function(maximumId) {
				callback(maximumId)
			}
		})
	},

	changeCardStatus: function(statusId, cardId) {
		$.ajax({
			url: '/update-card-status',
			dataType: 'json',
			type: "POST",
			data: {
				'id': cardId,
				'status_id': parseInt(statusId.slice(-1)),
				'board_id': parseInt(statusId.substring(0, 4))
			},
			success: function() {
				var card = document.getElementById(cardId)
				var status = document.getElementById(statusId)
				status.appendChild(card)
			}

		})
	}
}