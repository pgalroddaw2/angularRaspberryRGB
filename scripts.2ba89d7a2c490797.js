var s=document.createElement("script");s.src="/socket.io/socket.io.js",document.querySelector("head").appendChild(s),window.addEventListener("load",function(){var o=0,d=!1,a=!1,c=!1;document.getElementById("redSlider").disabled=!1,document.getElementById("greenSlider").disabled=!1,document.getElementById("blueSlider").disabled=!1;var i=io(),t=w3color("rgb(0,0,0)"),g=document.getElementById("redSlider"),m=document.getElementById("greenSlider"),v=document.getElementById("blueSlider");function u(e,f){return Math.floor(Math.random()*(f-e)+e)}g.addEventListener("change",function(){t.red=this.value,colorShow.style.backgroundColor=t.toRgbString(),i.emit("rgbLed",t),console.log("Rojo:"+r+", Verde:"+n+", Azul:"+l);var e=document.getElementById("redSlider").value;e<=r+5&&e>=r-5&&(document.getElementById("rojoacert").innerHTML="Te has acercado lo suficiente en el valor rojo",console.log("si"),1==(d=!0)&&(document.getElementById("progreso").value+=32),document.getElementById("redSlider").disabled=!0,1==c&&1==a&&1==d&&(document.getElementById("fin").innerHTML="Felicidades, te has acercado lo suficiente al color")),o++,console.log(o),document.getElementById("contador").innerHTML="Llevas "+o+" intentos"}),m.addEventListener("change",function(){t.green=this.value,colorShow.style.backgroundColor=t.toRgbString(),i.emit("rgbLed",t),console.log("Rojo:"+r+", Verde:"+n+", Azul:"+l);var e=document.getElementById("greenSlider").value;e<=n+5&&e>=n-5&&(document.getElementById("verdeacert").innerHTML="Te has acercado lo suficiente en el valor verde",console.log("Si, VERDE"),1==(a=!0)&&(document.getElementById("progreso").value+=33.33),document.getElementById("greenSlider").disabled=!0,1==c&&1==a&&1==d&&(document.getElementById("fin").innerHTML="Felicidades, te has acercado lo suficiente al color")),o++,console.log(o),document.getElementById("contador").innerHTML="Llevas "+o+" intentos"}),v.addEventListener("change",function(){t.blue=this.value,colorShow.style.backgroundColor=t.toRgbString(),i.emit("rgbLed",t),console.log("Rojo:"+r+", Verde:"+n+", Azul:"+l);var e=document.getElementById("blueSlider").value;e<=l+5&&e>=l-5&&(document.getElementById("azulacert").innerHTML="Te has acercado lo suficiente en el valor azul",console.log("Si, azul"),1==(c=!0)&&(document.getElementById("progreso").value+=34),1==c&&1==a&&1==d&&(document.getElementById("fin").innerHTML="Felicidades, te has acercado lo suficiente al color"),document.getElementById("blueSlider").disabled=!0),o++,console.log(o),document.getElementById("contador").innerHTML="Llevas "+o+" intentos"});var r=u(0,255),n=u(0,255),l=u(0,255);document.getElementById("color").style.backgroundColor="rgb("+r+","+n+","+l+")"});