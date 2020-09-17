/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("apartment_information", {
  // Default module config.
  defaults: {},

  getStyles: function() {
    return ["apartment_information_styles.css"];
  },

  information_metadata: {
    fields: [
      {
        name: "address",
        display_name: "Address"
      },
      {
        name: "host",
        display_name: "Host"
      },
      {
        name: "wifi",
        display_name: "WiFi"
      },
      {
        name: "favorite_guest",
        display_name: "Favorite Guest"
      },
    ]
  },

  getDetailsButtonDiv: function() {
    var button = document.createElement("div")
    button.id = "detailsButton"
    button.className = "detailsButton";
    button.appendChild(document.createTextNode("Apartment Information"));
    return button;
  },

  getExitDiv: function() {
    var exit = document.createElement("div");
    exit.className = "exit-button bright";

    exit.appendChild(document.createTextNode("Exit"));

    return exit;
  },

  getInformationDiv: function(exitDiv) {
    var information = document.createElement("div");
    information.className = "focus-pane";

    information.appendChild(exitDiv);

    var informationTable = document.createElement("table");
    informationTable.className = "information-table";
    information.appendChild(informationTable);

    for (var field of this.information_metadata.fields) {
      var fieldValues = this.config[field.name]
      if (fieldValues) {
        var row = document.createElement("tr");

        var keyData = document.createElement("td");
        keyData.className = "information-key bright light";
        keyData.appendChild(document.createTextNode(field.display_name));

        var valueData = document.createElement("td");
        valueData.className = "information-value";

        for (var i = 0; i < fieldValues.length; i++) {
          var fieldValue = fieldValues[i];
          valueData.appendChild(document.createTextNode(fieldValue));
          valueData.appendChild(document.createElement("br"));
        }

        row.appendChild(keyData);
        row.appendChild(valueData);
        informationTable.appendChild(row)
      }
    }

    return information;
  },

  getDom: function () {
    var detailsButton = this.getDetailsButtonDiv();
    var exit = this.getExitDiv();
    var information = this.getInformationDiv(exit);
    information.style.display = "none";

    function showInformation() {
      information.style.display = "block";
    }
    detailsButton.addEventListener("click", () => showInformation());

    function hideInformation() {
      information.style.display = "none";
    }
    exit.addEventListener("click", () => hideInformation());

    var dom = document.createElement("div");
    dom.appendChild(detailsButton);
    dom.appendChild(information);

    return dom;
  },
});
