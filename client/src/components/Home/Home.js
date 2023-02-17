import React from "react";
import AddWordSearch from "../AddWordSearch/AddWordSearch";
import AddWords from "../AddWords/AddWords";
import CollapseDiv from "../CollapseDiv/CollapseDiv";
import './Home.css'

const Home = () => {
    const renderImg = (file, img_id) => {
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
          }
        
          const reader = new FileReader();
          reader.addEventListener('load', (event) => {
            document.getElementById(img_id).src = event.target.result;
          });
          reader.readAsDataURL(file);
      }

    return (
        <div id="home">
            <div className="step" id="step-1">
                <CollapseDiv btnTitle={"1. Add Word Search's Letters"} content={<AddWordSearch renderImg={renderImg} />}/>
            </div>
            <div className="step" id="step-2">
                <CollapseDiv btnTitle={"2. Add Word Search's Words"} content={<AddWords renderImg={renderImg} />}/>
            </div>
            <div className="step" id="step-3">
                <CollapseDiv btnTitle={'Results'} content={"results"}/>
            </div>
        </div>
    )
}

export default Home;