import React from 'react';

function Die({value,id,holdingDie,isheld}) {
    const styles = {
        backgroundColor: isheld ? "#59E391" : "white"
    }
    return ( 
        <>
            <div onClick={holdingDie} className="die-face" style={styles}>
                <h4>{value}</h4> 
            </div>
        </>
     );
}

export default Die;