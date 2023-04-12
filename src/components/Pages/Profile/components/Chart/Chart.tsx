import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Card } from '../../../../UI';

import classes from './Chart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// temp
export const data = {
  labels,
  datasets: [
    {
      label: 'Read',
      data: [12, 19, 3, 5, 2, 3, 0, 12, 3, 11, 2],
      backgroundColor: '#f9f8717a',
    },
    {
      label: 'Dropped',
      data: [2, 1, 0, 0, 4, 0, 0, 2, 3, 0, 0],
      backgroundColor: '#d57d679c',
    },
  ],
};

export const Chart = () => {
  // temp
  const date = '2023';

  return (
    <Card>
      <div className={classes.chart}>
        <h2>{date}</h2>
        <Bar options={options} data={data} redraw={true} />
      </div>
    </Card>
  );
};
