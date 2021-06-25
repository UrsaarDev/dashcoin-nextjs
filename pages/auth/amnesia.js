import { Component } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import { ButtonBase, Grid, Button, TextField, CardContent, CardActions, Card } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import usedStyles from '/assets/jss/signup';

import { connect } from 'react-redux';
import * as Actions from '/redux/actions/authAction';

const navbarTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
  }
});

const textFieldTheme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

class Amnesia extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted : false};
  }
  
  componentDidMount() {
    this.setState({ mounted : true});
  }

  changeVal(flag, e) {
    this.props.doChangeVal( flag, e.target.value );
  }

  doCureAmnesia() {
    var formData = {
        email : this.props.curFormData.email,
        password : this.props.curFormData.password
    }
    this.props.doCureAmnesia(formData);
  }
  
  renderValidStatus(whichInput, status) {
    if(whichInput === 1) if(status) return "Email required"; else return "";
    if(whichInput === 2) if(status) return "Password required"; else return "";
  }

  renderErrorCode() {
    if(this.props.cureErrorCode === 0) return "ok, wait permission";
    if(this.props.cureErrorCode === 1) return "unavailable user";
  }

  render() {
    const { classes } = this.props;
    if(!this.state.mounted) return null;
    return  <div align='center' style={{marginTop:'15%'}}>
                { this.props.cureErrorCode !== -1 &&
                    <Alert severity={ (this.props.cureErrorCode === 0) ? "warning" : "error"} style={{marginBottom:20,width:250,textTransform: 'uppercase',fontFamily: 'Poppins',fontWeight:'bold'}}>
                        {this.renderErrorCode()}
                    </Alert>
                }
                <Card style={classes.signupWindow}>
                    <CardContent>
                        <div variant="body2" className='mt-3' style={{textAlign:'center'}}>
                        <ThemeProvider theme={textFieldTheme}>
                            <Grid container spacing={3} alignItems="flex-start">
                            <Grid item xs={4} style={{marginTop:5}}>
                                <span className='groupText'>Email</span>
                            </Grid>
                            <Grid item sm xs={8}>
                                <TextField
                                error={this.props.isValidEmail}
                                onChange={this.changeVal.bind(this,1)}
                                id='email'
                                type="email"
                                helperText={this.renderValidStatus(1,this.props.isValidEmail)}
                                />
                            </Grid>
                            </Grid>
                            
                            <Grid container spacing={3} alignItems="flex-start">
                            <Grid item xs={4} style={{marginTop:5}}>
                                <span className='groupText'>Password</span>
                            </Grid>
                            <Grid item sm xs={8}>
                                <TextField
                                error={this.props.isValidPassword}
                                onChange={this.changeVal.bind(this,2)}
                                id='password'
                                type="password"
                                helperText={this.renderValidStatus(2,this.props.isValidPassword)}
                                />
                            </Grid>
                            </Grid>
                            
                        </ThemeProvider>
                        </div>
                    </CardContent>
                    <CardActions align="center" style={{paddingTop:0}}>
                        <ThemeProvider theme={navbarTheme}>
                        <Button size='small' style={classes.regBtn} onClick={this.doCureAmnesia.bind(this)} color='secondary' variant="contained" disabled={!(!this.props.isValidEmail && !this.props.isValidPassword === true)}>Forgot, new</Button>
                        <Button size='small' style={classes.backBtn} variant="contained" color='primary' href="/auth/login">
                            Back
                        </Button>
                        </ThemeProvider>
                    </CardActions>
                </Card>
                <style jsx global>
                    {`
                    html {
                        height: 100%;
                    }
                    body {
                        margin:0;
                        min-height: 100%;
                        background-image: url('/images/back.png');
                        background-size: 100% 100%;
                        backdrop-filter: blur(15px);
                    }
                    #__next {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                    #username, #email, #password {
                        font-family:'Poppins';
                    }
                    .groupText {
                        font-family:'Poppins';
                    }
                    `}
                </style>
            </div>;
  }
}

function fromStore ( store ) {
    return {
        cureErrorCode : store.authReducer.cureErrorCode,
        isValidEmail : store.authReducer.isValidEmail,
        isValidPassword : store.authReducer.isValidPassword,
        curFormData : {
            email : store.authReducer._email,
            password : store.authReducer._password
        }
    };
}

export async function getStaticProps() {
  return { props: {classes : usedStyles }};
}

export default connect(fromStore, Actions)(Amnesia);