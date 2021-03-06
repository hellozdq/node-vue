(function(window){var svgSprite='<svg><symbol id="icon-mima" viewBox="0 0 1024 1024"><path d="M779.821998 367.986566l-5.15869 0c-2.579345 0-2.579345 0-5.15869 0L769.504618 272.550798C770.3644 116.930311 657.732997 0 508.990764 0c-146.162888 0-257.934509 116.930311-257.934509 272.550798l0 95.435768-7.738035 0c-78.240134 0-141.004198 66.203191-141.004198 143.583543l0 367.986566c0 80.819479 63.623846 143.583543 141.004198 143.583543l536.503778 0c78.240134 0 141.004198-66.203191 141.004198-143.583543L920.826196 511.570109C919.106633 431.610411 855.482788 367.986566 779.821998 367.986566zM294.905122 270.831234c0-134.125945 90.277078-228.701931 214.085642-228.701931 126.387909 0 216.664987 97.155332 216.664987 228.701931l0 95.435768L292.325777 366.267003 292.325777 270.831234 294.905122 270.831234zM877.837112 879.556675c0 55.88581-43.848866 102.314022-97.155332 102.314022L243.31822 981.870697c-53.306465 0-97.155332-46.428212-97.155332-102.314022L146.162888 511.570109c0-55.88581 43.848866-102.314022 97.155332-102.314022L257.934509 409.256087l36.970613 0 434.189757 0 51.586902 0 0 0c53.306465 0 97.155332 46.428212 97.155332 102.314022L877.837112 879.556675 877.837112 879.556675z"  ></path><path d="M507.271201 567.455919c-34.391268 0-61.0445 29.232578-61.0445 63.623846 0 24.073887 12.036944 43.848866 31.811923 55.88581l0 104.893367c0 17.195634 14.616289 31.811923 31.811923 31.811923s31.811923-14.616289 31.811923-31.811923L541.662469 686.965575c19.774979-12.036944 31.811923-31.811923 31.811923-55.88581C567.455919 597.548279 540.802687 567.455919 507.271201 567.455919z"  ></path></symbol><symbol id="icon-yonghu" viewBox="0 0 1024 1024"><path d="M619.064182 504.57971c91.163561-42.401656 154.766046-133.565217 154.766046-239.569358C773.830228 118.724638 655.10559 0 508.819876 0S243.809524 118.724638 243.809524 265.010352c0 106.004141 63.602484 197.167702 154.766045 239.569358C169.606625 555.461698 0 758.989648 0 1002.799172v21.200828h1017.639752v-21.200828c0-243.809524-169.606625-447.337474-398.57557-498.219462zM286.21118 265.010352C286.21118 142.045549 385.855072 42.401656 508.819876 42.401656s222.608696 99.643892 222.608695 222.608696S631.784679 487.619048 508.819876 487.619048s-222.608696-99.643892-222.608696-222.608696zM42.401656 981.598344c10.600414-248.049689 216.248447-445.217391 466.41822-445.217392s455.817805 197.167702 466.418219 445.217392H42.401656z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)