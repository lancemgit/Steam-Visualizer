import React from "react";
import {
    ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardBody } from 'reactstrap';

function ComparisonTimeChart(props) {

    const data = [
        {
            name: ''
        },
        {
            name: 'User Time', TimePlayed: props.UserTime
        },
        {
            name: 'Global Time', TimePlayed: props.GlobalTime
        },
        {
            name: ''
        }
    ];

    return (
        <div className="text-center">
            <Card className="customCard">
                <CardBody>
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
                            <Bar dataKey="TimePlayed" label="Time Played" barSize={20} fill="#72b9db" tick={false} />
                            <Line type="monotone" dataKey="TimePlayed" stroke="#8fa1b0" />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <p>{props.chartName}</p>
                </CardBody>
            </Card>
        </div>
    );
}

export default ComparisonTimeChart;