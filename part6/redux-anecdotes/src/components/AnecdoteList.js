import { useDispatch, useSelector } from 'react-redux'
import { increaseVote, updateAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const temp = anecdotes.slice()
    const vote = async (id) => {
        const anecdoteToChange = temp.find(n => n.id === id)
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        }
        dispatch(updateAnecdote(id, changedAnecdote))
        dispatch(setMessage(`you voted ${changedAnecdote.content}`, 5))
    }
    const filteredAnecdotes = temp.filter(anecdote => (anecdote.content.includes(filter)) && anecdote)
    return <div>{filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )}</div>
}
export { AnecdoteList }