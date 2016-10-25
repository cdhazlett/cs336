// CS336 Lab 7 by Christiaan Hazlett (cdh24)
$(document).ready(function(){
  $('body').append("<p id='dynamicP'>This paragraph was added dynamically.  There is no data yet.</p>");
  $('#dynamicP').hide();
  $('#dynamicP').show("slow");

  $('#getDataButton').click(function(){
    $.ajax({url: "/fetch?data={\"message\":\"Hello, AJAX world!\"}", success: function(result){
        var res = JSON.parse(result);
        $("#dynamicP").hide();
        $("#dynamicP").html(res.message);
        $('#dynamicP').show("slow");
      }});
  });

});
