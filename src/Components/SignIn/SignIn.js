import React , {Component} from 'react';
class SignIn extends Component {
   constructor(props){
       super(props)
        this.state={
            isCorrect : true,
            toggleClassName : 'dn red  hover-dark-red b',
            email: '',
            password:''
        }
   }
   onSignInEmail = (event) =>{
       this.setState({email : event.target.value});
   }
   onSignInPassword= (event) =>{
    this.setState({password : event.target.value});
 }
 
 toggleErrMsg=() => {
   var css = (this.state.isCorrect === true) ?  " dn red  hover-dark-red b" : "db red  hover-dark-red b";
   this.setState({toggleClassName: css});

 }
    onSignIn = () => {
        fetch('http://localhost:3000/signin',{
            method : 'Post',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.email,
                password: this.state.password
            })
              })
              .then(response => response.json())
            .then(user => {
                    if(user.id){
                    this.props.loadUser(user);
                    this.props.routeChange('home');
                    this.setState({isCorrect : true});
                    }
                    else{
                        this.setState({isCorrect : false});
                        this.toggleErrMsg()
                    }
                })
    
}
    render()
   { 
       return(
        <div className= 'br3 ba  b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black"
                    onChange = {this.onSignInEmail}
                    type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                    <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100  b--black"
                     onChange = {this.onSignInPassword} 
                     type="password" name="password"  id="password"/>
                    
                </div>
                <p className= {this.state.toggleClassName} >**Incorrect Username/Password</p>
            </fieldset>
            
                <div className ="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick= {this.onSignIn} value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                <p href="#0" className="f6 link pointer dim black db" onClick= {() => this.props.routeChange('register')}  >Register</p>
                </div>
            </div>
        </main>
        </div>
    )
}
}
export default  SignIn;