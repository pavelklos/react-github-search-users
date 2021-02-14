// STEP 1 - Include Dependencies
// Include react
import React from 'react';
// import ReactDOM from 'react-dom';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.umber';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';

// Adding the chart and theme as dependency to the core fusioncharts
// ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
ReactFC.fcRoot(FusionCharts, Column2D);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: 'Venezuela',
//     value: '290',
//   },
//   {
//     label: 'Saudi',
//     value: '260',
//   },
//   {
//     label: 'Canada',
//     value: '180',
//   },
//   {
//     label: 'Iran',
//     value: '140',
//   },
//   {
//     label: 'Russia',
//     value: '115',
//   },
//   {
//     label: 'UAE',
//     value: '100',
//   },
//   {
//     label: 'US',
//     value: '30',
//   },
//   {
//     label: 'China',
//     value: '30',
//   },
// ];

// STEP 3 - Creating the JSON object to store the chart configurations
// const chartConfigs = {
//   type: 'column2d', // The chart type
//   // width: '700', // Width of the chart
//   // height: '400', // Height of the chart
//   width: '100%',
//   height: 400,
//   dataFormat: 'json', // Data type
//   dataSource: {
//     // Chart Configuration
//     chart: {
//       //Set the chart caption
//       caption: 'Countries With Most Oil Reserves [2017-18]',
//       //Set the chart subcaption
//       subCaption: 'In MMbbl = One Million barrels',
//       //Set the x-axis name
//       xAxisName: 'Country',
//       //Set the y-axis name
//       yAxisName: 'Reserves (MMbbl)',
//       numberSuffix: 'K',
//       //Set the theme for your chart
//       // theme: 'fusion',
//       // theme: 'gammel',
//       theme: 'candy',
//       // theme: 'umber',
//       // theme: 'carbon',
//     },
//     // Chart Data
//     data: chartData,
//   },
// };

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return <ReactFC {...chartConfigs} />;
//   }
// }
// export default App;
const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: 'column2d', // The chart type
    // width: '700', // Width of the chart
    // height: '400', // Height of the chart
    width: '100%',
    height: 400,
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Countries With Most Oil Reserves [2017-18]',
        //Set the chart subcaption
        subCaption: 'In MMbbl = One Million barrels',
        //Set the x-axis name
        xAxisName: 'Country',
        //Set the y-axis name
        yAxisName: 'Reserves (MMbbl)',
        // numberSuffix: 'K',
        numberSuffix: ' %',
        //Set the theme for your chart
        // theme: 'fusion',
        // theme: 'gammel',
        // theme: 'candy',
        // theme: 'umber',
        // theme: 'carbon',
      },
      // Chart Data
      // data: chartData,
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;

// import React from 'react';
// const ExampleChart = () => {
//   return <div>chart</div>;
// };
// export default ExampleChart;
