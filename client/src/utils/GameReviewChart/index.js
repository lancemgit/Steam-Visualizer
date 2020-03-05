import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function GameReviewChart(props) {

    const data = [
        {
            name: 'Review Scores',
            Positive: props.positive,
            Negative: props.negative,
        }
    ];

    return (
        <ResponsiveContainer className="blackText customCard" width="100%" height={75}>
            <BarChart
                data={data}
                layout="vertical">
                <XAxis type="number" label="Review Scores" tick={false} domain={[0, (data.Positive + data.Negative)]} hide />
                <YAxis type="category" dataKey="name" tick={false} hide />
                <Tooltip dataKey="name" />

                <Legend formatter={(value, entry) => {
                    return <span style={{ color: "#ffffff" }}>{value}</span>;
                }}></Legend>

                <Bar dataKey="Positive" stackId='a' fill="#72b9db" />
                <Bar dataKey="Negative" stackId='a' fill="#cd5d5f" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GameReviewChart;
