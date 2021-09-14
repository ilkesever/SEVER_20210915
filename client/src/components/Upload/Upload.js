import React from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { Redirect} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';
import Navbar from '../Navbar/Navbar';
import packageJson from '../../../package.json';

class Upload extends React.Component{
    constructor(){
        super();
        this.state={
            selectedVideos: null,
            loaded: 0,
            titleValue: '',
            categories: [],        
            selectedCategoryId: ''
        }
           this.fileChangeHandler=this.fileChangeHandler.bind(this);
           this.fileUploadHandler=this.fileUploadHandler.bind(this);
           this.maxSelectFile=this.maxSelectFile.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('userTokenTime')) {
            axios.get(packageJson.proxy + '/api/categoryList', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            }).then(res => {
                console.log(res.data);
                this.setState({
                    categories: res.data,
                    selectedCategoryId: res.data[0]._id
                });
            });
        }
    }
    
    

    fileChangeHandler( event ){
        //console.log("file changed");
        const files = event.target.files;
        if (this.maxSelectFile(event)){
            this.setState({
                selectedVideos:files,
                loaded:0
            });
        }
    }
    
    fileUploadHandler( event ){
        //console.log("file uploaded");
        
        if(this.state.selectedVideos==null)
        {
            alert("Select atleast one video file");
        }
        else{
            const data = new FormData();
            for (let i=0; i< this.state.selectedVideos.length; i++){
                data.append('file', this.state.selectedVideos[i]);   
            }
            data.append('title', this.state.titleValue);
            data.append('categoryid', this.state.selectedCategoryId);
            
            axios.post('/api/upload', data, {
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }},{
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
                    });
                }
            }).then( res => {
                toast.success("Upload Successful");
            }).catch(err =>{
                toast.error(`Upload fail with status : ${err.statusText}`);
            });
        }
        
    }

    maxSelectFile( event ){
       // console.log("max files selected");
       let files= event.target.files;
       if (files.length>1){
           toast.error("Maximun 1 file is allowed");
           event.target.value= null;
           return false;
       }
       else{
           let err="";
           for(let i=0; i<files.length; i++){
               if (files[i].size > 209715200){//200 mb
                err+= files[i].name +', ';
               }
           }
           if (err!== ''){
               //error caught
               event.target.value = null;
               toast.error(err + " is/are too large. Please select file size < 200Mb");
           }
       }
       return true;
    }

    updateInputValue(evt) {
        this.setState({
            titleValue: evt.target.value
        });
    }
    
    render(){
        if (!localStorage.getItem('userTokenTime')) 
                return <Redirect to="/signIn" />
        return(
            
            <React.Fragment>
                <Navbar />
                <div className="container mt-5 ">
                    <div className="form-group">
                        <ToastContainer/>
                    </div>
                    <h4>Upload Video</h4>
                    <hr className="my-4"></hr>
                    <form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={this.state.titleValue} className="form-control" onChange={evt => this.updateInputValue(evt)} />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={this.state.selectedCategoryId}
                                onChange={(e) => this.setState({ selectedCategoryId: e.target.value })}>
                                {this.state.categories.map((item) => <option key={item._id} value={item._id}>{item.categoryName}</option>)}
                            </select>
                        </div>
                        
                        <div className="form-group files ">
                            <label>Upload Your Video Here</label>
                            <input
                                type="file"
                                name="file"
                                className="form-control"
                                accept="video/quicktime,video/mp4"
                                onChange={this.fileChangeHandler.bind(this)}/>
                            <Progress 
                                max='100'
                                color="success"
                                value={this.state.loaded}
                                className='mt-4 mb-4'>
                                {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
                            </Progress>
                            <button
                                type="button"
                                className="btn btn-success btn-block"
                                onClick={this.fileUploadHandler.bind(this)}>
                                    Upload Video
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Upload;