import React,{Fragment} from 'react';
import '../styles/signup.css';
import jwt from 'jsonwebtoken';

class NewPost extends React.Component{
	state={
		err_msg:[]
	}
	addPost=()=>{
		const title=document.getElementById('title').value;
		const url=document.getElementById('url').value;
		//validation
		let err=[];
		if(title==='') err.push('title is required!');
		if(url==='') err.push('url is required!');
		if(err.length){
			this.setState({
				err_msg:[...this.state.err_msg,...err]
			})
		}else{
			//adding post to local storage.
			let Posts=localStorage.getItem('Posts');
			if(Posts){
				Posts=JSON.parse(Posts);
			}else{
				Posts=[];
			}
			Posts.push({
					id:Posts.length,
					title:title,
					img:url,
					author:jwt.verify(localStorage.getItem('loginToken'),'ThisIsABigSecret').username,
					upVotes:0,
					comments:[],
					views:0
				});
			localStorage.setItem('Posts',JSON.stringify(Posts));

			window.location.reload();
		}
	}
	resetState=()=>{
		this.setState({
			err_msg:[]
		})
	}
	render(){
		const err=this.state.err_msg.map(e=>{
			return(
				 <div className="alert alert-danger" role="alert">
					{e}
					<button type="button" className="close" onClick={this.resetState}>
					<span aria-hidden="true">&times;</span>
					</button>
				 </div>
			)
		})

		return(
			<Fragment>
				<button className="btn btn-primary" style={{'backgroundColor':'#1bb76e','border':'2px solid #1bb76e'}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#NewPostModal">
                	<img style={{'marginRight':'6px'}} src="https://s.imgur.com/desktop-assets/desktop-assets/icon-new-post.13ab64f9f36ad8f25ae3544b350e2ae1.svg"/>
                	New post
                </button>

				<div className="modal fade" id="NewPostModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				  <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">

				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLongTitle">Add a new post here !</h5>
				        <button id="close" style={{'color':'#f2f2f2'}} type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>

				      <div className="modal-body">
				      	{err}
				      	{
				      		(!localStorage.getItem('loginToken'))?
				      		<p>Please...! Sign in inorder to post a image!</p>:
				      		<Fragment>
				      		<input type="text" tabIndex="5" name="title" maxLength="255" id="title" className="input-element" placeholder="Enter your image title"/>
				      		<input type="text" tabIndex="5" name="url" maxLength="255" id="url"  placeholder="Paste your image url here" className="input-element"/>
				      		</Fragment>
				      	}
				      </div>

				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        {(localStorage.getItem('loginToken'))?<button id="signup-btn"type="button" className="btn btn-primary" onClick={this.addPost} >Add Post</button>:''}
				      </div>

				    </div>
				  </div>
				</div>
			</Fragment>
		)
	}
}

export default NewPost;