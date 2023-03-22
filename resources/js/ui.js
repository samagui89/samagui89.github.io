const ui = {
    init : function(){
        const _this = this,
            _tagHtml = document.getElementsByTagName("html");

        // 공통페이지 Include
        /* Array.prototype.forEach.call(allElements, function(el) {
            let importUrl = el.dataset.importUrl;
            if (importUrl) {    // Html Include
                _this.includeFuc.init(el, importUrl);
            };
        }); */

        // init evt
        //  _this.early(_tagHtml);
    },
    includeFuc : {
        /* 공통페이지 Include */
        init : function(el, importUrl){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', importUrl, true);
            xhttp.send();
        }
    },
    early : function(_tagHtml){
        let _this = this,
            _st = 0,
            sth = 0,
            sct = 0;

        // 초기화
        _st = document.getElementsByClassName("content"),
        sth = Math.ceil((document.getElementsByClassName("selected_section")[0].offsetHeight - window.innerHeight) / 100);
        _st[0].style.transform = "translate3d(0px, 0px, 0px)";
        
        // 스크롤 이벤트
        _tagHtml[0].addEventListener("wheel", (event) => {
            if( Math.sign(event.deltaY) > 0 && sct < sth ){
                sct ++;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            }else if ( Math.sign(event.deltaY) < 0 && sct > 0 ){
                sct --;
                _st[0].style.transform = "translate3d(0px, "+ sct * -100 +"px, 0px)";
            };
        });
    },
    navClick : {
        init : function(_this, _val){
            let _ae = document.getElementsByClassName("selected"),
                _se = document.querySelectorAll("[data-section='" +_val+ "']"),
                _te = document.getElementsByClassName("selected_section"),
                op = 0,
                iId = 0;

            iId = setInterval( function(){
                op = Number(window.getComputedStyle(_te[0]).getPropertyValue("opacity"));
                if(op>0){
                    op = op-0.1;
                    _te[0].style.opacity=op;
                } else {
                    clearInterval(iId);
                    _te[0].classList.remove('selected_section');
                    _se[0].classList.add('selected_section');
                    
                    document.getElementsByClassName(_val)[0].scrollTo(0, 0);
                    //ui.init();
                    setTimeout(function(){
                        iId = setInterval( function(){
                            op = Number(window.getComputedStyle(_se[0]).getPropertyValue("opacity"));
                            if(op<1){
                                op = op+0.1;
                                _se[0].style.opacity=op;
                            } else {
                                clearInterval(iId);
                            };
                        }, 50);

                    }, 500);
                }
            }, 50);
            

            _ae[0].classList.remove("selected");
            _this.parentElement.classList.add("selected");

        }
    }
};


document.addEventListener("DOMContentLoaded", function(){
    ui.init();

});

let currentValue = 0;
function handleClick(myRadio) {
    currentValue = myRadio.value;
    "2" === currentValue
    ? (
        document.getElementsByClassName("wrapper")[0].classList.add("is_dark"),
        document.documentElement.style.setProperty("--basic-bg", "rgba(0, 0, 0, .7)"),
        document.documentElement.style.setProperty("--bg-gradient", "linear-gradient(235deg, #0d1461, #111111, #5f2f05, #087272, #630563)"),
        document.documentElement.style.setProperty("--c333", "#dddddd"),
        document.documentElement.style.setProperty("--c666", "#bbbbbb"),
        document.documentElement.style.setProperty("--c999", "#aaaaaa"),
        document.documentElement.style.setProperty("--cccc", "#444444")
    )
    : (
        document.getElementsByClassName("wrapper")[0].classList.remove("is_dark"),
        document.documentElement.style.setProperty("--basic-bg", "rgba(230, 230, 230, .7)"),
        document.documentElement.style.setProperty("--bg-gradient", "linear-gradient(235deg, #fffcdc, #eeeeee, #e3f2ff, #ffe3e3, #e3ffe3)"),
        document.documentElement.style.setProperty("--c333", "#333333"),
        document.documentElement.style.setProperty("--c666", "#666666"),
        document.documentElement.style.setProperty("--c999", "#999999"),
        document.documentElement.style.setProperty("--cccc", "#cccccc")
    )
}

window.onload = function() {
 
    let request;
    let el = document.getElementById("projectsList");
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest;
    } else {
        request = new ActiveXObject("microsoft.XMLHTTP");
    }

    request.open("GET","/career/include/project.xml");
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
        
            if (request.status >= 200 && request.status < 300) {
                let xml = request.responseXML;
                
                let ns = xml.getElementsByTagName("name"),
                    ds = xml.getElementsByTagName("date"),
                    pcs = xml.getElementsByTagName("pcurl"),
                    mos = xml.getElementsByTagName("mourl"),
                    ss = xml.getElementsByTagName("skill");
                let t = document.createElement("dl");
                for (let i = 0; i < ns.length; i++) {
                    let name = ns[i].childNodes[0].nodeValue,
                        date = ds[i].childNodes[0].nodeValue,
                        pcurl = pcs[i].childNodes[0].nodeValue,
                        mourl = mos[i].childNodes[0].nodeValue,
                        skill = ss[i].childNodes[0].nodeValue;
                    if( pcs[i].childNodes[0].nodeValue != 'null' && mos[i].childNodes[0].nodeValue != 'null' ){
                        t.innerHTML += "<dt>"+name+"<a href='"+pcurl+"' class='line_site' target='_blank'><i class='ico_pc'></i><span class='blind'>PC사이트</span></a><a href='"+mourl+"' class='line_site' target='_blank'><i class='ico_mo'></i><span class='blind'>Mobile사이트</span></a></dt><dd><ul><li class='date'>"+date+"</li><li>"+skill+"</li></ul></dd>";
                    } else if( pcs[i].childNodes[0].nodeValue != 'null' ){ 
                        t.innerHTML += "<dt>"+name+"<a href='"+pcurl+"' class='line_site' target='_blank'><i class='ico_pc'></i><span class='blind'>PC사이트</span></a></dt><dd><ul><li class='date'>"+date+"</li><li>"+skill+"</li></ul></dd>";
                    } else if( mos[i].childNodes[0].nodeValue != 'null' ){ 
                        t.innerHTML += "<dt>"+name+"<a href='"+mourl+"' class='line_site' target='_blank'><i class='ico_mo'></i><span class='blind'>Mobile사이트</span></a></dt><dd><ul><li class='date'>"+date+"</li><li>"+pcurl+"</li><li>"+skill+"</li></ul></dd>";
                    } else {
                        t.innerHTML += "<dt>"+name+"</dt><dd><ul><li class='date'>"+date+"</li><li>"+skill+"</li></ul></dd>";
                    }
                    
                }

                el.append(t);
            } else {
                alert(request.status);
            }
        }
    };

    //loading close
    
    setTimeout(function(){
        document.getElementsByClassName("loading_box")[0].classList.add('close');
        setTimeout(function(){
            document.getElementsByClassName("loading_box")[0].remove();
        }, 1500);
    }, 1000);
};
