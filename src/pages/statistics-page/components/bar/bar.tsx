import { Box } from "@mui/material";
import { Background, Bar, VictoryAxis, VictoryBar, VictoryChart, VictorySharedEvents, VictoryStack } from "victory";

export const PomodoroBar = () => {
    return (
        <Box width={950}>
            <VictoryChart
                style={{
                    background: {
                        fill: "#F4F4F4",
                        width: '100%',
                    }
                }}
                backgroundComponent={<Background x={0} />}
            >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
                    style={{
                        axis: {
                            stroke: "#ECECEC",
                            tickLabels: {
                                fill: '#ECECEC',
                            },
                        }
                    }}
                />
                <VictoryBar name="Bar-1"
                    style={{
                        data: {
                            fill: "#EA8979",
                            width: 40,
                        },
                    }}
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 4 },
                        { x: 3, y: 1 },
                        { x: 4, y: 5 },
                        { x: 5, y: 5 },
                        { x: 6, y: 5 },
                        { x: 7, y: 5 }
                    ]}
                    dataComponent={
                        <Bar
                            events={{
                                onClick: (evt: { clientX: any; clientY: any; }) => console.log(evt)
                            }}
                        />
                    }
                />
            </VictoryChart>
        </Box>
    )
};