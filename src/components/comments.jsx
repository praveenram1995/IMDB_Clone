import React,{Fragment} from 'react';
import jwt from 'jsonwebtoken';

class Comments extends React.Component{

	state={
		comments:this.props.comments.comments,
		id:this.props.comments.id
	}

	addComment=()=>{
		let commentText=document.getElementById(`comment-input${this.props.comments.id}${this.state.comments.length}`).value;
		let author=jwt.verify(localStorage.getItem('loginToken'),'ThisIsABigSecret').username;

		if(commentText===''){ return };

		let newComment={
			comment:commentText,
			author:author
		}
 
        //updating votes in localstorage
        let posts=JSON.parse(localStorage.getItem('Posts'))
        posts[this.props.comments.id].comments.push(newComment);
        this.setState({
        	comments:posts[this.props.comments.id].comments
        })
        localStorage.setItem('Posts', JSON.stringify(posts))
        document.getElementById(`comment-input${this.props.comments.id}${this.state.comments.length}`).value='';
    }

	render(){
		let comments=this.state.comments.map((comment,i)=>{
			return(
				<div className="comment" key={`${i}`}>
					<p style={{borderBottom:'1px solid #f2f2f2',paddingBottom:'10px'}}> <b>{comment.author}</b> : {comment.comment} </p>
				</div>
			)
		})
		let inputText=localStorage.getItem('loginToken')?'Write a comment':'Sign in to leave a comment'
		return(
			<Fragment>
			<div className="add-comment">
				{inputText==='Write a comment'?
				<div>
				<input  id={`comment-input${this.props.comments.id}${this.state.comments.length}`} style={{marginRight:'10px'}} className='input-element' type='text' placeholder={inputText}/>
				<button className='btn btn-secondary' onClick={this.addComment}>Post</button>
				</div>:
				<div>
				<input className='input-element' type='text' placeholder={inputText} disabled />
				</div>}
			</div>
			<div className="comments-list">
				<p style={{borderBottom:'1px solid #f2f2f2',paddingBottom:'10px'}}>{comments.length} Comments</p>
				{comments.reverse()}
			</div>
			</Fragment>
		)
	}
}

export default Comments;
