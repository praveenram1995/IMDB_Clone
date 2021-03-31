import React,{Component,Fragment} from 'react';
import '../styles/Navbar.css'
import Signin from './signin';
import Signup from './signup';
import Signout from './signout';
import NewPost from './NewPost';
import jwt from 'jsonwebtoken';

class Navbar extends Component{
    checkloggedin=()=>localStorage.getItem('loginToken')?true:false;
    state={
        isLoggedin:this.checkloggedin()
    }
    changeState=()=>{
        this.setState({
            isLoggedin:!this.state.isLoggedin
        })
    }
    getUsername=() => jwt.verify(localStorage.getItem('loginToken'),'ThisIsABigSecret');
    render(){
        const login_logout_render = this.state.isLoggedin ?
                                        <Fragment>
                                        <li>
                                            <a>Welcome {(localStorage.getItem('loginToken'))?this.getUsername().username:''}</a>
                                        </li> 
                                        <li>
                                            <Signout changeState={this.changeState}/>
                                        </li> 
                                        </Fragment>:
                                        <Fragment>
                                            <li>
                                                <Signin changeState={this.changeState}/>
                                            </li>
                                            <li>
                                                <Signup/>
                                            </li>
                                        </Fragment>;
        return (
            <header>
            <div>
                <a className="btn btn-primary" style={{'backgroundColor':'transparent','border':'2px solid transparent','marginRight':'10px'}}>
                    <img src='images/imgurLogo.svg'/>
                </a>
                <NewPost/>
            </div>    
                <nav>
                    {login_logout_render}
                </nav>
            </header>
        );
    }
}

export default Navbar;