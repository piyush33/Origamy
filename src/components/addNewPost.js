import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFeed } from "../actions";

function AddNewPost({ authData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const reducerFeedData = useSelector((state) => state.feed.feedData);

  const addNewPost = () => {
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
    };
    let newPostData = [newPost, ...reducerFeedData];
    console.log("newpost", newPostData);
    dispatch(changeFeed(newPostData));
    // setFeedData(newPostData);
    setOpenDialog(false);
    setCaption("");
    setImageUrl("");
  };
  return (
    <>
      <div className="newPost">
        <button
          className="createPost"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <AddIcon />
        </button>
      </div>

      <div className="newPostDialog">
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle> Create a Post</DialogTitle>
          <DialogContent>
            <div className="createPostForm">
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="imageUrl"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
              </div>
              <div className="inputContainer">
                <textarea
                  type="text"
                  placeholder="caption"
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button onClick={() => setOpenDialog(false)}>Cancel</button>
            <button onClick={addNewPost}>Post</button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddNewPost;
