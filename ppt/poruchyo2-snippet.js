
var widgetConfig = window.widgetConfig ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false,
    packageId: "",
    OWIDGET_BACKEND_URL: 'https://widgetlab.o2.cz/be',
    OWIDGET_URL: 'https://widgetlab.o2.cz'
};

widgetConfig.init = function(packageName)
{
    console.log("Widget initialization for : " + packageName);
    widgetConfig.packageId = packageName;

    widgetConfig.initializing = true;

    //Apple business check
	//pokud neni ABC tak se spusti

	if (!window.appleBusinessChat || 
        !appleBusinessChat.isSupported || 
        !appleBusinessChat.isSupported()
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
        abcDiv.setAttribute("data-apple-business-intent-id", "ESHOP");
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

        
        $owidget.addCustomData("WDG_PACKAGE", "PORUCHY_" + widgetConfig.packageId);
        $owidget.addCustomData("WDG_PAGE_TITLE",document.title); //---O2 uncomment this line in case of extra value for each page title---
    } else{
        console.log("Widget not initialized - waiting");
    }
}

//--- for O2 Poruchy back compatibility ---
var O2chat = window.O2chat || {}
O2chat.residentTesu = function() {widgetConfig.init("residentTesu")}; // for example if you want this widget, cust call O2chat.residentTesu() in console or automatically via js
O2chat.smbTesu = function() {widgetConfig.init("smbTesu")};
O2chat.corpTesu = function() {widgetConfig.init("corpTesu")};
O2chat.govTesu = function() {widgetConfig.init("govTesu")};
O2chat.residentCare = function() {idgetConfig.init("residentCare")};
O2chat.smbCare = function() {widgetConfig.init("smbCare")};
O2chat.corpCare = function() {widgetConfig.init("corpCare")};
O2chat.govCare = function() {widgetConfig.init("govCare")};