import { useSelector, useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notificationReducer'
const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => {
    return state.notifications
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (<div>{(notification) ?
    <div style={style}>
      {notification}    </div> : console.log("empty")}
  </div>
  )
}
export default Notification