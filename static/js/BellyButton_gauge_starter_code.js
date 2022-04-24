// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
  
// Create a variable that holds the samples array.
    var sampleNames = data.names;

// Create a variable that filters the samples for the object with the desired sample number.
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);

// 1. Create a variable that filters the metadata array for the object with the desired sample number.
  var metadata = data.metadata;

// Create a variable that holds the first sample in the array.
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

// 2. Create a variable that holds the first sample in the metadata array.
  var metadataArray = metadata.filter(metadataObj => metadataObj.id == sample);

// Create variables that hold the otu_ids, otu_labels, and sample_values.
var ids = samplesResults.otu_ids;
var labels = samplesResults.otu_labels;
var sample_values = samplesResults.sample_values

// 3. Create a variable that holds the washing frequency.
var washFreq = gaugeResults.wfreg

// Create the yticks for the bar chart.
   var yticks = ids.map(sampleOBJ => "OTU" + sampleOBJ).slice(0,10).reverse();
   
// Use Plotly to plot the bar data and layout.
   Plotly.newPlot('bar', barData, barLayout);
   
// Use Plotly to plot the bubble data and layout.
   Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

// 4. Create the trace for the gauge chart.
   var gaugeData = [{
     value: washFreq
     type: "indicator",
     mode: "gauge+number",
     gauge: {
       axis: {range: [null, 10], tickwidth: 1, tickcolor: "black" },
       borderwidth: 2,
       steps: [
         {range: [0,2], color: "red"},
         {range: [2,4], color: "orange"},
         {range: [4,6], color: "yellow"},
         {range: [6,8], color: "green"},
         {range: [8,10], color: "darkgreen"}
       ],
     }
   }];
        
// 5. Create the layout for the gauge chart.
   var gaugeLayout = { 
    automargin: true
   };

// 6. Use Plotly to plot the gauge data and layout.
   Plotly.newPlot("gauge", gaugeData, gaugeLayout)
