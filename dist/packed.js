var aside="";onload=function(){for(j=15;0<j;j--){for(aside+="<main>",i=50;0<i;i--){var a=Math.sin(i*Math.random()*5)*i*20*j-1e4,e=(1e3+Math.sin(j*i/5))*Math.sqrt(j/2);aside+='<aside style="animation:aside '+e+"ms ease-in "+a+'ms infinite alternate"></aside>'}aside+="</main>"}document.body.innerHTML=aside+"<style>@keyframes aside{0%{transform:scaleX(3) rotate(-20deg)}100%{transform:scaleX(4) translateY(4vh) rotate(20deg)}}body{filter:blur(5px);overflow:hidden;margin:50vh -9vw}html{background:linear-gradient(#146190 0,#cddee8 50%,#5aade4 50%,#025892 100%);filter:contrast(150%);height:100vh}aside{background:linear-gradient(#5aade4,#87c1e8);border-radius:50%;float:right;height:60%;width:5%;margin:0 -1%;opacity:.3}aside,main{height:3.3vh}main:nth-child(odd) aside{float:left}"};