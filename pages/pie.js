import { Component } from 'react';
import { Grid } from "@material-ui/core";
import RadialMenu from "/pages/radial";
import React from 'react';

class Pie extends Component {
    render() {
        return  <>
                    <Grid container item xs={12}>
                        <Grid container item xs={3}>
                            <RadialMenu count={4} direction="Right"/>
                        </Grid>
                        <Grid container item xs={3}>
                            <RadialMenu count={5} direction="Right"/>
                        </Grid>
                        <Grid container item xs={3}>
                            <RadialMenu count={5} direction="Right"/>
                        </Grid>
                        <Grid container item xs={3}>
                            <RadialMenu count={1} direction="Left"/>
                        </Grid>
                    </Grid>
                </>;
    }
};

export default Pie;