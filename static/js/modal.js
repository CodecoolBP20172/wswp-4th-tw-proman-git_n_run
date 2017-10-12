    modalHandler = {
        initModal : function(){
            console.log("hekas")
            $( "#error_message" ).html();
            $( '#input_value' ).val("")
            modalHandler.modal.style.display = "block"

        // When the user clicks on the button, open the modal 

        // When the user clicks on <exitSpan> (x), close the modal
            modalHandler.exitSpan.onclick = function() {
                modalHandler.modal.style.display = "none";
                },

        // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modalHandler.modal) {
                modalHandler.modal.style.display = "none";
                    }
                }
            },

        modal : document.getElementById('myModal'),
        exitSpan : document.getElementsByClassName("jsclose")[0],
        
        openAddBoardModal : function(){
            this.initModal()
            document.getElementById("modal_input_button").onclick = function(){
                console.log("hello")
                var string_from_input = $( '#input_value' ).val()
                if (/\S/.test(string_from_input)){
                    modalHandler.modal.style.display = "none"
                    dom.addBoard(string_from_input)
                }else{
                    $( "#error_message" ).html("The card must have a name")
                }
            }
        },
        openAddCardModal : function(boardId){
            this.initModal()
            document.getElementById("modal_input_button").onclick = function(){
                console.log("hello")
                var string_from_input = $('#input_value' ).val()
                if (/\S/.test(string_from_input)){
                    modalHandler.modal.style.display = "none"
                    dom.addNewCard(boardId, string_from_input)
                }else{
                    $( "#error_message" ).html("The card must have a name")
                }
            }
        }

    }