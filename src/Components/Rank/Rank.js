import React from 'react';
const Rank = ({name , entries}) => {
    return(
        <div className="">
            <div className='f3 white'>
                
                {` ${name}, your current score is...`}
            </div>
             <div className='f1 white'>
                {entries}
            </div>
        </div>
    )
}

export default  Rank;