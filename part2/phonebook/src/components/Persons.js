const Persons = ({ filter, persons, handleDelete }) => {
  return <div>
    {filter !== "" ? filter.map((person,id) => { return <div key = {id}><p>{person.name} {person.number}</p><button onClick={() => handleDelete(person)}>delete</button></div> })
      : persons.map((person,id) => { return <div key = {id}><p>{person.name} {person.number}<button type="button" onClick={() => handleDelete(person)}>delete</button></p> </div> })}
  </div>
}
export default Persons