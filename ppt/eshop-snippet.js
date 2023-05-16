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
	//pokud neni ABC tak se spusti

	if (!window.appleBusinessChat || 
        !appleBusinessChat.isSupported || 
        !appleBusinessChat.isSupported()
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

        // <div class="apple-business-chat-message-container"
        //     data-apple-business-id="016d3cac-9192-46a7-ae3b-aadf348df717"
        //     data-apple-icon-color="#ffffff"
        //     data-apple-icon-background-color="#0090d0"
        //     data-apple-icon-scale="1.5"
        //     data-apple-business-intent-id="ESHOP">
        // </div>

        abcDiv.className += "apple-business-chat-message-container";
        abcDiv.setAttribute("data-apple-business-id", "6df1b88b-a132-4089-ae18-b0ed03e1de06");
        abcDiv.setAttribute("data-apple-business-intent-id", "ESHOP");
        abcDiv.setAttribute("data-apple-icon-scale", "1.5");
        abcDiv.setAttribute("data-apple-icon-color", "#ffffff");
        abcDiv.setAttribute("data-apple-icon-background-color", "#0090d0");
        
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
        $owidget.addCustomData("Package","chatRESeshop");
        //$owidget.addCustomData("Titulek","Mobiln\u00ed tarify"); ---O2 uncomment this line in case of extra value for each page title---
    } else{
        console.log("Widget not initialized - waiting");
    }
}

O2Newchat.init();