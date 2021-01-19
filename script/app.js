//console.log ("Testing connection")

function init() {
    //console.log("in")

    // Set the dropdown menu
    let selector = d3.select("#selDataset");
    
    // Fill dropdown menu with sample Names
    d3.json("/data/data_samples.json").then((data) => {
        let subjectIds = data.names;
        subjectIds.forEach((id) => {
          selector
          .append("option")
          .text(id)
          .property("value", id);
        });

    });
  }
  
  
  // Initialize the dashboard
  init();