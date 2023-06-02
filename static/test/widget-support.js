var widgetConfig = window.widgetConfig ||
{
    OWIDGET_BACKEND_URL: 'https://widgettest.o2.cz/be'
};

var elemDiv = document.createElement('div');
elemDiv.id = 'widgetSettingsWindow';
elemDiv.innerHTML = `
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Windget TEST support settings</h4>
        </div>
        <div class="modal-body">
            <textarea class="widget-context" id="widgetSettingsContext" rows="5"></textarea>
            <p id="widgetSettingsMessage" />
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button id="widgetSettingsSendNow" type="button" class="btn btn-primary">Send to widget NOW</button>
        </div>
    </div>
</div>`;
elemDiv.classList.add("modal","fade","modeless");
document.body.appendChild(elemDiv);

//Modal se zobrazil
$('#widgetSettingsWindow').on('show.bs.modal', function () {
    populateModalWindow();
})

//Manualne provolat widget a predat mu vsechna data z dialogu
$("#widgetSettingsSendNow").click(function(){
    SendDataToWidget(true);
});

//Moznost menit pozici modalniho okna
$("#widgetSettingsWindow").draggable({
    handle: ".modal-header"
});

//Automaticky zobrazit okno po nacteni stranky
$('#widgetSettingsWindow').modal('show');

//nacteni obsahu z query stringu
function populateModalWindow() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const context = document.getElementById("widgetSettingsContext");
    const message = document.getElementById("widgetSettingsMessage");
    context.value = "";
    for(var value of params.keys()) {
        if (value === 'send2widgettimeout'){
            const timeout = params.get(value);
            if (timeout === 0){
                setTimeout (function() {
                    SendDataToWidget(false);
                }, 0);
                message.innerText = "Will be automatically called after " + timeout + "ms";
            } else{
                setTimeout (function() {
                    SendDataToWidget(false);
                }, parseInt(timeout));
                message.innerText = "Will be automatically called after " + timeout + "ms";
            }
        } else{
            context.value = context.value + value + "=" + params.get(value)
            context.value = context.value + "\r\n";
        }
    }
}

function SendDataToWidget(manually){
    console.log("--- push data to widget ---");
    const context = document.getElementById("widgetSettingsContext");
    const message = document.getElementById("widgetSettingsMessage");

    let values = context.value.split(/\r?\n/);
    values.map(sentence => {
        let kvp = sentence.split('=');
        if (!isEmpty(kvp[0]) && !isEmpty(kvp[1]))
            $owidget.addCustomData(kvp[0],kvp[1]);
    });
    if (manually)
        message.innerText = "Manually called";

    console.log($owidget.getAllData());
    console.log("--------------------");
}

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }