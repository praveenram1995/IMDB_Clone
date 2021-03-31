import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Comments from './comments'
import '../styles/Post.css'

class Post extends Component{

    static propTypes={
        title:PropTypes.string.isRequired,
        img:PropTypes.string.isRequired,
    }

    state={
        upVotes:this.props.upVotes,
        views:this.props.views
    }

    incrementVotes=()=>{
        //changing the state
        this.setState({
            upVotes:this.state.upVotes+1,
        })
        //updating votes in localstorage
        let posts=JSON.parse(localStorage.getItem('Posts'))
        posts[this.props.id].upVotes=this.props.upVotes+1;
        localStorage.setItem('Posts', JSON.stringify(posts))
    }

    incrementViews=()=>{
        //changing the state
        this.setState({
            views:this.state.views+1,
        })
        //updating views in localstorage
        let posts=JSON.parse(localStorage.getItem('Posts'))
        posts[this.props.id].views=this.props.views+1;
        localStorage.setItem('Posts', JSON.stringify(posts))
    }

    render(){
        const {id,title,img,comments,upVotes,views}=this.props;
        const src=img.substring(0, 4)!=='http'?`images/${img}`:img
        return(
            <div className="col-xl-3 col-md-4 col-sm-6 col-xs-12" style={{'marginTop':'25px'}}>

            <div className="post-card" type="button" data-toggle="modal" data-target={`#postModal${id}`} onClick={this.incrementViews}>
                <div className="post-card-image">
                    <img src={src} alt={title}/>
                </div>
                <div className="post-card-content">
                    <p className="post-title">{title}</p>
                    <div className="post-info">
                        <a><img style={{'width':'15px','marginRight':'5px',color:'grey'}} src="images/upVote.png"/>{this.state.upVotes}</a>
                        <a><img style={{'width':'15px','marginRight':'5px'}} src="images/comment.png"/>{comments.length}</a>
                        <a><img style={{'width':'15px','marginRight':'6px'}} src="images/views.png"/>{this.state.views}</a>
                    </div>
                </div>
            </div>

            <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" id={`postModal${id}`}>
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                        <button id="close-this" style={{'color':'#f2f2f2'}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <img className="modal-image" src={src}/>
                        <div className="modal-post-info">
                            <button style={{backgroundColor:'transparent',border:'none',color:'#f2f2f2'}} onClick={this.incrementVotes}><img style={{'width':'25px','marginRight':'5px',color:'grey'}} src="images/upVote.png"/>{this.state.upVotes}</button>
                            <a><img style={{'width':'25px','marginRight':'5px'}} src="images/comment.png"/>{comments.length}</a>
                            <a><img style={{'width':'25px','marginRight':'6px'}} src="images/views.png"/>{this.state.views}</a>
                        </div>
                        <Comments comments={{comments:comments,id:id}} />
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>

                    </div>
                  </div>
                </div>

            </div>
        );
    }
} 

export default Post;