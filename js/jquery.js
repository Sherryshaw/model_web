
$(function(){
    $(".route").click(function(){
        console.log($(this).attr("data-url"))
        window.location.href=$(this).attr("data-url");
    })
    $("#logout").click(function(){
        clearcookie();
        window.location.href="/index.html";
    })
    $("#file").change(function(){
                    console.log("file");
                    var f=this.files[0];
                    var formData=new FormData();
                    formData.append('image',f);
                    formData.append('key',"ceb2b750ad29b28d0aa95b791d543ff7");
                    
                    $.ajax({
                        url: 'https://api.imgbb.com/1/upload',
                        type: 'POST',
                        header: {
                            "Content-Type":"multipart/form-data",
                            "Access-Control-Allow-Origin": "*"
                        },
                        success: function(data){
                            $('.prv').attr("src",data.data.display_url);
                            console.log(data);
                        },
                        error: function(data){
                            console.log(data);
                        },
                        data:formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    });
                })
     
})