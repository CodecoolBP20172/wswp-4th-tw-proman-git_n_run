drag_and_drop = {
    allowDrop: function(ev) {
    ev.preventDefault();
    },

    drag: function(ev) {
        ev.dataTransfer.setData("cardId", ev.target.id);
    },

    drop: function(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("cardId");
        dom.showBoards();
        if (dom.droppedOnCard === false) {
            dom.showCards(dataHandler.changeCardStatus(ev.target.id, data));
        }
        else {
            dom.droppedOnCard = false
            dom.showCards(dataHandler.getCard(parseInt(data)).board_id)
        }
    },    
    doNothing: function(ev) {
        dom.droppedOnCard = true;
    },
    }