import React,{Fragment} from 'react';
import Bcryptjs from 'bcryptjs';
import '../styles/signup.css';
import jwt from 'jsonwebtoken';
//sign in component
class SignIn extends React.Component{
	constructor(props){
		super(props);
		//to display error messages
		this.state={
			err_msg:'',
			success_msg:'',
		}
	}
	//signin button handler function
	signIn=async ()=>{
		let username = document.getElementById("username-signin").value;
		let password = document.getElementById("password-signin").value;

		//validation
		if(localStorage.getItem("users")){
			let user_found;
			//searching for user in local storage.
			for(let user of JSON.parse((localStorage.getItem("users")))){
				if(username===user.username) {user_found=user;break;}
			}
			
			if(user_found){
				//comparing password
				let isValidPass= await Bcryptjs.compare(password,user_found.password);
				if(isValidPass){
					let token = await jwt.sign({
						username:user_found.username
					},'ThisIsABigSecret')
					this.setState({
						success_msg:'Yay! you are logged in!.'
					})
					localStorage.setItem("loginToken", token)
					document.getElementById('close-this').click();
				}else{
					this.setState({
						err_msg:'Invalid password'
					})
					return;
				}
			}else{
				this.setState({
					err_msg:'Entered username does not exists!.'
				})
				return;
			}
		}

		document.getElementById("username-signin").value='';
		document.getElementById("password-signin").value='';
		this.props.changeState();
	}

	resetState=()=>{
		this.setState({
			err_msg:'',
			success_msg:''
		})
	}
	render(){

		let err = (this.state.err_msg!=='')?<div className="alert alert-danger" role="alert">
												{this.state.err_msg}
												<button type="button" className="close" onClick={this.resetState}>
												<span aria-hidden="true">&times;</span>
												</button>
											 </div>
											 :'';

		let success = (this.state.success_msg!=='')?<div className="alert alert-success" role="alert">
														{this.state.success_msg}
														<button type="button" className="close" onClick={this.resetState}>
														<span aria-hidden="true">&times;</span>
														</button>
													</div>
													:'';

		return(
			<Fragment>

				<button id="signup-btn" style={{'backgroundColor':'transparent','padding': '6px 20px','border':'2px solid transparent'}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#SigninModal">
				  Sign In
				</button>

				<div className="modal fade" id="SigninModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				  <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">

				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLongTitle">Sign in to best Imgur clone</h5>
				        <button id="close-this" style={{'color':'#f2f2f2'}} type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>

				      <div className="modal-body">
				      	{err}
						{success}
				      	<input type="text" tabIndex="5" name="url" maxLength="255" id="username-signin"  placeholder="Username" className="input-element"/>
				      	<input type="password" tabIndex="7" name="password" maxLength="255" id="password-signin" className="input-element" placeholder="Password"/>
				      </div>

				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button id="signup-btn"type="button" className="btn btn-primary" onClick={this.signIn} >Sign In</button>
				      </div>

				    </div>
				  </div>
				</div>

			</Fragment>
		)
	}
}

export default SignIn;