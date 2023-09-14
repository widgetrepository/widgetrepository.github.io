
window.widgetConfig = window.widgetConfig ||
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
    OWIDGET_statApi: 'https://widgettest.o2.cz/api/state/identify',
    version: '1.0.1'
};

window.widgetConfig.init = function(packageName)
{
    console.log("Widget initialization for : " + packageName);
    window.widgetConfig.packageId = packageName;

    window.widgetConfig.initializing = true;

    //Widget
    window.widgetConfig.isWidgetRunning = true;

    var wCss = document.createElement( "link" );
    wCss.href = window.widgetConfig.OWIDGET_URL + "/assets/style.css";
    wCss.type = "text/css";
    wCss.rel = "stylesheet";
    
    document.getElementsByTagName("head")[0].appendChild( wCss );

    wJs = document.createElement("script");
        wJs.type = "text/javascript";
        wJs.async = !0;
        wJs.type = "module";
        wJs.crossOrigin = 'anonymous';
        wJs.charset = "UTF-8";
        wJs.src = window.widgetConfig.OWIDGET_URL + "/assets/client.js";
    document.getElementsByTagName("body")[0].appendChild( wJs );

    window.widgetConfig.timer = setInterval(window.widgetConfig.setup, 250);

    window.addEventListener(
        "message",
        (event) => {
            console.log(event);
        },
        false,
        );
}

window.widgetConfig.setup = function()
{
    console.log("Widget setup");

    window.widgetConfig.counter++;
    if (window.widgetConfig.counter > 10)
    {
        console.log("Widget start timeouted");
        clearInterval(window.widgetConfig.timer);
    }

    if (typeof $owidget != "undefined"){
        //continue
        clearInterval(window.widgetConfig.timer);
        window.widgetConfig.initialized = true;
        window.widgetConfig.initializing = false;

        
        $owidget.addCustomData("WDG_PACKAGE", "PORUCHY_" + window.widgetConfig.packageId);
        $owidget.addCustomData("WDG_PAGE_TITLE",document.title); //---O2 uncomment this line in case of extra value for each page title---
    } else{
        console.log("Widget not initialized - waiting");
    }
}

//--- for O2 Poruchy back compatibility ---
var O2chat = window.O2chat || {}
O2chat.residentTesu = function() {window.widgetConfig.init("residentTesu")}; // for example if you want this widget, cust call O2chat.residentTesu() in console or automatically via js
O2chat.smbTesu = function() {window.widgetConfig.init("smbTesu")};
O2chat.corpTesu = function() {window.widgetConfig.init("corpTesu")};
O2chat.govTesu = function() {window.widgetConfig.init("govTesu")};
O2chat.residentCare = function() {window.widgetConfig.init("residentCare")};
O2chat.smbCare = function() {window.widgetConfig.init("smbCare")};
O2chat.corpCare = function() {window.widgetConfig.init("corpCare")};
O2chat.govCare = function() {window.widgetConfig.init("govCare")};