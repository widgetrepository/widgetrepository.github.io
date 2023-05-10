var O2Newchat = window.O2Newchat ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false
};

O2Newchat.init = function()
{
    console.log("Widget initialization");
    O2Newchat.initializing = true;

    //Apple business check
    //var a = (new UAParser).getOS(); ---O2 uncomment this line ---
	//pokud neni ABC tak se spusti

	if (!window.appleBusinessChat || 
        !appleBusinessChat.isSupported || 
        !appleBusinessChat.isSupported() 
        //|| a && a.name && "Mac OS" == a.name  ---O2 uncomment this line ---
        )
	{
        //Widget
        O2Newchat.isWidgetRunning = true;

        var wCss = document.createElement( "link" );
        wCss.href = "https://widgetlab.o2.cz/assets/style.css";
        wCss.type = "text/css";
        wCss.rel = "stylesheet";
        
        document.getElementsByTagName("head")[0].appendChild( wCss );

        wJs = document.createElement("script");
            wJs.type = "text/javascript";
            wJs.async = !0;
            wJs.type = "module";
            wJs.crossOrigin = 'anonymous';
            wJs.charset = "UTF-8";
            wJs.src = "https://widgetlab.o2.cz/assets/client.js";
        document.getElementsByTagName("body")[0].appendChild( wJs );

        O2Newchat.timer = setInterval(O2Newchat.setup, 250);
    } else {
        //ABC
        O2Newchat.isAbcRunning = true;
        var abcDiv = document.createElement("div");
        abcDiv.className += "apple-business-chat-message-container";
        abcDiv.setAttribute("data-apple-business-id", "6df1b88b-a132-4089-ae18-b0ed03e1de06");
        abcDiv.setAttribute("data-apple-business-group-id", "SHOP");
        abcDiv.setAttribute("data-apple-business-intent-id", "mluvii");
        abcDiv.setAttribute("data-apple-icon-scale", "1.5");
        abcDiv.setAttribute("data-apple-icon-color", "#ffffff");
        abcDiv.setAttribute("data-apple-icon-background-color", "#0090d0");
        abcDiv.setAttribute("data-apple-icon-title", "Otev\u0159\u00edt chat");
        
        document.getElementsByTagName("body")[0].appendChild( abcDiv );
    }

    
}

O2Newchat.setup = function()
{
    console.log("Widget setup");
    if (typeof $owidget != "undefined"){
        //continue
        clearInterval(O2Newchat.timer);
        O2Newchat.initialized = true;
        O2Newchat.initializing = false;
        $owidget.addCustomData("Package","chatRESasistentPOPredesign");
        $owidget.addCustomData("Titulek","Mobiln\u00ed tarify");
    } else{
        console.log("Widget not initialized - waiting");
    }
}

O2Newchat.init();