
var widgetConfig = window.widgetConfig ||
{
	initialized: false,
    initializing: false,
    isAbcRunning: false,
    isWidgetRunning: false,
    packageId: "",
    counter: 0,
    OWIDGET_BACKEND_URL: 'https://widgettest.o2.cz/be',
    OWIDGET_URL: 'https://widgettest.o2.cz',
    OWIDGET_SENTRY_DSN: 'https://74423cd1ac6a420ebd5ba8ee402fee6a@sentry.eman.dev/46',
    OWIDGET_strGmsURL: 'https://chatlab.o2.cz/genesys/cometd',
    OWIDGET_strServiceName: '/service/chatV2/cz',
    OWIDGET_statApi: 'https://widgettest.o2.cz/api/state/identify'
};

widgetConfig.init = function(packageName)
{
    console.log("Widget initialization for : " + packageName);
    widgetConfig.packageId = packageName;

    widgetConfig.initializing = true;

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

    window.addEventListener(
        "message",
        (event) => {
            console.log(event);
        },
        false,
        );
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