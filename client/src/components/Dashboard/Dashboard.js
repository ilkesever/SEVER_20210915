import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import packageJson from '../../../package.json';

class Dashboard extends React.Component{
    constructor( props ){
        super( props );

        let shouldRedirect = false;
        if(localStorage.getItem('userTokenTime')){
            //check if user holds token which is valid in accordance to time
            const data = JSON.parse(localStorage.getItem('userTokenTime'));
            if (new Date().getTime()- data.time > (1*60*60*1000)){
                // It's been more than hour since you have visited dashboard
                localStorage.removeItem('userTokenTime');
                shouldRedirect= true;
            }
        }
        else{
            shouldRedirect= true;
        }

        this.state={
            redirect: shouldRedirect,
            videoList: []
        }
       
    }

    componentDidMount(){
        if(localStorage.getItem('userTokenTime')){
            axios.get(packageJson.proxy + '/api/videoList', {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            }).then(res => {
                this.setState({
                    videoList: res.data
                });
            });
        }
    }

    render(){
        if (this.state.redirect) 
           return <Redirect to="/signIn"/>
        
            const videos= this.state.videoList.map(video =>{
                return(
                    <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" style={{paddingBottom:'50px'}}  key={video._id}>
                        <Link to={'/video/'+ video.upload_title}>
                            <div className="video-thumbnail">
                                <img src={video.thumbnail_path} alt="video thumbnail" title={ video.upload_title}/>
                            </div>
                        </Link>
                        <span className="username">
                        <Link to={'/api/videos/' + video.upload_title}>
                            Category: {video.category[0].categoryName}
                            </Link>
                        </span>
                        <span className="video-title">Title:  {video.upload_title.replace(/_/g, ' ')} </span>
                    </div>
                )
            })
        return(
            <React.Fragment>
               <Navbar/>
                <div className="container mt-5">
                    <h4> Videos </h4>
                    <hr className="my-4" />
                    <div className="streams row">
                        {videos}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Dashboard;