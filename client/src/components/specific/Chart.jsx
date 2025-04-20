import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { orange, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/feature";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales
);

const lineChartOptions = {
  responsive:true,
  plugins:{
    legend:{
      display:false
    },
    title:{
      display:false
    }
  },
  scales:{
    x:{
      grid:{
        display:false
      }
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false
      }
    }
  }
}

const doughnutCharOptions = {
  responsive:true,
  plugins:{
    legend:{
      display:false
    }
  },
  cutout:100
}

const labels = getLast7Days()

const LineChart = ({value=[]}) => {
  const data = {
    labels,
    datasets: [
    {
      data:value,
      label:"Revenue 2",
      fill:true,
      backgroundColor:purpleLight,
      borderColor:purple
    }
  ],
  };
  return <Line style={{
    height:"35vh"
  }} data={data} options={lineChartOptions}/>;
};

const DoughnutChart = ({value=[],labels=[]}) => {
  const data = {
    labels,
    datasets: [
    {
      data:value,
      label:"Total Chat vs Group Chat",
      backgroundColor:[purpleLight,orange],
      borderColor:[purple,orange],
      hoverBackgroundColor:[purple,"red"],
      offset:20
    }
  ],
  };
  return <Doughnut style={{
    zIndex:10
  }} data={data} options={doughnutCharOptions}/>;
};

export { LineChart, DoughnutChart };
