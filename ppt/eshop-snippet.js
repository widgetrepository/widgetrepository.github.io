window.widgetConfig = window.widgetConfig ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false,
    OWIDGET_BACKEND_URL: 'https://widgettest.o2.cz/be',
    OWIDGET_URL: 'https://widgettest.o2.cz',
    OWIDGET_SENTRY_DSN: 'https://74423cd1ac6a420ebd5ba8ee402fee6a@sentry.eman.dev/46',
    OWIDGET_strGmsURL: 'https://chatlab.o2.cz/genesys/cometd',
    OWIDGET_strServiceName: '/service/chatV2/cz',
    OWIDGET_statApi: 'https://widgettest.o2.cz/api/state/identify',
    version: '1.0.1'
};

window.widgetConfig.init = function()
{
    console.log("Widget initialization");
    window.widgetConfig.initializing = true;

    //Apple business check
	//pokud neni ABC tak se spusti widget - POZOR - nutno naloadovat js ABC na strance - neni soucasti snippetu

	if (!window.appleBusinessChat || 
        !appleBusinessChat.isSupported || 
        !appleBusinessChat.isSupported()
        )
	{
        //Widget
        window.widgetConfig.isWidgetRunning = true;

        var wCss = document.createElement( "link" );
        wCss.href = window.widgetConfig.OWIDGET_URL + "/assets/style.css?" + Math.random();
        wCss.type = "text/css";
        wCss.rel = "stylesheet";
        
        document.getElementsByTagName("head")[0].appendChild( wCss );

        wJs = document.createElement("script");
            wJs.type = "text/javascript";
            wJs.async = !0;
            wJs.type = "module";
            wJs.crossOrigin = 'anonymous';
            wJs.charset = "UTF-8";
            wJs.src = window.widgetConfig.OWIDGET_URL + "/assets/client.js?" + Math.random();
        document.getElementsByTagName("body")[0].appendChild( wJs );

        window.widgetConfig.timer = setInterval(window.widgetConfig.setup, 250);

        window.addEventListener(
            "message",
            (event) => {
              console.log(event);
            },
            false,
          );
    } else {
        //ABC
        window.widgetConfig.isAbcRunning = true;
        var abcDiv = document.createElement("div");

        abcDiv.className += "apple-business-chat-message-container";
        abcDiv.setAttribute("data-apple-business-id", "6df1b88b-a132-4089-ae18-b0ed03e1de06");
        abcDiv.setAttribute("data-apple-business-intent-id", "ESHOP");
        abcDiv.setAttribute("data-apple-icon-scale", "1.5");
        abcDiv.setAttribute("data-apple-icon-color", "#ffffff");
        abcDiv.setAttribute("data-apple-icon-background-color", "#0090d0");
        
        document.getElementsByTagName("body")[0].appendChild( abcDiv );
    }

    
}

window.widgetConfig.setup = function()
{
    console.log("Widget setup");
    if (typeof $owidget != "undefined"){
        //continue
        clearInterval(O2Newchat.timer);
        window.widgetConfig.initialized = true;
        window.widgetConfig.initializing = false;

        $owidget.addCustomData("WDG_PACKAGE","chatRESeshop");
        $owidget.addCustomData("WDG_PAGE_TITLE",document.title); //---O2 uncomment this line in case of extra value for each page title---
    } else{
        console.log("Widget not initialized - waiting");
    }
}

window.widgetConfig.init();