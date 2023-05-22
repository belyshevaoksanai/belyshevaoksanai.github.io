import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import useSound from 'use-sound';
import './App.css';
import { useCountdown } from './hooks/use-countdown';
import { StatisticsPage } from './pages/statistics-page/statistics-page';
import { TimerPage } from './pages/timer-page';
import Root from './routes/root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { selectorPlaySound } from './store/timer/selector';
import alarm from './sounds/alarm.mp3';
import { timerAction } from './store/timer/timer';

function App() {
  const dispatch = useDispatch();
  const playSound = useSelector(selectorPlaySound);
  const [startTimer, stopTimer, pauseTimer] = useCountdown();
  const [play] = useSound(alarm);

  useEffect(() => {
    if (playSound) {
      play();
      dispatch(timerAction.resetPlaySound());
    }
  }, [playSound, dispatch, play]);

  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "timer",
            element: <TimerPage
              startTimer={startTimer}
              stopTimer={stopTimer}
              pauseTimer={pauseTimer}
            />,
          },
          {
            path: "statistics",
            element: <StatisticsPage />,
          },
        ],
      },
    ])} />
  );
}

export default App;
