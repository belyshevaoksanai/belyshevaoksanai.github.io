import { Box } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { statisticAction } from "../../../../store/statistic/statistic";
import { useSelector } from "react-redux";
import { selectorSelectedDay } from "../../../../store/statistic/selector";
import { selectorHistiory, selectorWeek } from "../../../../store/timer/selector";
import { getDate } from "../../../../utils/get-date";
import moment from "moment";

moment.updateLocale('en', {
  week: {
    dow : 1, // Monday is the first day of the week.
  }
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    }
  }
};

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const data = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      data: [0, 100, 200, 500, 1000, 500, 300],
      backgroundColor: [
        'rgba(100, 99, 132, 0.5)',
        'rgba(255, 5, 132, 0.5)',
        'rgba(255, 99, 200, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ]
    },
  ],
};

export const PomodoroBar = () => {
  const weekSelect = useSelector(selectorWeek)
  const history = useSelector(selectorHistiory);
  const dispatch = useDispatch();
  const selectedDay = useSelector(selectorSelectedDay);
  const chartRef = useRef<ChartJS>(null);
  const [backgroundColor, setBackgroundColor] = useState<string | string[]>('rgba(100, 99, 132, 0.5)',);

  let first = moment().startOf('week').subtract(weekSelect, 'week');

  const week: string[] = [];

  for (let i = 0; i < 7; i++) {
    week.push(getDate(first.toDate()));
    first = first.add(1, 'day');
  }

  useEffect(() => {
    const weekDay = week.findIndex((item) => item === selectedDay);
    setBackgroundColor(labels.map((_item, index) => index === weekDay ? '#DC3E22' : '#EA8A79'))
  // eslint-disable-next-line
  }, [selectedDay, weekSelect]);

  const onClick = () => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    const active = chart.getActiveElements();
    if (active[0]) {
      dispatch(statisticAction.setSelectedDay(week[active[0].index]));
    }
  };

  return (
    <Box width={950}>
      <Chart
        ref={chartRef}
        type='bar'
        options={options}
        data={{
          labels,
          datasets: [
            {
              type: 'bar' as const,
              data: week.map((day) => history[day] ? history[day].taskTime : 0),
              backgroundColor,
            },
          ],
        }}
        onClick={onClick}
      />
    </Box >
  )
};