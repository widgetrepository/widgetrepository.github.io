var widgetConfig = window.widgetConfig ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false,
    OWIDGET_BACKEND_URL: 'https://widgetlab.o2.cz/be',
    OWIDGET_URL: 'https://widgetlab.o2.cz'
};

widgetConfig.init = function()
{
    console.log("Widget initialization");
    widgetConfig.initializing = true;

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
        widgetConfig.isWidgetRunning = true;

        var wCss = document.createElement( "link" );
        wCss.href = widgetConfig.OWIDGET_URL + "/assets/style.css";
        wCss.type = "text/css";
        wCss.rel = "stylesheet";
        
        document.getElementsByTagName("head")[0].appendChild( wCss );

        wJs = document.createElement("script");
            wJs.type = "text/javascript";
            wJs.async = !0;
            wJs.type = "module";
            wJs.crossOrigin = 'anonymous';
            wJs.charset = "UTF-8";
            wJs.src = widgetConfig.OWIDGET_URL + "/assets/client.js";
        document.getElementsByTagName("body")[0].appendChild( wJs );

        widgetConfig.timer = setInterval(widgetConfig.setup, 250);
    } else {
        //ABC
        widgetConfig.isAbcRunning = true;
        var abcDiv = document.createElement("div");

        // <div class="apple-business-chat-message-container"
        //     data-apple-business-id="016d3cac-9192-46a7-ae3b-aadf348df717"
        //     data-apple-icon-color="#ffffff"
        //     data-apple-icon-background-color="#0090d0"
        //     data-apple-icon-scale="1.5"
        //     data-apple-business-intent-id="O2.CZ">
        // </div>

        abcDiv.className += "apple-business-chat-message-container";
        abcDiv.setAttribute("data-apple-business-id", "6df1b88b-a132-4089-ae18-b0ed03e1de06");
        abcDiv.setAttribute("data-apple-business-intent-id", "O2.CZ");
        abcDiv.setAttribute("data-apple-icon-scale", "1.5");
        abcDiv.setAttribute("data-apple-icon-color", "#ffffff");
        abcDiv.setAttribute("data-apple-icon-background-color", "#0090d0");
        
        document.getElementsByTagName("body")[0].appendChild( abcDiv );
    }

    
}

widgetConfig.setup = function()
{
    console.log("Widget setup");
    if (typeof $owidget != "undefined"){
        //continue
        clearInterval(widgetConfig.timer);
        widgetConfig.initialized = true;
        widgetConfig.initializing = false;

        $owidget.addCustomData("WDG_PACKAGE","chatRESasistentPOPredesign");
        $owidget.addCustomData("WDG_PAGE_TITLE",document.title); //---O2 uncomment this line in case of extra value for each page title---
    } else{
        console.log("Widget not initialized - waiting");
    }
}

widgetConfig.init();