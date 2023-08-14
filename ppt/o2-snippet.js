var widgetConfig = window.widgetConfig ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false,
    counter: 0,
    OWIDGET_BACKEND_URL: 'https://widgettest.o2.cz/be',
    OWIDGET_URL: 'https://widgettest.o2.cz',
    OWIDGET_SENTRY_DSN: 'https://74423cd1ac6a420ebd5ba8ee402fee6a@sentry.eman.dev/46',
    OWIDGET_strGmsURL: 'https://chatlab.o2.cz/genesys/cometd',
    OWIDGET_strServiceName: '/service/chatV2/cz',
    OWIDGET_statApi: 'https://widgettest.o2.cz/api/state/identify',
    version: '1.0.1'
};

widgetConfig.init = function()
{
    console.log("Widget initialization");
    widgetConfig.initializing = true;

    //Apple business check
    //var a = (new UAParser).getOS(); ---O2 uncomment this line ---
	//pokud neni ABC tak se spusti - POZOR - nutno naloadovat js pro ABC check na strance - neni soucasti snippetu

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

    widgetConfig.counter++;
    if (widgetConfig.counter > 10)
    {
        console.log("Widget start timeouted");
        clearInterval(widgetConfig.timer);
    }

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