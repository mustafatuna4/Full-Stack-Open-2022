import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const changeFilter = (event) => {
        event.preventDefault()
        dispatch(setFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }
    return <div style={style}>
        <input onChange={changeFilter}  ></input>
    </div>
}

export default Filter