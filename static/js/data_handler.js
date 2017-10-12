// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this.data' below)
dataHandler = {

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
    sendLogin: function(){                    //sending data to server.py
        $.ajax({ 
            url: '/login',                //function route to give the data to
            type: 'POST',                       //methods =['POST'] must be added to the function in the server.py
            data: {                             //data must be an object a json format object
                'username': $( '#username_input' ).val(),    //getting input field value
                'password': $( '#password_input' ).val(),                 //giving static information
            },
            success: function(returnValue){                //on success function
                window.location.href = returnValue;
            }
        })
    },
    sendRegister: function(){                    //sending data to server.py
        $.ajax({ 
            url: '/register',                //function route to give the data to
            type: 'POST',                       //methods =['POST'] must be added to the function in the server.py
            data: {                             //data must be an object a json format object
                'username': $( '#create_username_input' ).val(),    //getting input field value
                'password': $( '#create_password_input' ).val(),                 //giving static information
            },
            success: function(returnValue){                //on success function
                window.location.href = returnValue;
            }
        })
    },
  
    changeCardStatus: function(statusId, cardId){     
        $.ajax({
            url: '/update-card-status',
            dataType: 'json',
            type: "POST",
            data: {
                'id': cardId,
                'status_id': parseInt(statusId.slice(-1))
            },
            success: function(){
                var card = document.getElementById(cardId)
                var status = document.getElementById(statusId)
                status.appendChild(card)
            }
        })        
    }
}
