/**
 * Created by Chetan Munegowda on 6/13/2015.
 */
$(document).ready(function(){

    $("#alertMsg").slideUp();

    $('#connectmeLogin').submit(function(event){

        event.preventDefault();
        //var loginScreen = $(this);

        var user = $("#username").val();
        var password = $("#pwd").val();

        var lib = new AcisionSDK("kjn0b0UY3zaZ", {
            onConnected: function() {
                $("#cmLoginForm").slideUp();
                $("#cmApp").slideDown("slow");
            },
            onAuthFailure: function() {
                $("#alertMsg").slideDown();
                $("#alertMsg").text("Warning!. Invalid username or password!");
                console.warn("Invalid username or password!");
            }
        }, {
            username: user,
            password: password
        });
    })


    $("#cmApp").on("click","button", function(){
        event.preventDefault();
        $("#cmApp").slideUp("fast");
        $("#cmLoginForm").slideUp();
        $("#enterUserName").slideDown();
    });


    $("#enterUserName").on("click","button",function(event){
        event.preventDefault();
        $("#enterUserName").slideUp();
        $("#cmLoginForm").slideUp();
        $("#cmApp").slideUp("fast");
        $("#chatContainer").show();

    });

});


