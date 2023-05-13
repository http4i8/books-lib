import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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

import {
  AppDispatch,
  booksListSelector,
  chartSelector,
  fetchChart,
} from '../../../../../store';
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

const data = {
  labels,
  datasets: [
    {
      label: 'Read',
      data: [],
      backgroundColor: '#f9f8717a',
    },
  ],
};

export const Chart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector(chartSelector);

  const [chart, setChart] = useState(data);

  const date = '2023';

  useEffect(() => {
    dispatch(fetchChart());
  }, []);

  useEffect(() => {
    setChart({
      ...chart,
      datasets: [
        {
          ...chart.datasets[0],
          data: chartData,
        },
      ],
    });
  }, [chartData]);

  return (
    <Card>
      <div className={classes.chart}>
        <h2>{date}</h2>
        <Bar options={options} data={chart} redraw={true} />
      </div>
    </Card>
  );
};
