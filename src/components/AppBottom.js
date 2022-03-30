import React from 'react'
import '../App.css'

const AppBottom = (props) => {

    return(
        <div className='app-bottom'>

            <button className='bottom-buttons cancel-button' onClick={() => {props.clearDate(); props.closeApp('cancel')}}><p>Cancel</p>
            </button>

            <button className='bottom-buttons done-button' onClick={props.isPriorDate ? () => props.invalidDateMessage() : () => props.closeApp('done')}><p>Done</p>
            </button>

        </div>
    )
}

export default AppBottom
