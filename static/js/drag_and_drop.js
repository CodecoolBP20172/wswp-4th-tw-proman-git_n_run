drag_and_drop = {
    allowDrop: function(ev) {
    ev.preventDefault();
    },

    drag: function(ev) {
        ev.dataTransfer.setData("cardId", ev.target.id);
    },

    drop: function(ev) {
        ev.preventDefault();
        var cardId = ev.dataTransfer.getData("cardId");
        if (ev.target.id.includes("status_id") === true ) {
            dataHandler.changeCardStatus(ev.target.id, cardId);
        }
        //else {
        //    dom.droppedOnCard = false
        //    dom.showCards(dataHandler.getCard(parseInt(cardId)).board_id)
        //}
    },    
    doNothing: function(ev) {
        dom.droppedOnCard = true;
    },
    }