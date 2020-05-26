import React from 'react';

const Navigation = ({isSignin , routeChange}) => {
    if(isSignin ){
        return(
            <div>
                <nav style= {{display:'flex',justifyContent : 'flex-end'}}>
                    <p className="f3 link dim black pa3 underline pointer " onClick= {() => routeChange('signout')} >Sign Out </p>
                </nav>
            </div>
            )
    }
    else{
        return(
            <div>
                <nav style= {{display:'flex',justifyContent : 'flex-end'}}>
                    <p className="f3 link dim black pa3 underline pointer " onClick= {() => routeChange('signin')} >Signin </p>
                    <p className="f3 link dim black pa3 underline pointer " onClick= {() => routeChange('register')} >Register</p>
                </nav>
            </div>
            )
    }
   
}

export default Navigation;