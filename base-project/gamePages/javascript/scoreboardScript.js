//e refers to the event object 
$("#startOverBtn").click(function(e){
    //cancel brings you back to the normal page (i.e. null), while confirm will call a PHP script using JQuery Ajax and delete the database
    return Alt.alternative({status:'question',showConfirmButton:true,showCancelButton: true,stop:true,title:'Are You Sure?',text:"Pressing OKAY will DELETE ALL TEAMS ANSWERS"}).then((res) => 
    {Alt.alternative({status:'loading'}); 
    if(res){
        callDeleteTable();
    }
    else{
        null;
    }});
});

//Deletes the users current game files. NOTE do not set datatype to json as it will result in an error as we
//are not return any json files from the php.
//Success - go back to main page, Error - reload current page 
function callDeleteTable(){
    jQuery.ajax({
        type: "POST",
        url: '../php/deleteTable.php',        
        data: {function2call: 'deleteTable'},
        success: function(){setTimeout(() => {Alt.alternative({status:'success', title:"Answers Deleted Successfully"}).then((res) => {mainPageRedir();})},1000)},
        error: function(){setTimeout(() => {Alt.alternative({status:'error', title:"Answers Failed to be Deleted", text:"Please submit a bug to ozman99mail@gmail.com"}).then((res) => {reloadPage();})},1000)}
    });
}

//Takes the user back to the main page once they hit okay
function mainPageRedir(){
    window.location.replace("../../index.html");
}

//Refreshes the page - current fix for broken button
function reloadPage(){
    //location.reload();
    //currently just redirect to main page too
    window.location.replace("../../index.html");
}