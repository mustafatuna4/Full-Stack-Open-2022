import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import CreateNew from "./CreateNew"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
      </div>
    )
  }
  export default Menu

  /*
  
        <a href='#' onClick={event => handleClick(event, 'anecdotes')} style={padding}>anecdotes</a>
        <a href='#' onClick={event => handleClick(event, 'create')}style={padding}>create new</a>
        <a href='#' onClick={event => handleClick(event, 'about')}style={padding}>about</a> */