//MUST BE IN SERVER.py

def extract_form():                         //ajax data formatter   
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]

    return form_dict
//---------------------------------------------------


function sendajax(){                    //sending data to server.py
$.ajax({ 
    url: '/displayajax',                //function route to give the data to
    type: 'POST',                       //methods =['POST'] must be added to the function in the server.py
    data: {                             //data must be an object a json format object
        'title': $( '#data' ).val(),    //getting input field value
        'user': 'kocka'                 //giving static information
    },
    success: function(){                //on success function
        console.log("dataSend")
    }
})
}

//IN PYTHON---------------------------------------------------------
def getajaxobject():                    //getting the data that was sent from the javascript ajax function
    newdict = extract_form()            // saving it to a variable
    query.editcard(newdict['id'], newdict['title'])         //running an example query function with it's values
//---------------------------------------------------------

function getajax(){                     //getting data from the server.py
    $.ajax({                            
    url: '/getcards',                   //function url that is sending the data
    type: 'GET', 
    success : function(data){           //whatever you want to do with the data, it must be placed inside this function(asyncron problem)
        console.log(data)               //data is stored in a list of objects(in theory..xd)
    }
})
}
//IN Python----------------------------------------------------------------
@app.route("/sendtojavascript")           
def getajax():
    allcard = query.getcards()         //getting a dictionary with psycopg2 function
    return jsonify(allcard)            //returning a jsonified version of the query
//---------------------------------------------------------------------