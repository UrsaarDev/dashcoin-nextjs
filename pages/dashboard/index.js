import { withAuth } from "/HOC/withAuth";
import React from 'react';
// import redirect from '/utils/redirect';
import { Component } from 'react';
import { Button, TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,IconButton, Table ,TableBody ,TableCell ,TableContainer ,TableHead ,TableRow ,Paper } from "@material-ui/core";
import ExitIcon from "@material-ui/icons/ExitToAppRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import RemoveIcon from "@material-ui/icons/RemoveCircleRounded";
import Router from 'next/router';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import {doSetCurrentUser} from '/redux/actions/authAction';
import {doGetWholeProducts, doChangeVal, doAddNewProduct, doRemoveProduct} from '/redux/actions/productAction';
import Pie from "/pages/radial";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
            mounted:false
        }
        if (typeof window !== "undefined") {
            this.props.doSetCurrentUser(jwt_decode(window.localStorage.getItem('jwtToken')));
            this.props.doGetWholeProducts();
        }
    }
    componentDidMount() {
        this.doAddNewProduct = this.doAddNewProduct.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.setState({ mounted : true });
        this.socket = io.connect("http://localhost:3001");
        this.socket.emit('message', jwt_decode(window.localStorage.getItem('jwtToken')).email);
    }
    changeVal(flag, e) {
        this.props.doChangeVal( flag, e.target.value );
    }
    doLogout() {
        alert('logout');
        localStorage.removeItem('jwtToken');
        Router.push('/');
    }
    handleClickOpen() { this.setState({ isOpen : true}); }
    handleClose() { this.setState({ isOpen : false}); }

    //CRUD
    doAddNewProduct() {
        var formData = {
            prodname : this.props.curFormData.prodname,
            calories : this.props.curFormData.calories,
            fat : this.props.curFormData.fat,
            carbs : this.props.curFormData.carbs,
            protein : this.props.curFormData.protein,
        };
        this.props.doAddNewProduct(formData);
        this.setState({ isOpen : false});
    }
    doEditProduct = (where) => {
        Router.push(`/dashboard/${where}`);
    }
    doRemoveProduct = (where) => {
        this.props.doRemoveProduct({where : where});
    }

    renderProducts() {
        return  this.props.products.map((each , i) =>
                    <TableRow key={i}>
                        <TableCell>{each.prodname}</TableCell>
                        <TableCell align="right">{each.calories}</TableCell>
                        <TableCell align="right">{each.fat}</TableCell>
                        <TableCell align="right">{each.carbs}</TableCell>
                        <TableCell align="right">{each.protein}</TableCell>
                        <TableCell align="center">
                            <IconButton size='small' onClick={() => this.doEditProduct(each._id)} variant="contained" color="secondary">
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton size='small' onClick={() => this.doRemoveProduct(each._id)} variant="contained" color="secondary">
                                <RemoveIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
        );
    }
    render() {
        if(!this.state.mounted) return null;
        else return (
            <div>
                <h1>Dashboard</h1>
                <h2>Welcome {this.props.user.email}</h2>
                <Button variant="contained" style={{fontFamily:'Poppins'}} color="primary" onClick={this.handleClickOpen.bind(this)}>
                    Add
                </Button>
                <Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField margin="dense" onChange={this.changeVal.bind(this,0)} label="Product Name" type="text" fullWidth autoFocus/>
                        <TextField margin="dense" onChange={this.changeVal.bind(this,1)} label="Calories" type="text" fullWidth />
                        <TextField margin="dense" onChange={this.changeVal.bind(this,2)} label="Fat" type="text" fullWidth />
                        <TextField margin="dense" onChange={this.changeVal.bind(this,3)} label="Carbs" type="text" fullWidth />
                        <TextField margin="dense" onChange={this.changeVal.bind(this,4)} label="Protein" type="text" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <IconButton onClick={this.handleClose} style={{fontFamily:'Poppins'}} color="secondary" >
                            <ExitIcon />
                        </IconButton>
                        <Button onClick={this.doAddNewProduct} style={{fontFamily:'Poppins'}} color="primary" variant='contained'>
                            Go
                        </Button>
                    </DialogActions>
                </Dialog>
                <div style={{backgroundColor:'#f5f5f5',padding:10}}>
                    <TableContainer component={Paper}>
                        <Table size='small' aria-label="dense table" style={{fontFamily:'Poppins'}}>
                            <TableHead>
                                <TableRow style={{backgroundColor:'#c3e6cb'}}>
                                    <TableCell><b>Dessert (100g serving)</b></TableCell>
                                    <TableCell align="right"><b>Calories</b></TableCell>
                                    <TableCell align="right"><b>Fat&nbsp;(g)</b></TableCell>
                                    <TableCell align="right"><b>Carbs&nbsp;(g)</b></TableCell>
                                    <TableCell align="right"><b>Protein&nbsp;(g)</b></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.products!==undefined && this.renderProducts()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <IconButton onClick={this.doLogout.bind(this)} variant="contained" color="secondary">
                    <ExitIcon /> Logout
                </IconButton>
                <Pie count={5}/>
            </div>
        );
    }
};

function fromStore ( store ) {
    return {
        user : store.authReducer.user,
        products : store.productReducer.filteredProducts,
        curFormData : {
            prodname : store.productReducer._prodname,
            calories : store.productReducer._calories,
            fat : store.productReducer._fat,
            carbs : store.productReducer._carbs,
            protein : store.productReducer._protein,
        }
    };
}
  
export default connect(fromStore, {
    doSetCurrentUser,
    doGetWholeProducts,
    doChangeVal,
    doAddNewProduct,
    doRemoveProduct,
})(withAuth(Dashboard));