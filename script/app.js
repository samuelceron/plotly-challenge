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
    let firstSample = subjectIds[0];
    updateChart(firstSample);
    });
}

function updateChart(sample) {    
    d3.json("/data/data_samples.json").then((data) => {
        //Set data from the sample selected
        let samples = data.samples;
        let filterArray = samples.filter(sampleObject => sampleObject.id == sample);
        let sample_selected = filterArray[0];
        let sample_values = sample_selected.sample_values;
        let otu_ids = sample_selected.otu_ids;
        let otu_labels = sample_selected.otu_labels;   
        //Build Bubble Chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale:"Rainbow"
            }
        };
        var data = [trace1];
        var layout = {
            title: 'Bacteria Cultures per Sample',
            showlegend: false,
            hovermode: 'closest',
            xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample},
            margin: {t:30}
        };
        Plotly.newPlot('bubble', data, layout); 
        //Build Bar Chart
        var trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            marker:{
                color: 'rgba(255,153,51,0.6)',
                width:1
            }
        };
        var data = [trace1];
        var layout = {
        };
        Plotly.newPlot("bar", data, layout);  
    });
}



function optionChanged(sample) {
    // Fetch new data each time a new sample is selected
    updateChart(sample);
    updateMetadata(sample);
  }
// Initialize the dashboard
init();