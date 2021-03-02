var page=1;
getList();
$("#btnPre").on("click", function(){
    page--;
    getList();
});
$("#btnNext").on("click", function(){
    page++;
    getList();
});

$("#txtQuery").on("keydown",function(e){
    page=1;
    if(e.keyCode==13){
        getList();
    }
});
$("#btnSearch").on("click",function(){
    page=1;
    getList();
});
$("#selSize").on("change",function(){
    page=1;
    getList();
});

function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({
        type:"get",
        url:url,
        headers:{"Authorization":"KakaoAK f6642672b17ab5702ad7ec92cbc0ed4f"},
        data:{"query":query, "size":size, "page":page},
        dataType:"json",
        success:function(data){
            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data));
            
             var lastPage=Math.ceil(data.meta.pageable_count/size);
             $("#spanPage").html(page+"/"+lastPage);
             if(page==1){
            $("#btnPre").attr("disabled",true);
             }else{
            $("#btnPre").attr("disabled",false);
             }
             if(page==lastPage){
            $("#btnNext").attr("disabled",true);
             }else{
            $("#btnNext").attr("disabled",false);
             }
        }
    });
}