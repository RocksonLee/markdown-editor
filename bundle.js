var code=document.getElementById("code"),
    render=document.getElementById("render"),
    slide=document.getElementById("slide");
code.style.height=render.style.height=window.innerHeight+'px';
var editor,md=document.getElementById('markdown');
var changed=0,AutoGenWait=200,AutoGen=1;
function gen(){
    var inline_math=/\$([\s\S]+?)\$(?!\])/g,
        block_math=/\$\$([\s\S]+?)\$\$(?!\])/g;
    md.innerHTML=marked(
        editor.getValue()
            .replace(block_math,function(x){return katex.renderToString(x.substring(2,x.length-2),{displayMode:true,throwOnError: true});})
            .replace(inline_math,function(x){return katex.renderToString(x.substring(1,x.length-1),{throwOnError: true});})
    );
    document.querySelectorAll('pre code').forEach((x)=>{hljs.highlightBlock(x);});
    changed=0;
}
function watch(){
    if(changed&&AutoGen)try{gen();}catch(e){console.log(e);}
    setTimeout(watch,AutoGenWait);
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
    if(getCookie('last modify'))editor.setValue(getCookie('last modify'));
    else editor.setValue("## Markdown Editor by zcmimi");

    get_code_theme();
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

var drawer_btn=document.getElementById("drawer_toggle"),
    drawer_content=document.getElementById("drawer_content");
function drawer_toggle(){drawer_content.hidden^=1;}
drawer_btn.onclick=drawer_toggle;


var code_theme_list={"active4d":"code-themes/Active4D.json","all-hallows-eve":"code-themes/All Hallows Eve.json","amy":"code-themes/Amy.json","birds-of-paradise":"code-themes/Birds of Paradise.json","blackboard":"code-themes/Blackboard.json","brilliance-black":"code-themes/Brilliance Black.json","brilliance-dull":"code-themes/Brilliance Dull.json","chrome-devtools":"code-themes/Chrome DevTools.json","clouds-midnight":"code-themes/Clouds Midnight.json","clouds":"code-themes/Clouds.json","cobalt":"code-themes/Cobalt.json","dawn":"code-themes/Dawn.json","dreamweaver":"code-themes/Dreamweaver.json","eiffel":"code-themes/Eiffel.json","espresso-libre":"code-themes/Espresso Libre.json","github":"code-themes/GitHub.json","idle":"code-themes/IDLE.json","katzenmilch":"code-themes/Katzenmilch.json","kuroir-theme":"code-themes/Kuroir Theme.json","lazy":"code-themes/LAZY.json","magicwb--amiga-":"code-themes/MagicWB (Amiga).json","merbivore-soft":"code-themes/Merbivore Soft.json","merbivore":"code-themes/Merbivore.json","monokai-bright":"code-themes/Monokai Bright.json","monokai":"code-themes/Monokai.json","night-owl":"code-themes/Night Owl.json","oceanic-next":"code-themes/Oceanic Next.json","pastels-on-dark":"code-themes/Pastels on Dark.json","slush-and-poppies":"code-themes/Slush and Poppies.json","solarized-dark":"code-themes/Solarized-dark.json","solarized-light":"code-themes/Solarized-light.json","spacecadet":"code-themes/SpaceCadet.json","sunburst":"code-themes/Sunburst.json","textmate--mac-classic-":"code-themes/Textmate (Mac Classic).json","tomorrow-night-blue":"code-themes/Tomorrow-Night-Blue.json","tomorrow-night-bright":"code-themes/Tomorrow-Night-Bright.json","tomorrow-night-eighties":"code-themes/Tomorrow-Night-Eighties.json","tomorrow-night":"code-themes/Tomorrow-Night.json","tomorrow":"code-themes/Tomorrow.json","twilight":"code-themes/Twilight.json","upstream-sunburst":"code-themes/Upstream Sunburst.json","vibrant-ink":"code-themes/Vibrant Ink.json","xcode-default":"code-themes/Xcode_default.json","zenburnesque":"code-themes/Zenburnesque.json","iplastic":"code-themes/iPlastic.json","idlefingers":"code-themes/idleFingers.json","krtheme":"code-themes/krTheme.json","monoindustrial":"code-themes/monoindustrial.json"},
    md_theme_list={"github":"md-themes/github.css","markdown":"md-themes/markdown.css","modest":"md-themes/modest.css","retro":"md-themes/retro.css"},
    hl_theme_list={"a11y-dark":"a11y-dark.min.css","a11y-light":"a11y-light.min.css","agate":"agate.min.css","an-old-hope":"an-old-hope.min.css","androidstudio":"androidstudio.min.css","arduino-light":"arduino-light.min.css","arta":"arta.min.css","ascetic":"ascetic.min.css","atelier-cave-dark":"atelier-cave-dark.min.css","atelier-cave-light":"atelier-cave-light.min.css","atelier-dune-dark":"atelier-dune-dark.min.css","atelier-dune-light":"atelier-dune-light.min.css","atelier-estuary-dark":"atelier-estuary-dark.min.css","atelier-estuary-light":"atelier-estuary-light.min.css","atelier-forest-dark":"atelier-forest-dark.min.css","atelier-forest-light":"atelier-forest-light.min.css","atelier-heath-dark":"atelier-heath-dark.min.css","atelier-heath-light":"atelier-heath-light.min.css","atelier-lakeside-dark":"atelier-lakeside-dark.min.css","atelier-lakeside-light":"atelier-lakeside-light.min.css","atelier-plateau-dark":"atelier-plateau-dark.min.css","atelier-plateau-light":"atelier-plateau-light.min.css","atelier-savanna-dark":"atelier-savanna-dark.min.css","atelier-savanna-light":"atelier-savanna-light.min.css","atelier-seaside-dark":"atelier-seaside-dark.min.css","atelier-seaside-light":"atelier-seaside-light.min.css","atelier-sulphurpool-dark":"atelier-sulphurpool-dark.min.css","atelier-sulphurpool-light":"atelier-sulphurpool-light.min.css","atom-one-dark":"atom-one-dark.min.css","atom-one-dark-reasonable":"atom-one-dark-reasonable.min.css","atom-one-light":"atom-one-light.min.css","brown-paper":"brown-paper.min.css","codepen-embed":"codepen-embed.min.css","color-brewer":"color-brewer.min.css","darcula":"darcula.min.css","dark":"dark.min.css","default":"default.min.css","docco":"docco.min.css","dracula":"dracula.min.css","far":"far.min.css","foundation":"foundation.min.css","github":"github.min.css","github-gist":"github-gist.min.css","gml":"gml.min.css","googlecode":"googlecode.min.css","gradient-dark":"gradient-dark.min.css","grayscale":"grayscale.min.css","gruvbox-dark":"gruvbox-dark.min.css","gruvbox-light":"gruvbox-light.min.css","hopscotch":"hopscotch.min.css","hybrid":"hybrid.min.css","idea":"idea.min.css","ir-black":"ir-black.min.css","isbl-editor-dark":"isbl-editor-dark.min.css","isbl-editor-light":"isbl-editor-light.min.css","kimbie.dark":"kimbie.dark.min.css","kimbie.light":"kimbie.light.min.css","lightfair":"lightfair.min.css","lioshi":"lioshi.min.css","magula":"magula.min.css","mono-blue":"mono-blue.min.css","monokai":"monokai.min.css","monokai-sublime":"monokai-sublime.min.css","night-owl":"night-owl.min.css","nnfx":"nnfx.min.css","nnfx-dark":"nnfx-dark.min.css","nord":"nord.min.css","obsidian":"obsidian.min.css","ocean":"ocean.min.css","paraiso-dark":"paraiso-dark.min.css","paraiso-light":"paraiso-light.min.css","pojoaque":"pojoaque.min.css","purebasic":"purebasic.min.css","qtcreator_dark":"qtcreator_dark.min.css","qtcreator_light":"qtcreator_light.min.css","railscasts":"railscasts.min.css","rainbow":"rainbow.min.css","routeros":"routeros.min.css","school-book":"school-book.min.css","shades-of-purple":"shades-of-purple.min.css","solarized-dark":"solarized-dark.min.css","solarized-light":"solarized-light.min.css","srcery":"srcery.min.css","sunburst":"sunburst.min.css","tomorrow":"tomorrow.min.css","tomorrow-night":"tomorrow-night.min.css","tomorrow-night-blue":"tomorrow-night-blue.min.css","tomorrow-night-bright":"tomorrow-night-bright.min.css","tomorrow-night-eighties":"tomorrow-night-eighties.min.css","vs":"vs.min.css","vs2015":"vs2015.min.css","xcode":"xcode.min.css","xt256":"xt256.min.css","zenburn":"zenburn.min.css"}
function setMdTheme(str){document.getElementById("md-theme").href=str;}
function setMdCodeTheme(str){document.getElementById("md-code-theme").href=str;}

async function get_code_theme(){
    var code_theme=document.getElementById("code_theme");
    for(i in code_theme_list){
        var x=document.createElement("option");
        x.value=i;x.innerText=i;
        code_theme.append(x);
        await fetch(code_theme_list[i])
            .then(data=>data.json())
            .then(data=>{monaco.editor.defineTheme(i,data);})
    }
    code_theme.onchange=function(){monaco.editor.setTheme(this.value);};
}

function get_md_theme(){
    var md_theme=document.getElementById("md_theme");
    for(i in md_theme_list){
        var x=document.createElement("option");
        x.value=md_theme_list[i];
        x.innerText=i;
        if(i=="github")x.selected=1;
        md_theme.append(x);
    }
    md_theme.onchange=function(){document.getElementById("md-theme").href=this.value;};
}
get_md_theme();

function get_hl_theme(){
    var hl_theme=document.getElementById("hl_theme");
    for(i in hl_theme_list){
        var x=document.createElement("option");
        x.value="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/"+hl_theme_list[i];
        x.innerText=i;
        if(i=="github")x.selected=1;
        hl_theme.append(x);
    }
    hl_theme.onchange=function(){document.getElementById("hl-theme").href=this.value;};
}
get_hl_theme();

function getCookie(cname){
    var name=cname+"=",decodedCookie=decodeURIComponent(document.cookie),ca=decodedCookie.split(';'),c;
    for(i in ca){
        c=ca[i];
        while(c.charAt(0)==' ')c=c.substring(1);
        if(c.indexOf(name)==0)return c.substring(name.length, c.length);
    }return "";
}
function setCookie(cname,cval,exdays=0.5){
    if(getCookie(cname)==cval)return;
    var d=new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires="expires="+d.toUTCString();
    document.cookie=cname+"="+cval+";"+expires+";path=/";
}
var AutoSave=1,AutoSaveWait=20;
function save(){setCookie('last modify',editor.getValue(),5);}
function auto_save(){
    if(AutoSave)try{save();}catch{}
    setTimeout(auto_save,AutoSaveWait*1000);
}
auto_save();