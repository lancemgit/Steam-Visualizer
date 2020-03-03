import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
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
        <ResponsiveContainer width="100%" height={75}>
            <BarChart
                data={data}
                layout="vertical">
                <XAxis type="number" label="Review Scores" tick={false} domain={[0, (data.Positive + data.Negative)]} hide />
                <YAxis type="category" dataKey="name" tick={false} hide />
                <Tooltip dataKey="name" />
                <Bar dataKey="Positive" stackId='a' fill="#8884d8" />
                <Bar dataKey="Negative" stackId='a' fill="#444444" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GameReviewChart;
