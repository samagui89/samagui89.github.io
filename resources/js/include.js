let include = {
    comHead : function(){
        document.write('<meta charset="UTF-8">');
        document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
        document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        document.write('<title>Pick Me!</title>');
    },
    comStyle : function(){
        document.write('<link rel="stylesheet" href="/resources/css/import.css"></link>');
    },
    comJs : function(){
        document.write('<script src="/resources/js/jquery-3.6.0.slim.min.js"></script>');
        document.write('<script src="/resources/js/lib/ytPlayer.js"></script>');
        document.write('<script src="/resources/js/lib/particles.js"></script>');
        document.write('<script src="/resources/js/ui.js"></script>');
    },
    endJS : function(){
        document.write('<script src="/resources/js/lib/app.js"></script>');
    }
}