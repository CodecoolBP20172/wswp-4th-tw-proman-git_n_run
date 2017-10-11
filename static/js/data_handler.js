// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this.data' below)
dataHandler = {
    data: {}, // it contains the boards and their cards and statuses

    getBoards: function(callback) {
        $.ajax({                            
        url: "/get-boards",                  
        dataType : "json",
        type: "GET",
        success : function(boards){
            callback(boards)
        }
    })
    },
    getCardsByBoardId: function(boardId, callback) {
            $.ajax({                            
            url: `/get-cards-by-board-id/${boardId}`,                  
            dataType : "json",
            type: "GET",
            success : function(cardList){
                callback(cardList)
                }
            })
        // returns the cards from this.data which has the given board id
        },

    getCard: function(cardId) {
        this.loadData();
        for (var i = 0; i < this.data.cards.length; i++){
            if (this.data.cards[i].id === cardId){
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
            data :{
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
            }
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
    
        changeCardStatus: function(boardId, cardId){            
            this.loadData();
            var cardToChange = this.getCard(parseInt(cardId));
            cardToChange.status_id = parseInt(boardId.slice(-1));
            this.saveData();
            return cardToChange.board_id
        }
    }
    // here comes more features
