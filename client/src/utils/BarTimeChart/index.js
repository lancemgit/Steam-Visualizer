import React from "react";
import {
    ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

function BarTimeChart(props) {

    const data = [
        {
            name: ''
        },
        {
            name: '2 Weeks', TimePlayed: props.Weeks2
        },
        {
            name: 'All Time', TimePlayed: props.AllTime
        },
        {
            name: ''
        }
    ];

    return (
        <div className="text-center">
            <ResponsiveContainer className="blackText" width="90%" height={275}>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 10, right: 10, bottom: 10, left: 10,
                    }}
                >
                    <XAxis dataKey="name" label="" />
                    <YAxis />
                    <Tooltip Line="hidden" />
                    <Bar dataKey="TimePlayed" label="Time Played" barSize={20} fill="#413ea0" tick={false} />
                    <Line type="monotone" dataKey="TimePlayed" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
            <p>{props.chartName}</p>
        </div>
    );
}

export default BarTimeChart;