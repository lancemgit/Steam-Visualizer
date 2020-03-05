import React from "react";
import { Card, CardBody } from "reactstrap"

function AppFooter() {
    return (
        <Card className="customFooter">
            <CardBody className='text-center'>
                <a href="https://www.linkedin.com/in/lance-meara/" target="_blank">LinkedIn</a>
                <br></br>
                <a href="https://github.com/lancemgit/" target="_blank">GitHub</a>
                <br></br>
                <br></br>
                <span className="text-muted"> Steam Visualizer</span>
            </CardBody>
        </Card>
    );
}

export default AppFooter;

