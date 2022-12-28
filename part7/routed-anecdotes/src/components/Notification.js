import { useState } from "react"
const Notification = ({notification}) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }

    return <div style={style}>
        a new anecdote {notification} was created!
    </div>

}
export default Notification