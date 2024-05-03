import React, { useState, useRef } from "react";
import CloseIcon from "../assets/images/close.svg";
import SmileIcon from "../assets/images/smile.svg";
import "../assets/styles/image_uploader.scss";

const UploadImageModal = (props) => {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorNotification, setErrorNotification] = useState(null);

   /**
     Drag and Drop Event Handlers
  **/
   const handleDragEnter = (e) => {
      e.preventDefault();
   }

   const handleDragOver = (e) => {
      e.preventDefault();
      if (!dragOver) {         
         setDragOver(true);
      }
   }
   
   const handleDragLeave = (e) => {
      e.preventDefault();      
      setDragOver(false);
   }
   
   const handleDrop = (e) => {
      e.preventDefault();
      let file = e.dataTransfer.files[0];
      
      // Validate file is of type Image
      let fileType = file.type.split("/")[0];
      if (fileType !== "image") {              
         setFile(null);
         setErrorNotification("Not an image File");
         setDragOver(false);
         
         return setTimeout(() => {           
            setErrorNotification(null);
         }, 3000);
      }
      
      document.getElementById('upload-image-input').fileList =  e.dataTransfer.files[0];      
      setFile(file);      
      setDragOver(false);
   }


   /**
      Handle Manually (File Input) Added Files
   **/
   const handleAddImage = (e) => {
      e.preventDefault();      
      let file = ref.current.files[0];
      
      // Validate file is of type Image
      let fileType = ref.current.files[0].type.split('/')[0];
      if (fileType !== "image") {         
         setFile(null);
         setErrorNotification("Not an image File");
         // dragOverClass: ""
         return setTimeout(() => {
            setErrorNotification(null);
         }, 3000);
      }
         
      setFile(file);
   }

  /**
    Handle Upload after Upload Button Clicked
  **/
  const handleUploadImage = (e) => {
    e.preventDefault();
    props.uploadImage(file);
  }   

  return (
    <div className="custom-upload-modal modal">
      <div className="modal-content">
        <div className="title-header">
          <h4 className="main-title">Upload an Avatar</h4>
          <img src={CloseIcon} alt="" onClick={props.hideModal}/>
        </div>
        <div className="divider"/>
        <div className="image-uploader-wrapper">
         <div className={dragOver ? "display-box drag-over" : "display-box"}>
            <div className="icon-text-box">               
              <div className="upload-text">
                {file ? 
                    <div>
                      <h4>{file.name}</h4>                        
                    </div> : 
                    <div className="main-text">
                      <p className="drop">DROP AN IMAGE HERE *</p>
                      <p className="or">or</p>
                      <p className="browser">Browse for an image</p>
                    </div>}
              </div>
              {
                errorNotification ? 
                    <div className="error-notification">
                      <p>{errorNotification}</p>
                    </div> : null
              }
            </div>
            <div>
               <input
                  type="file"
                  ref={ref}
                  id="upload-image-input"
                  className="upload-image-input"
                  accept="image/*"
                  onDrop={(e) => handleDrop(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onChange={(e) => handleAddImage(e)}
               />
            </div>
          </div>
        </div>
        <div className="actions">
          <p>* The ideal size of the photo <img src={SmileIcon} alt=""/> is 200x200px, png/ jpeg</p>
          <div className="button-groups">
            <button className="submit-btn" onClick={(e) => handleUploadImage(e)}>Submit</button>
            <button className="cancel-btn" onClick={props.hideModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadImageModal;
