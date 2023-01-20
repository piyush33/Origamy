import { useEffect, useState } from "react";
import "../App.css";
import { getPosts } from "../api";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { Navigate} from "react-router-dom";
import { signOut } from "../actions";

function PostFeed() {
  
  const [feedData, setFeedData] = useState([]);
  const [comment,setComment] =useState("");
  const[openDialog, setOpenDialog]=useState(false);
  const[imageUrl, setImageUrl]=useState("");
  const[caption, setCaption] =useState(""); 

  const authData = useSelector(state=>state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    getPosts().then((data) => {
      setFeedData(data);
    });
  }, []);
  
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

  const addNewPost =()=>{
    let newPost = {
      imageUrl: imageUrl,
      caption: caption,
      user: {
        name: authData.user?.name,
        username: authData.user?.userName,
      },
      isLiked: false,
      isBookMarked: false,
      likes: {
        count: 0,
        likedBy: [],
      },
      comments: [],
    }
    let newPostData=[newPost,...feedData];
    setFeedData(newPostData);
    setOpenDialog(false);
    setCaption("");
    setImageUrl("");
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
    
    <div className="newPost">
        <button className="createPost" onClick={()=>{setOpenDialog(true)}}>
          <AddIcon />
        </button>
      </div>
      
      <div className="newPostDialog">
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
         <DialogTitle> Create a Post</DialogTitle>
         <DialogContent>
           <div className="createPostForm">
             <div className="inputContainer">
              <input type="text" placeholder="imageUrl" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}}/>
             </div>
             <div className="inputContainer">
              <textarea type="text" placeholder="caption" value={caption} onChange={(e)=>{setCaption (e.target.value)}}/>
             </div>
           </div>
         </DialogContent>
         <DialogActions>
           <button onClick={()=>setOpenDialog(false)}>Cancel</button>
           <button onClick={addNewPost}>Post</button>
         </DialogActions>
        </Dialog>
      </div>
      <div className="feedContainer">
        {feedData.map((item, index) => (
          <div className="cardContainer">
            <div className="card">
              <img className="picture" src={item.imageUrl} alt="photo" />
            </div>
            <button className="like" onClick={()=>{onClickLike(index)}}>
              {item.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <button className="comment">
              <ChatBubbleOutlineIcon />
            </button>
            <button className="share">
              <ShareIcon />
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
