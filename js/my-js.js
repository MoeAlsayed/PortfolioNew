var text=document.querySelector(".text");
document.addEventListener("scroll",function(){
 if(document.body.scrollTop>100 ||document.documentElement.scrollTop>100){
    text.classList.remove("hidden");
    }else{
      text.classList.add("hidden");
    }
      // text.classList.remove("hidden");
   
})

/* $(function () {
    var text = $(".logo");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            text.removeClass("logo");
        } else {
            text.addClass("logo");
        }
    });
}); */