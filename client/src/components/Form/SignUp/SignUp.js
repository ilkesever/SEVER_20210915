import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../form.css';
import Form from '../form';
import axios from 'axios';


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            redirect: localStorage.getItem('userTokenTime')?true: false
        }
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
        this.onChangeHandler= this.onChangeHandler.bind(this);
    }

    onSubmitHandler(e){
        e.preventDefault();
        if (!(this.state.firstName==='' || this.state.lastName==='' || this.state.email==='' || this.state.password==='') &&
        (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)))
        {
            axios.post('/api/signUp', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            .then(res=>{
                this.setState({
                    redirect: true
                });
            })
            .catch(err=>{
                console.log(err);
            });   
        }
        else{
            alert("Please enter valid details");
        }


    }

    onChangeHandler(event){
        //console.log("Name:" + event.target.name + "\n value" +event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        if (this.state.redirect) return <Redirect to='/' />
        return(
            <Form onSubmit={this.onSubmitHandler.bind(this)}>
                <h3 className="text-center text-info">Register</h3>
                <div className="form-group">
                    <label htmlFor="first-name" className="text-info">First Name:</label><br/>
                        <input 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        id="first-name"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        required/>
                </div>

                <div className="form-group">
                    <label htmlFor="first-name" className="text-info">Last Name:</label><br/>
                    <input 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        id="last-name"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        required/>
                </div>

                <div className="form-group">
                    <label htmlFor="first-name" className="text-info">Email:</label><br/>
                    <input 
                        type='email'
                        placeholder="example@domain.com"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="first-name" className="text-info">Password:</label><br/>
                    <input 
                        type="password"
                        placeholder="***********"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        required/>
                </div>
                <div className="d-flex justify-content-between align-item-end">
                    <input 
                        type="submit"
                        name="submit"
                        value="Register"
                        className="btn btn-info btn-md"/>
                        <Link to='/signIn' className="text-info" >Login Here</Link>
                </div>
            </Form>      
        );
    }
}
export default SignUp;