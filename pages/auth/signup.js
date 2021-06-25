import { withAuthSigned } from "/HOC/withAuth";
import { Component } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import { Grid, Button, TextField, CardContent, CardActions, Card } from "@material-ui/core";
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted : false};
  }
  
  componentDidMount() {
    this.setState({ mounted : true});
  }

  doRegisterUser() {
    var formData = {
      username : this.props.curFormData.username.trim(),
      email : this.props.curFormData.email.trim(),
      password : this.props.curFormData.password.trim()
    }
    this.props.doRegisterUser(formData);
  }
  
  changeVal(flag, e) {
    this.props.doChangeVal( flag, e.target.value );
  }

  renderValidStatus(whichInput, status) {
    if(whichInput === 0) if(status) return "Username required"; else return "";
    if(whichInput === 1) if(status) return "Email required"; else return "";
    if(whichInput === 2) if(status) return "Password required"; else return "";
  }

  renderErrorCode() {
    if(this.props.regErrorCode === 0) return "registration completed";
    if(this.props.regErrorCode === 1) return "empty credentials";
    if(this.props.regErrorCode === 2) return "already exists";
  }

  render() {
    const { classes } = this.props;
    if(!this.state.mounted) return null;
    return  <div align='center' style={{marginTop:'15%'}}>
              {this.props.regErrorCode !== -1 && 
                <Alert severity={(this.props.regErrorCode === 0) ? "success" : "error"} style={{marginBottom:20,width:250,textTransform: 'uppercase',fontFamily: 'Poppins',fontWeight:'bold'}}>
                  {this.renderErrorCode()}
                </Alert>
              }
              <Card style={classes.signupWindow}>
                  <CardContent>
                    <div variant="body2" className='mt-3' style={{textAlign:'center'}}>
                      <ThemeProvider theme={textFieldTheme}>
                      <Grid container spacing={3} alignItems="flex-start">
                          <Grid item xs={4} style={{marginTop:5}}>
                            <span className='groupText'>Username</span>
                          </Grid>
                          <Grid item sm xs={8}>
                            <TextField
                              error={this.props.isValidUsername}
                              onChange={this.changeVal.bind(this,0)}
                              id='username'
                              type="text"
                              helperText={this.renderValidStatus(0,this.props.isValidUsername)}
                            />
                          </Grid>
                        </Grid>

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
                      <Button size='small' style={classes.regBtn} onClick={this.doRegisterUser.bind(this)} color='secondary' variant="contained" >Register</Button>
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
    regErrorCode : store.authReducer.regErrorCode,
    isValidUsername : store.authReducer.isValidUsername,
    isValidEmail : store.authReducer.isValidEmail,
    isValidPassword : store.authReducer.isValidPassword,
    curFormData : {
      username : store.authReducer._username,
      email : store.authReducer._email,
      password : store.authReducer._password
    }
  };
}

export async function getStaticProps() {
  return { props: {classes : usedStyles }};
}

export default connect(fromStore, Actions)(withAuthSigned(Register));