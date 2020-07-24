function highlight(){
    document.querySelectorAll('pre code').forEach((x)=>{
        x.innerHTML=x.innerHTML.trim();
        var lang=x.classList[0],len=x.innerText.length;
        try{lang=lang.split('-'),lang=lang[lang.length-1];}
        catch{lang='text';}
        hljs.highlightBlock(x);
        var nb=document.createElement("code"),str="",tot=x.innerText.split('\n').length;
        for(var i=1;i<=tot;++i)str+=i+'\n';
        nb.classList.add("hljs","hljs-nb");
        nb.style.float="left";
        nb.innerText=str;
        x.parentElement.insertBefore(nb,x);

        var bar=document.createElement('div'),
            cb=document.createElement("div"),
            fd=document.createElement("div");
        cb.classList.add("hljs-cb");
        cb.setAttribute("data-title",'复制');
        cb.addEventListener("click",function(){
            copy(this.parentElement.parentElement.innerText);
            this.setAttribute('data-title','复制成功');
            setTimeout(function(it){it.setAttribute('data-title','复制');},1000,this);
            mdui.snackbar({message: "复制成功!",position: "top"});
        });

        fd.classList.add("hljs-fd");
        fd.setAttribute("data-title",'折叠');
        fd.addEventListener("click",function(){
            this.parentElement.parentElement.parentElement.hidden=1;
            this.parentElement.parentElement.parentElement.previousElementSibling.hidden=0;
        });
        var hl=document.createElement('div');
        hl.classList.add('hljs-lang');
        hl.setAttribute('data-title',lang);
        bar.classList.add("hljs-bar");
        bar.append(hl),bar.append(fd),bar.append(cb);
        x.append(bar);
        var fd_=document.createElement("div"),
            fd_ufd=document.createElement("div"),
            fd_hl=document.createElement('div'),
            fd_hle=document.createElement('div');
        fd_.hidden=1;
        fd_.addEventListener("click",function(){
            this.hidden=1;
            this.nextElementSibling.hidden=0;
        });
 
        fd_ufd.classList.add("hljs-fd");
        fd_ufd.setAttribute("data-title",'展开');
        fd_ufd.classList.add("hljs-fd");
        fd_hl.classList.add('hljs-lang');
        fd_hl.setAttribute('data-title',lang);
        fd_hle.classList.add('hljs-len');
        fd_hle.setAttribute('data-title',len);
        fd_.append(fd_hl),fd_.append(fd_hle),fd_.append(fd_ufd);
        x.parentElement.parentElement.insertBefore(fd_,x.parentElement);
    });
    var sty=document.createElement("style");
    sty.type="text/css",
    sty.innerHTML=[
        ".hljs{position:relative;}",
        ".hljs-bar{display:none;width:fit-content;position:absolute;top:0;right:0;}",
        ".hljs:hover .hljs-bar{display:block;}",
        ".hljs-cb,.hljs-fd,.hljs-lang,.hljs-len{",
            "display: inline-block;",
            "width: fit-content;",
            "color: #fff;",
            "padding: 2px 5px;",
            "cursor: pointer;",
        "}", 
        ".hljs-cb{","background-color: #F7A4B9;","}",
        ".hljs-fd{","background-color: #66ccff;","}",
        ".hljs-lang{","background-color: #39c5bb;","}",
        ".hljs-len{","background-color: #f7a4b9;","}",
        ".hljs-fd:after,.hljs-cb:after,.hljs-lang:after,.hljs-len:after{","content: attr(data-title)","}",
        ".hljs-nb{color: #bbb !important;}"
    ].join("");
    document.getElementsByTagName("head")[0].appendChild(sty);
}

var code=document.getElementById("code"),
    render=document.getElementById("render"),
    slide=document.getElementById("slide");
code.style.height=render.style.height=window.innerHeight+'px';
var editor,md=document.getElementById('markdown');
var changed=0,wait=200,autogen=1;
function gen(){
    var inline_math=/\$([\s\S]+?)\$(?!\])/g,
        block_math=/\$\$([\s\S]+?)\$\$(?!\])/g;
    md.innerHTML=marked(
        editor.getValue()
            .replace(block_math,function(x){return katex.renderToString(x.substring(2,x.length-2),{displayMode:true,throwOnError: true});})
            .replace(inline_math,function(x){return katex.renderToString(x.substring(1,x.length-1),{throwOnError: true});})
    );
    highlight();
    changed=0;
}
function watch(){
    if(!autogen)return;
    if(changed)try{gen();}catch(e){console.log(e);}
    setTimeout(watch,wait);
}
require.config({paths:{'vs':'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs'}});
require(['vs/editor/editor.main'],function(){
	editor=monaco.editor.create(document.getElementById('code'),{
		value:[].join('\n'),
        language: 'markdown',
        theme:'vs',
        automaticLayout: true
	});
    editor.onDidChangeModelContent(function(e){changed=1;});
    editor.setValue("## Markdown Editor by zcmimi");
});

watch();

slide.onmousedown=function(e){
    changed=0;
    document.onmousemove=function(e){
        code.style.width=e.clientX+'px';
    }
}
document.onmouseup=function(e){
    document.onmousemove=null;
}

async function setCodeTheme(str){
    fetch('/code-themes/'+str+'.json')
        .then(data=>data.json())
        .then(data=>{
            monaco.editor.defineTheme('monokai',data);
            monaco.editor.setTheme('monokai');
        })
}

function setMdTheme(str){
    document.getElementById("md-theme").href="md-themes/"+str+'.css';
}

function setMdCodeTheme(str){
    document.getElementById("md-code-theme").href=
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/"+str+'.min.css';
}