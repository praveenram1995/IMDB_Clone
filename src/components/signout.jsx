import React from 'react';

function signOut(props){
	let signOutHandler=()=>{
		if(typeof storage !== undefined){
			localStorage.removeItem("loginToken");
			props.changeState();
		}else{
			console.log('you are already logged out!');
		}
	}
	return(
		<a onClick={signOutHandler}>SignOut</a>
	)
}

export default signOut;