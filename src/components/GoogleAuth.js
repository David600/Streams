import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load( 'client:auth2', () => {
            window.gapi.client.init({
                clientId: '541316359913-e95u14o6mv42n8uhic8d47f3mvboalm4.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onSignInClick = () => {
        this.auth.signIn(this.auth.currentUser.get().getId());
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    onAuthChange = isSignedIn => {
        if(isSignedIn){
            this.props.signIn()
        }else{
            this.props.signOut()
        }

    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        } else if(this.props.isSignedIn) {
            return (
                <button onClick = {this.onSignOutClick } className = "ui red google button">
                    <i className = "google icon"/>
                    Sign out
                </button>
            );
        } else {return (
            <button onClick = {this.onSignInClick} className = "ui red google button">
                <i className = "google icon"/>
                Sign in with Google
            </button>
        )}
    };
    render(){
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state =>{
     return{ isSignedIn: state.auth.isSignedIn }; 
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);