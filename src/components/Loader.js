import React from "react";
import loader from '../media/video/video.mp4'
export default function Loader() {
  return (
    <div className="loader">
     <video controls  autoPlay loop>
    <source src={loader} type="video/mp4"/>
     </video>
    </div>
  );
}
