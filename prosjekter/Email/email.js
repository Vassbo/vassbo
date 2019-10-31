// Created by SaddleSneeze

$(function(){

    function email(addr, subj, body){
    subj=subj.replace(/\s/g, "%20");
    body=body.replace(/\s/g, "%20");
    var link = "mailto:" + addr + "?subject=" + subj + "&body=" + body;
    return link;
}
    
    $("#sendEmail").click(function(){
        var addr = $("#addr").val();
        var subj = $("#subj").val();
        var body = $("#ebody").val();
        var mail = email(addr, subj, body);
        window.open(mail);
    });
});