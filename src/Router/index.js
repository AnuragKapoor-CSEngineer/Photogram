import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home/index';
import Header from '../Header/index';
import Upload from '../Upload/index';
import NotFound from '../NotFound/index';
import axios from 'axios';
import * as firebase from "firebase/app";
import "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyDTMbfXuJz2PWEfSivvB2kMohaa_xUeTjM",
    authDomain: "photogram-b3719.firebaseapp.com",
    databaseURL: "https://photogram-b3719.firebaseio.com",
    projectId: "photogram-b3719",
    storageBucket: "",
    messagingSenderId: "750029082605",
    appId: "1:750029082605:web:7e2e903889742510"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default class index extends Component {
    constructor()
    {
        super();
         this.state = { title: "", subtitle: "", description: "", image: "" ,db:[],user:"",buttonValue:"Login",buttonfunction:true}
         
    }
    getTitle = (e) => {
        this.setState({ title: e.target.value });
    }
    getSubTitle = (e) => {
        this.setState({ subtitle: e.target.value });
    }
    getDescription = (e) => {
         this.setState({description:e.target.value});
        
    }
    getImage = (e) => {
        let fd = new FormData();
        fd.append('file', e.target.files[0]);
        axios.post("/addImage", fd, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        }).then((res => {
            this.setState({
                image: res.data
            })
            
        }))
    }
    sendvalue=()=>{
         
        axios.post("/add",this.state).then((res)=>{console.log(res.data)});
     this.setdb();
     console.log(this.state.db);
     }
     setdb=()=>{
         let arr= this.state.db;
         let value= {title:this.state.title,subtitle:this.state.subtitle,description:this.state.description,image:this.state.image}
          arr.push(value);
          this.setState({
              db: arr
          })
        }
        googleLogin=()=>{
            var provider = new firebase.auth.GoogleAuthProvider();
        
        
            firebase.auth().signInWithPopup(provider).then((result)=> {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
            this.setState({user: user.email,buttonValue:"Logout",buttonfunction:false});
            axios.get("/read/"+this.state.user).then((res)=>{
              this.setState({
                  db: res.data
              })
                      
            })
              // ...
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          }
          logout=()=>{
            firebase.auth().signOut().then(()=> {
            this.setState({user:"",buttonValue:"Login",buttonfunction:true,db:[]})
           }).catch(function(error) {
            // An error happened.
            });
        }  
        delete=(item,i)=>{
        axios.delete("/delete/"+item._id).then((res)=>{
         let a = this.state.db;
         a.splice(i,1);    
         this.setState({db:a});
        })
            
        }

    render() {
        if(this.state.user)
        {
            return (
                <Router>
                    <Header  googleLogin={this.googleLogin} logout={this.logout} buttonValue={this.state.buttonValue} buttonfunction={this.state.buttonfunction}></Header>
                    <Switch>
                        <Route exact path="/" render={(props)=><Home {...props} db={this.state.db} d={this.delete}></Home>}></Route>
                        <Route path="/upload" render={(props)=><Upload {...props} sendvalue={this.sendvalue} data={this.state} getTitle={this.getTitle} getSubTitle={this.getSubTitle} getDescription={this.getDescription} getImage={this.getImage}></Upload>}></Route>            
                    </Switch>
                </Router>
                )
        }
        else
        {
            return(
                <Router>
                <Header  googleLogin={this.googleLogin} logout={this.logout} buttonValue={this.state.buttonValue} buttonfunction={this.state.buttonfunction}></Header>
                <Switch>
                    <Route exact path="/" render={(props)=><NotFound {...props} ></NotFound>}></Route> 
                </Switch>
            </Router>
                
            )
        }
    }
}
