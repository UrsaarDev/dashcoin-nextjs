import { withAuthSigned } from "/HOC/withAuth";
import { Component } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";
import { Button, TextField, CardContent, CardActions, Card, Avatar } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import usedStyles from '/assets/jss/login';
import Router from 'next/router';
import {} from 'react';
import { connect } from 'react-redux';
import * as Actions from '/redux/actions/authAction';

const navbarTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
  }
});

const textFieldTheme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mounted:false
    }
  }
  doLoginUser(e) {
    var formData = {
      username_email : this.props.curFormData.username_email,
      password : this.props.curFormData.password
    }
    this.props.doLoginUser(formData, Router, document.getElementById('myform'));
  }
  
  changeVal(flag, e) {
    this.props.doChangeVal( flag, e.target.value );
  }
  
  pressEnter(e) {
    if(e.which === 13) {
      var formData = {
        username_email : this.props.curFormData.username_email,
        password : this.props.curFormData.password
      }
      this.props.doLoginUser(formData, Router, document.getElementById('myform'));
    }
  }
  renderValidStatus(whichInput, status) {
    if(whichInput === 1) if(status) return "Email required"; else return " ";
    if(whichInput === 2) if(status) return "Password required"; else return " ";
  }
  renderErrorCode() {
    if(this.props.authErrorCode === 0) return "ok, wait permission";
    if(this.props.authErrorCode === 1) return "unavailable user";
    if(this.props.authErrorCode === 2) return "password incorrect";
  }
  componentDidMount() {
    this.setState({ mounted : true });
    this.props.doUpdateErrorCode();
  }

  render() {
    const { classes } = this.props;
    if(!this.state.mounted) return null;
    return  <div align='center' style={{marginTop:'11%'}}>
              {(this.props.jwtToken !== undefined && this.props.authErrorCode !== -1) && 
                <Alert severity={(this.props.authErrorCode === 0) ? "warning" : "error"} style={{marginBottom:20,width:250,textTransform: 'uppercase',fontFamily: 'Poppins',fontWeight:'bold'}}>
                  {this.renderErrorCode()}
                </Alert>
              }
              <Card style={classes.cardCategory}>
                <form id='myform'>
                  <CardContent>
                    <div variant="body2" className='mt-3' style={{textAlign:'center'}}>
                      <Avatar style={classes.largeAva} src="../images/57.jpg" />
                      <ThemeProvider theme={textFieldTheme}>
                        <TextField
                          error={this.props.isValidEmail}
                          onChange={this.changeVal.bind(this,1)}
                          onKeyUp={this.pressEnter.bind(this)}
                          id='email'
                          type="text"
                          helperText={this.renderValidStatus(1,this.props.isValidEmail)}
                        />
                        <TextField
                          error={this.props.isValidPassword}
                          onChange={this.changeVal.bind(this,2)}
                          onKeyUp={this.pressEnter.bind(this)}
                          id='password'
                          type="password"
                          helperText={this.renderValidStatus(2,this.props.isValidPassword)}
                        />
                      </ThemeProvider>
                    </div>
                  </CardContent>
                  <ThemeProvider theme={navbarTheme}>
                    <CardActions align="center" style={{paddingTop:0}}>
                        <Button onClick={this.doLoginUser.bind(this)} style={classes.loginBtn} size='small' color='primary' variant="contained">Login</Button>
                    </CardActions>
                    <div style={{padding:14}}>
                      <Link style={classes.signupLink} variant="body2" color='secondary' href='/auth/amnesia'>
                        forgot password?
                      </Link><br />
                      <Link style={classes.signupLink} variant="body2" color='secondary' href='/auth/signup'>
                        u do not have an account?
                      </Link>
                    </div>
                  </ThemeProvider>
                </form>
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
                  #email, #password {
                    font-family:'Poppins';
                  }
                `}
              </style>
            </div>;
  }
}

function fromStore ( store ) {
  return {
    jwtToken : store.authReducer.jwtToken,
    authErrorCode : store.authReducer.authErrorCode,
    isValidEmail : store.authReducer.isValidEmail,
    isValidPassword : store.authReducer.isValidPassword,
    curFormData : {
      username_email : store.authReducer._email,
      password : store.authReducer._password
    }
  };
}

export async function getStaticProps() {
  return { props: {classes : usedStyles }};
}

export default connect(fromStore, Actions)(withAuthSigned(Login));