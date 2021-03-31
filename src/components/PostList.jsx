import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import initialPosts from '../FakeData/posts';
import '../styles/PostList.css';

class PostList extends Component{

    componentWillMount(){ if(!localStorage.getItem('Posts')) localStorage.setItem('Posts', JSON.stringify(initialPosts)) }

    fetchPosts=()=>JSON.parse(localStorage.getItem('Posts'))

    render(){
        let posts=[];
        if(localStorage.getItem('Posts')){posts.push(...this.fetchPosts())}
        posts=posts.map((post,index)=><Post key={index} {...post} />);
        posts.reverse();
        return (
            <div className='container'>
                <div className="product-list row">{posts}</div>
            </div>
        )
    }
}

export default PostList;