import { Component } from 'react';
import { Grid } from "@material-ui/core";
import RadialMenu from "/pages/radial";
import React from 'react';

class Pie extends Component {
    render() {
        return  <>
                    <Grid container item xs={12}>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={3} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Left"/>
                            </React.Fragment>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={3} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Left"/>
                            </React.Fragment>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={3} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Right"/>
                            </React.Fragment>
                        </Grid>
                        <Grid container item xs={4}>
                            <React.Fragment>
                                <RadialMenu count={5} direction="Left"/>
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </>;
    }
};

export default Pie;