import React,{useState} from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { render } from '@testing-library/react';

const Admin = (props) => {
    const [textData, settextData] = useState("")
    const [videoData, setvideoData] = useState("")
    const [cards, setcards] = useState([])
    
    function encodevideoFileAsURL(event) {  
        var file = event.target.files[0];  
        var reader = new FileReader();  
        reader.onloadend = function() {  
            setvideoData(reader.result); 
        }  
        reader.readAsDataURL(file);  
        
}  
    function storeToDatabase() {
        const file = document.querySelector('#video'); 
        file.value = ''; 
        setvideoData("");
        // store to database
    }
    function displayCards(){
        let dom=document.getElementsByTagName('textarea');
        let fs=dom[0].style.fontStyle;
        let fw=dom[0].style.fontWeight;
        let td=dom[0].style.textDecoration;
        setcards((prevtask)=>[...prevtask,{text:textData,fontweight:fw,fontstyle:fs,textdecoration:td}]);
        settextData("");
        dom[0].style.fontWeight=""
        dom[0].style.fontStyle="normal"
        dom[0].style.textDecoration="none"
        let dom1=document.getElementsByClassName('forAnimation');
        for(let i=0;i<3;i++){
            dom1[i].style.borderStyle="outset";
        }
    }
    function formatingBold(){
        let dom=document.getElementsByTagName('textarea');
        dom[0].style.fontWeight=getComputedStyle(dom[0]).fontWeight==="700"?"100":"700";
        let dom1=document.getElementsByClassName('forAnimation');
        dom1[0].style.borderStyle=getComputedStyle(dom1[0]).borderStyle==="inset"?"outset":"inset";
    }
    function formatingCursive(){
        let dom=document.getElementsByTagName('textarea');
        dom[0].style.fontStyle=getComputedStyle(dom[0]).fontStyle==="italic"?"normal":"italic";
        let dom1=document.getElementsByClassName('forAnimation');
        dom1[1].style.borderStyle=getComputedStyle(dom1[1]).borderStyle==="inset"?"outset":"inset";
    }
    function formatingUnderline(){
        let dom=document.getElementsByTagName('textarea');
        dom[0].style.textDecoration=getComputedStyle(dom[0]).textDecoration==="underline solid rgb(0, 0, 0)"?"none":"underline";
        let dom1=document.getElementsByClassName('forAnimation');
        dom1[2].style.borderStyle=getComputedStyle(dom1[2]).borderStyle==="inset"?"outset":"inset";
    }
    function editContent(e){
        let class_name=e.target.className.split(" ")[0];
        document.getElementsByClassName(class_name)[0].style.display="none";
        document.getElementsByClassName(class_name)[1].style.display="inline-block";
        document.getElementsByClassName(class_name)[2].contentEditable="true";
        var node =document.getElementsByClassName(class_name)[2];
        node.focus();
        var textNode = node.firstChild;
        var range = document.createRange();
        range.setStart(textNode, 0);
        range.setEnd(textNode, 0);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    function saveContent(e) {
        let class_name=e.target.className.split(" ")[0];
        let textUpdated=document.getElementsByClassName(class_name)[2].innerHTML;
        if(textUpdated.length!==0){
            cards[Number(class_name)].text=textUpdated;
            document.getElementsByClassName(class_name)[0].style.display="inline-block";
            document.getElementsByClassName(class_name)[1].style.display="none";
            document.getElementsByClassName(class_name)[2].contentEditable="false";
            setcards(cards);
        }
        else alert("Not allowed to save the Empty card");
    }
    props.getDataFromAdmin(cards)
    return (
        <div className="admin">
            <h1>Welcome Admin</h1>
            <video src={videoData} width="340px"  style={{position:'absolute', left: '50px',borderRadius:'10px' }} height="250px" controls>
            </video>
            <label for="video">Upload Video File  </label>
            <input style={{position: 'relative',bottom: '185px'}} type="file" id="video" onChange={encodevideoFileAsURL}></input>
            <button type="submit" disabled={videoData.length===0} onClick={storeToDatabase}>Upload</button>
            <div style={{marginLeft: '420px',
  display: 'inline-block',position:'relative'}}>
            <FormatBoldIcon onClick={formatingBold} className='forAnimation' style={{position:'absolute',left: '-30px',borderStyle:'outset'}} />
            <FormatItalicIcon onClick={formatingCursive} className='forAnimation' style={{position:'absolute',left: '-30px',top:'40px',borderStyle:'outset'}} />
            <FormatUnderlinedIcon onClick={formatingUnderline} className='forAnimation' style={{position:'absolute',left: '-30px',top:'80px',borderStyle:'outset'}} />
            <textarea type="text" placeholder="Text Input"id="text" onChange={(event)=>settextData(event.target.value)} value={textData}></textarea> 
            <button type="submit" id="button" disabled={textData.length===0} onClick={displayCards}>Submit</button>
            </div>
            
            <hr>
            </hr>
            {cards.map((card,ind)=>{
                return(<div className="cards" >
                    <div className="editSave">
                    <div className={[ind.toString(),"editIcon"].join(" ")} onClick={editContent}>
                    Edit
                    </div>
                    <div className={[ind.toString(),"saveIcon"].join(" ")} onClick={saveContent}>
                    Save
                    </div>
                    </div>
                    <p className={ind.toString()} style={{fontStyle:card.fontstyle,fontWeight:card.fontweight,textDecoration:card.textdecoration}}>{card.text}</p>
                    </div>

                    );
            })
            }

        </div>
    )
}

export default Admin;
