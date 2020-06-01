import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm'
import Rank from "./Components/Rank/Rank";
import FaceRecognition from './Components/Facerecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'

import './App.css';
import Particles from 'react-particles-js';


    
    const particlesOption = {
      particles:{
        number:{
          value  : 100,
          density: {
            enable    : true,
            value_area: 800
          }
        }
      }
    }
    const initialState = {
      input :'',
      imgUrl:'',
      box : [],
      route : 'signin',
      IsSignin : false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'',
        joined:''
      }
    }
    class App extends Component {
      constructor(){
        super()
        this.state= initialState
      }

      calculateFaceLcation = (data) =>{
        const clarifaiFace =  data.outputs[0].data.regions;
        if(clarifaiFace === undefined){
          return [];
        }
        const img = document.getElementById('faceImg');
        const width= Number(img.width);
        const height = Number(img.height);


        const faceLocation = clarifaiFace.map(region => {
          const box = region.region_info.bounding_box;
              return {
                // calculate distance to borders of the image
                top: box.top_row * height,
                left: box.left_col * width,
                bottom: height - (box.bottom_row * height),
                right: width - (box.right_col * width)
              };

        })
        return faceLocation;
      }

      loadUser = (data) => {
        this.setState({
          user:{
            id:data.id,
            name:data.name,
            email:data.email,
            password:data.password,
            entries:data.entries,
            joined:data.joined
          }
        })
      }

      displayBox = (box) => {
        this.setState({box : box});
      }

    onBtnClick = () =>{
      this.setState({imgUrl: this.state.input});
      fetch('https://calm-wildwood-26382.herokuapp.com/image', {
        method : 'post',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({
           input:this.state.input
          })
      }).then(res => res.json())
      .then ( response => {
        if(response){
          
          this.displayBox(this.calculateFaceLcation(response));
          fetch('https://calm-wildwood-26382.herokuapp.com/image',{
            method : 'put',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
               id:this.state.user.id
          })}).then(response => response.json()).then(count => {
           
              this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
       

      } ).catch((err) => err)
    }
      // response.outputs[0].data.regions[0].region_info.bounding_box
    onInputChange = (event)=>{
        this.setState({input:event.target.value});
    }
    routeChange = (route) => {
      if(route === 'signout'){
        this.setState(initialState);
      }else if(route === 'home'){
        this.setState({IsSignin : true});
      }
      this.setState({route:route});
    }
      render() {  
            return(      
                <div className='App'>
                     <Particles className = "particles" params = {particlesOption} />
                      <Navigation isSignin ={this.state.IsSignin} routeChange ={this.routeChange} />
                {(this.state.route === 'home')
                               ? <div><Logo/>
                                <Rank name ={this.state.user.name} entries = {this.state.user.entries} />
                               <ImgLinkForm onInputChange={this.onInputChange} onBtnClick={this.onBtnClick} imgSrc={this.state.imgUrl} />
                                <FaceRecognition imgUrl ={this.state.imgUrl} box={this.state.box} />
                                </div>
                                :(
                                  this.state.route === 'signin'?<SignIn  routeChange ={this.routeChange} loadUser = {this.loadUser} toggleErrMsg = {this.toggleErrMsg} />:<Register routeChange ={this.routeChange} loadUser={this.loadUser} />  
                                )
                  }
                            </div>
                    )
                  
      }
        
      
    }

    export default App;





    // "start": "serve -s build",