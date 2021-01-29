import React,{useState} from 'react'

const User = (props) => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Welcome User</h1>
        {props.giveDataToUser.map((card)=>{
            return(<div className="cards" >
                <p style={{fontStyle:card.fontstyle,fontWeight:card.fontweight,textDecoration:card.textdecoration}}>{card.text}</p>
                </div>

                );
        })
        }
        </div>
        
    )
}

export default User;
