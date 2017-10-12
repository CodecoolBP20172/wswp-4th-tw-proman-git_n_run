    modalHandler = {
    	initModal: function() {
    		$("#modal_error_message").html();
    		$('#modal_input_value').val("")
            $('#modal_input_value').attr("placeholder", "");
    		modalHandler.modal.style.display = "block"

    		modalHandler.exitSpan.onclick = function() {
    				modalHandler.modal.style.display = "none";
    			},
    		window.onclick = function(event) {
    		if (event.target == modalHandler.modal) {
    			modalHandler.modal.style.display = "none";
    		    }
    		}
    	},


    	modal: document.getElementById('modal'),

    	exitSpan: document.getElementsByClassName("jsclose")[0],

    	openAddBoardModal: function() {
    		this.initModal()
    		var button = document.getElementById("modal_input_button")
    		button.innerHTML = "Create Board"
    		button.onclick = function() {
    			var string_from_input = $('#modal_input_value').val()
    			if (/\S/.test(string_from_input)) {
    				modalHandler.modal.style.display = "none"
    				dom.addBoard(string_from_input)
    			} else {
    				$("#modal_error_message").html("The card must have a name")
    			}
    		}
    	},


    	openAddCardModal: function(boardId) {
    		this.initModal()
    		var button = document.getElementById("modal_input_button")
    		button.innerHTML = "Create Task"
    		button.onclick = function() {
    			var string_from_input = $('#modal_input_value').val()
    			if (/\S/.test(string_from_input)) {
    				modalHandler.modal.style.display = "none"
    				dom.addNewCard(boardId, string_from_input)
    			} else {
    				$("#modal_error_message").html("The board must have a name")
    			}
    		}
    	},


    	openEditCardModal: function(cardId, cardBoardId) {
    		this.initModal()
    		var default_card_name = $(`#${cardId}`).html()
    		$('#modal_input_value').attr("placeholder", default_card_name); //change to to val() if others agreee !!!!!
    		var button = document.getElementById("modal_input_button")
    		button.innerHTML = "Edit"
    		button.onclick = function() {
    			var string_from_input = $('#modal_input_value').val()
    			if (/\S/.test(string_from_input)) {
    				modalHandler.modal.style.display = "none"
    				dom.editCard(cardId, cardBoardId, string_from_input)
    			} else {
    				$("#modal_error_message").html("The card must have a name")
    			}
    		}
    	}

    }