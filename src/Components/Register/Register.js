import React,{Component} from 'react';
class Register extends Component {
    constructor(props){
        super(props)
         this.state={
            isFilled : true,
            toggleClassName : 'dn red  hover-dark-red b',
             email: '',
             password:'',
             name:''
         }
    }
    onRegisterEmail = (event) =>{
        this.setState({email : event.target.value});
    }
    onRegisterName = (event) =>{
        this.setState({name : event.target.value});
    }
    onRegisterPassword= (event) =>{
     this.setState({password : event.target.value});
  }
  toggleErrMsg=() => {
    var css = (this.state.isFilled === true) ?  " dn red  hover-dark-red b" : "db red  hover-dark-red b";
    this.setState({toggleClassName: css});
 
  }
     onRegister = () => {
         fetch('https://nameless-temple-70603.herokuapp.com/register',{
             method : 'Post',
             headers:{'Content-Type' : 'application/json'},
             body: JSON.stringify({
                 email : this.state.email,
                 password: this.state.password,
                 name: this.state.name
             })
               }).then(Response => Response.json())
               .then(user => {
                   if(user.id){
                    this.props.loadUser(user);
                    this.props.routeChange('home');
                    this.setState({isFilled : true})
                   }
                   else{
                       this.setState({isFilled:false})
                       this.toggleErrMsg()
                   }
               })
 }

    render(){
        return(
            <div className= 'br3 ba  b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onRegisterName} type="text" name="name"  id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onRegisterEmail} type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange= {this.onRegisterPassword} type="password" name="password"  id="password"/>
                    </div>
                    <p className= {this.state.toggleClassName} >**Information insufficent</p>
                </fieldset>
                
                    <div className ="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"  onClick={this.onRegister} />
                    </div>
                </div>
            </main>
            </div>
        )
    }
}
export default  Register;