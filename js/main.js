//carroussel 
$(".owl-carousel").owlCarousel({
	loop:true,
    margin:10,
    dots: true,
    items: 1
});

//formulaire 
$(".container").find("form").validate({
	rules: {
		email: {
	      required: true,
	      email: true
	    },
	    name: {
	      required: true
	    },
	    description: {
	      required: true,
	      maxlength: 50
	    },
	    pic: {
	      required: true,
	      url: true
	    }
	},
    messages: {
	    email: {
	      required: "Veuillez entrer votre email",
	      email:"Veuillez entrer votre email"
	    },
	    name: {
	      required: "Veuillez entrer votre nom"
	    },
	    description: {
	      required: "Veuillez entrer une description",
	      maxlength: "ça doit faire max 50 caractères"
	    },
	    pic: {
	      required: "Veuillez entrer quelque chose",
	      url: "Veuillez entrer une URL"
	    }
	}
});
// scrooltop
	$('.smooth').click(function(){
		var attribut = $(this).attr("href");
    if(attribut == "#"){
        var $duration = $(this).data("duration");
        $('html, body').animate( 
            { 
                scrollTop: $("body").offset().top
            }, $duration );
        return false;
    }
    else{
        $('html, body').animate( 
            { 
                scrollTop: $(attribut).offset().top - 50
            }, "slow" );
        return false;
    }
});
//animations au scroll
$(document).scroll(function () {
  	var scrollTop = $(document).scrollTop();
    $(".content-section").each(function(){
    	if(scrollTop > $(this).offset().top - 300){
      	$(this).find("div[data-content-type='text']").fadeIn();
		$(this).find("div[data-content-type='image']").delay("500").fadeIn();
      }
    });
 
}); 
// list chatons + vote
  var sourceKit = $("#templateKit").html();
  var templateKit = Handlebars.compile(sourceKit);
  function success(data){

  		$("#vote").on("click", ".btn", function(){
            
            var thisVote = $(this);
            
            function success2(data){
                swal({
                  title: "Top",
                  text: data.message + " " + data.details,
                  type: "success"
                });
                $("#vote .btn").attr("disabled", true);
                $(thisVote).closest(".kitten").addClass("selected");
            } 
            
            function error(data){
                swal({
                  title: "Wrong",
                  text: data.responseJSON.message + " " + data.responseJSON.details,
                  type: "error"
                });
                $("#vote .btn").attr("disabled", true);
            } 
        
            $.post("https://kittenweekapi-nbwns.c9users.io/api/vote",
                   {
                    kittenname: $(thisVote).closest(".kitten").data("id"),
                    username: "Nicolas"
                   })
              .done(success2)
              .fail(error);
            return false;
        });
        var html = templateKit(data);
		$("#vote").append(html);
		
  	}

    function erreur(){$("#vote").append("Erreur, impossible de charger les chatons");} 
    function always(){$("#kitten-loader").hide();}
    $.getJSON("https://kittenweekapi-nbwns.c9users.io/api/kittens",{})

    .done(success)
    .fail(erreur)
    .always(always);
