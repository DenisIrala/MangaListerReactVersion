import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';

function App() {
  const [name, setName]=useState("");
  const [description, setDescription]=useState("");
  const [author, setAuthor]=useState("");
  const [noe, setNoe]=useState(0);
  const [demography, setDemography]=useState("");
  const [link, setLink]=useState("");
  const [listy, setList]=useState([]);
  const [filter, setFilter] =useState("ID");
  
  const [UpdateID, setUpdateID]=useState();

  const [updating,setIsUpdating]=useState(false);

  var list=[];

  const clear=()=>{
    setName("");
    setDescription("");
    setAuthor("");
    setNoe(0);
    setDemography("");
    setLink("");
    setUpdateID(0);
    setIsUpdating(false);

  }
 

  const add=()=>{
    Axios.post("http://localhost:3001/create",{
      name:name,
      description:description,
      author:author,
      noe:noe,
      demography:demography,
      link:link
    }).then(()=>{
      alert("The manga was successfully added.");
      getList();
    })
  
   
   
  } 
  const getList= async ()=>{
    try {
      const response = await Axios.get("http://localhost:3001/getList");
      console.log("Filtering by "+filter);
      sortList(filter, response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  const sortList= async (val, response=listy)=>{  
    setFilter(val);
    console.log(val);
    switch(val){
      case 'ID': setList([...response].sort((a, b) => a.id - b.id)); break;
      case 'Name': setList([...response].sort((a, b) => a.nombre_manga-b.nombre_manga)); break;
      case 'Number of Entries' : setList([...response].sort((a, b) => a.nchap - b.nchap)); break;
      default:
        console.log("Default filtering");
        setList([...response].sort((a, b) => a.id - b.id));
        break;

    }

  }

  const updateList=()=>{
    Axios.put("http://localhost:3001/updateList",{
      name:name,
      description:description,
      author:author,
      noe:noe,
      demography:demography,
      link:link,
      id:UpdateID
    }).then(()=>{
      getList()
      setIsUpdating(false)
      clear() 
    })}

  const prepareUpdate=(val)=>{
    setIsUpdating(true);
    setName(val.nombre_manga);
    setDescription(val.descripcion);
    setAuthor(val.autor);
    setNoe(val.nchap);
    setDemography(val.demografia);
    setLink(val.link);
    setUpdateID(val.id);
  }

  const prepareDelete=(val)=>{
    Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
      getList()
    })}
  

  useEffect(() => {
    getList();
  },[]
  )
//  getList();

  return (
    <div className="App">
      
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
      <input type="text" value={name} onChange={(event)=>{setName(event.target.value);}} className="form-control" placeholder="Naruto" aria-label="Name" aria-describedby="basic-addon1"/>
    </div>        
    
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Description</span>
      <input type="text" value={description} onChange={(event)=>{setDescription(event.target.value);}} className="form-control" placeholder="Description" aria-label="Description" aria-describedby="basic-addon1"/>
    </div>   
    
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Author</span>
      <input type="text" value={author} onChange={(event)=>{setAuthor(event.target.value);}} className="form-control" placeholder="Masashi Kishimoto" aria-label="Author" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Number of Entries</span>
      <input type="number" value={noe} onChange={(event)=>{setNoe(event.target.value);}} className="form-control" placeholder="700" aria-label="NOE" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Demography</span>
      <input type="text" value={demography} onChange={(event)=>{setDemography(event.target.value);}} className="form-control" placeholder="Shonen" aria-label="Demography" aria-describedby="basic-addon1"/>
    </div>   

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Link</span>
      <input type="text" value={link} onChange={(event)=>{setLink(event.target.value);}} className="form-control" placeholder="https://en.wikipedia.org/wiki/Naruto" aria-label="Link" aria-describedby="basic-addon1"/>
    </div>   
        
    
    {
          updating?<div>
          <a href="#" onClick={updateList} className="btn btn-primary">Update</a> <a href="#" onClick={clear} className="btn btn-danger">Cancel</a></div>
          :<p className="card-text"><button className="btn btn-success" onClick={add}>Add</button></p>
    }
  </div>
</div>

<div className="filterBox">
<select id="filter" value={filter} onChange={(event)=>{sortList(event.target.value);}}>
        <option value="all">Sort By</option>
        <option value="ID">ID</option>
        <option value="Name">Name</option>
        <option value="Number of Entries">Number of Entries</option>
        {/* Add more options as needed */}
      </select>
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
          <td>{val.nchap}</td>
          <td>
          <button onClick={()=>{
            prepareUpdate(val)
          }} className="btn btn-info">Update</button>
          <button onClick={()=>{
            prepareDelete(val)
          }} className="btn btn-danger">Delete</button>
          </td>
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
