import React,{Fragment} from 'react';
import '../styles/signup.css';
import Bcryptjs from 'bcryptjs';
//Sign up component
class SignUp extends React.Component{
	//for displaying success or error messages.
	state={
		err_msg:[],
		success_msg:[]
	}
	//sign up event handler
	signUp = async ()=>{
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		//validation
		let err=[];
		if(username<6) err.push('Username should be greater than 6 letters.');
		if(password<6) err.push('Password should be greater than 6 letters.');
		if(localStorage.getItem("users")){
			let user_found=false;
			for(let user of JSON.parse((localStorage.getItem("users")))){
				if(username===user.username) user_found=true;
			}
			if(user_found) err.push('This username already exists.');
		}
		if(err.length){
			this.setState({
				err_msg:[...this.state.err_msg,...err]
			})
			return;
		}

		//encrypting password.
		const salt= await Bcryptjs.genSalt(10);
		password=await Bcryptjs.hash(password,salt);
		//adding new user to local storage
		if(localStorage.getItem("users")){
			let users_arr=JSON.parse(localStorage.getItem("users"));
			users_arr.push({
				username,
				password
			})
			localStorage.setItem("users",JSON.stringify(users_arr))
		}else{
			let users_arr=[];
			users_arr.push({
				username,
				password
			})
			localStorage.setItem("users", JSON.stringify(users_arr))
		}
		// setting success msg state
		this.setState({
			success_msg:['yay! your account is registered! please sign in.']
		})
		//clearing the feilds.
		document.getElementById("username").value='';
		document.getElementById("password").value='';
	}

	resetState=()=>{
		this.setState({
			err_msg:[],
			success_msg:[]
		})
	}
	render(){
		
		let err=this.state.err_msg.map((msg,i)=>{
			return(
				<div className="alert alert-danger" role="alert" key={i}>
					{msg}
					<button type="button" className="close" onClick={this.resetState}>
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
		})

		let success=this.state.success_msg.map((msg,i)=>{
			return(
				<div className="alert alert-success" role="alert" key={i}>
					{msg}
					<button type="button" className="close" onClick={this.resetState}>
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
		})

		return (
			<Fragment>

				<button style={{'padding': '6px 30px','border':'2px solid transparent'}} id="signup-btn" type="button" className="btn btn-primary" data-toggle="modal" data-target="#signupModal">
				  Sign Up
				</button>

				<div className="modal fade" id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				  <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">

				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLongTitle">Register on local storage!</h5>
				        <button style={{'color':'#f2f2f2'}} type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>

				      <div className="modal-body">
					    {err}
					    {success}
				      	<input type="text" tabIndex="5" name="url" maxLength="255" id="username"  placeholder="Username" className="input-element"/>
				      	<input type="password" tabIndex="7" name="password" maxLength="255" id="password" className="input-element" placeholder="Password"/>
				      </div>

				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.resetState}>Close</button>
				        <button id="signup-btn"type="button" className="btn btn-primary" onClick={this.signUp} >Sign Up</button>
				      </div>

				    </div>
				  </div>
				</div>

			</Fragment>
		);
	}
}

export default SignUp;