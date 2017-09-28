// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this.data' below)
dataHandler = {
    data: {}, // it contains the boards and their cards and statuses
    loadTestData: function() {
        localStorage.setItem('data', JSON.stringify(sampleData));
        // uses sampleData from sample_data.js and puts it into the local storage
        // it should be called only once on a test environment
        // To use you have to import the sample_data.js file above this file in your html
    },

    loadData: function() {
        return this.data = JSON.parse(localStorage.getItem('data'))
        // loads data from local storage to this.data property
        // this.data = ...
    },
    
    saveData: function() {
        localStorage.setItem('data', JSON.stringify(this.data))
    },

    getBoards: function() {
        this.loadData()
        return this.data.boards;
        // returns the boards from this.data
    },
    getBoard: function(boardId) {
        this.loadData()
        for (var i = 0;i < this.getBoards().length; i++){
            if (this.getBoards()[i].id == boardId){ 
                return this.getBoards()[i];
        }
        }
        // returns the board with the given id from this.data
    },

    getStatuses: function() {
        this.loadData()
        return this.data.states;
        // returns the statuses from this.data
    },
    
    getStatus: function(statusId) {
        for (var i = 0; i < this.getStatuses().length; i++){
            if(this.getStatuses()[i].id === statusId){
                return this.getStatuses()[i];
            }
        }
        // returns the status with the given id from this.data
    },

    getCardsByBoardId: function(boardId) {
        this.loadData();
        var cardList = []
        for (var i = 0; i < this.data.cards.length; i++){
            if (this.data.cards[i].board_id === boardId){
                cardList.push(this.data.cards[i])
            }
        }
        return cardList
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
        this.loadData();
        var maximumId = 0
        for (var i = 0; i < this.data.boards.length; i++){
            console.log(this.data.boards[i])
            if(this.data.boards[i].id > maximumId){
                maximumId = this.data.boards[i].id
            }
        }
        this.data.boards.push({
            'id': maximumId + 1,
            'title':boardTitle
        });
        this.saveData();
        // creates new board, saves it and returns its id
    },
    createNewCard: function(cardTitle, boardId, statusId) {
        this.loadData();
        var maximumId
        for (var i = 0; i < this.data.cards.length; i++){
            if(this.data.cards[i].id > maximumId){
                maximumId = this.data.boards[i].id
            }
        }
        this.data.cards.push({
            'board_id': boardId,
            'id': maximumId,
            'status_id':statusId,
            'title':cardTitle
        });
        this.saveData();
        // creates new board, saves it and returns its id
    },
        // creates new card for the given board, saves it and returns its id
        editCardTitle: function(cardID, newCardTitle) {
            this.loadData();
            for (var i = 0; i <this.data.cards.length; i++){
                if (this.data.cards[i].id === cardID) {
                    this.data.cards[i].title = newCardTitle;
                }
            }
            this.saveData();
            // edits the title of the card
            }
    }
    // here comes more features
