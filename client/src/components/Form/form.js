import React from 'react';
import './form.css';
import Navbar from '../Navbar/Navbar';

function form (props){
    return(

        <React.Fragment>
            <Navbar/>
            <div className="container mt-5"> 
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col=md-6 py-3">
                    <div id="login-box" className="col-md-12">
                        <form
                        id="login-form"
                        className="form"
                        method="post"
                        onSubmit={props.onSubmit}>
                            {props.children}
                        </form>
                    </div>
                </div>
            </div>

        </div>
        </React.Fragment>
        
    );
}
export default form;