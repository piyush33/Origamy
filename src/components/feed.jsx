import { useEffect, useState } from "react";
import "../App.css";
import { getPosts } from "../api";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { useSelector, useDispatch } from "react-redux";
import { Navigate} from "react-router-dom";
import { setFeed, signOut } from "../actions";
import AddNewPost from "./addNewPost";

function PostFeed() {
  
  const [feedData, setFeedData] = useState([]);
  const [comment,setComment] =useState("");
  const authData = useSelector(state=>state.auth);
  const reducerFeedData = useSelector(state=>state.feed.feedData)
  const dispatch = useDispatch();


  useEffect(() => {
    getPosts().then((data) => {
      dispatch(setFeed(data));
      setFeedData(reducerFeedData);
      console.log("feedData",reducerFeedData)
    });
  },[]);

  useEffect(()=>{
    setFeedData(reducerFeedData);
  },[reducerFeedData]);
  
  const onClickLike = (index)=>{
  
  let post = feedData[index];
    let newPost = {...post, isLiked: !post.isLiked}

    if(newPost.isLiked){
      newPost.likes.count+=1;
    }
    else if(!newPost.isLiked){
      newPost.likes.count -=1;
    }
  
  let newPostData = [...feedData]
  newPostData[index]=newPost;
  setFeedData(newPostData);
  }

  const onClickSave = (index)=>{

      let post = feedData[index];
        let newPost = {...post, isBookMarked: !post.isBookMarked}
      
      let newPostData = [...feedData];
      newPostData[index]=newPost;
      setFeedData(newPostData);
  }

  const onCommentSubmit =(index) =>{
    let post =feedData[index];
     let postComments = post.comments
     let postNewComments= [...postComments, {
      user: {
        name: authData.user?.name,
        username: authData.user?.userName,
      },
      comment: comment,
    }
    ]

     let newPost = {...post, comments: postNewComments}

     let newPostData = [...feedData];
     newPostData[index]=newPost;
     setFeedData(newPostData);
     setComment("");

  }

  if(authData.isLoggedIn ===false) {
    return <Navigate to="/login"/>;
  }

  const logOut = ()=>{
    dispatch(signOut());
  }
  


  return (
    <>
    <div className="userAccount">{authData.user?.userName}
    <div onClick={logOut}>logout</div>
    </div>
    
   <AddNewPost authData={authData}/>
      <div className="feedContainer">
        {feedData.map((item, index) => (
          <div className="cardContainer">
            <div className="card">
              <img className="picture" src={item.imageUrl} alt="photo" />
            </div>
            <button className="like" onClick={()=>{onClickLike(index)}}>
              {item.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
          
            <button className="save" onClick={()=>{onClickSave(index)}}>
              {item.isBookMarked ? <BookmarkIcon/> :<BookmarkBorderIcon />}
            </button>
            <div className="likesCount">
              <b>{item.likes.count} likes</b>
            </div>
            <div className="user">
              <b>{item.user.username}</b> {item.caption}
            </div>
            <div className="commentSection">{item.comments.map((item)=>(<div>{item.user.username}: {item.comment}</div>))}</div>
            <div className="comments">
              <input type="text" className="newComment" placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)} />
              <button className="postComment" onClick={()=>{onCommentSubmit(index)}}>Post</button>  
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PostFeed;
