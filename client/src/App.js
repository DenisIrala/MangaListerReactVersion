import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [name, setName]=useState("");
  const [description, setDescription]=useState("");
  const [author, setAuthor]=useState("");
  const [noe, setNoe]=useState(0);
  const [demography, setDemography]=useState("");
  const [link, setLink]=useState("");
  const [listy, setList]=useState([]);
  

  const add=()=>{
    Axios.post("http://localhost:3001/create",{
      name:name,
      description:description,
      author:author,
      noe:noe,
      demography:demography,
      link:link
    }).then(()=>{
      alert("Registro exitoso");
      getList();
    })
  
   
   
  } 
  const getList=()=>{
    Axios.get("http://localhost:3001/getList").then((response)=>{
      setList(response.data);

    })
  }
//  getList();

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <div className="container">
      <div className="data">  
        
      </div>

<div className="card">
  <div className="card-header">
    Mangas
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Name</span>
      <input type="text" onChange={(event)=>{setName(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>        
    
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Description</span>
      <input type="text" onChange={(event)=>{setDescription(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>   
    
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Author</span>
      <input type="text" onChange={(event)=>{setAuthor(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Number of Entries</span>
      <input type="number" onChange={(event)=>{setNoe(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Demography</span>
      <input type="text" onChange={(event)=>{setDemography(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Link</span>
      <input type="text" onChange={(event)=>{setLink(event.target.value);}} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>   
        
    <p className="card-text"><button className="btn btn-success" onClick={add}>Add</button></p>
    <a href="#" onClick={getList} className="btn btn-primary">Go somewhere</a>
  </div>
</div>

<table className="table table-hover">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Number of Entries</th>
    </tr>
  </thead>
  <tbody>
    {
      listy.map((val,key)=>{
        return <tr key={val.id}>
          <th scope="row">{val.id}</th>
          <td>{val.nombre_manga}</td>
          <td>{val.autor}</td>
        < td>{val.nchap}</td>
        </tr>
      })
    }
  </tbody>
</table>

      </div>
      
      </div>
      
  );
}

export default App;
