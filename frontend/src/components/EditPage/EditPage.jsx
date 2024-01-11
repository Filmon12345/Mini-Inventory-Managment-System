// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './EditPage.css'
import inventory from '../../img/inventory.png'
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
function EditPage() {
  const [fetched,Setfetched] =useState({});
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
  const[dimage,Setdimage]=useState('');
  const { Id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`http://localhost:8000/products/get/${Id}`,{
      method:'GET'
    })
    .then((response)=>response.json())
    .then((result)=>{
        Setfetched(result);
        Setname(result.name);
        Setcategory(result.category);
        Setdescription(result.description);
        Setprice(result.price);
        Setamount(result.amount);
        Setimage(result.image);
        Setdimage(`http://localhost:8000/images/${result.image}`)
    })
  }, [Id]);

  function Base64(e){
    Setimage(e.target.files[0]);
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      Setdimage(reader.result);
     
    };
    reader.onerror=(err)=>{
      console.log('error', err);
      console.log(fetched)
    };
    }
    
    async function editItem(e) {
        e.preventDefault();
        try {
           toast.success('Edited Successfully',{
              autoClose:2000,
              onClose:setTimeout(() => {
                navigate('/see-store');
              }, 1000)
            });
            const formData = new FormData(); 
            formData.append('name', name);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('amount', amount);
            formData.append('image', image);
            console.log(formData);

          const response = await axios.put(`http://localhost:8000/products/edit/${Id}`, formData);
          if (response.status === 200) {
            console.log('Product edited successfully');
            
          } else {
            console.error('Failed to edit Product');
            // Handle failure, e.g., show an error message
          }
        } catch (error) {
          console.error('Error editing Product:', error.response);
        }
      }
    
  return (
    <div className="main">
      <img className='background' src={inventory} alt="background" />
      <div className='edit-wrapper'>
   <form encType='multipart/form-data' className='forms row' required>
        <h1 className='addNew'>Edit Product</h1>
        <div className="Choose-form" >
        <div className="Choose-file">
           <input accept="image/*" name='image' type="file" onChange={(e)=>Base64(e)} />
            <img className="choosen-image" value={image} src={dimage} alt="" />
           </div>
        </div>

        <div className="inputs"  >
        <label >Product name:</label>
        <input  type="text" value={name} onChange={(e)=>{Setname(e.target.value)}} placeholder='Add product name' />
        </div>
        <div  className="inputs">
          <label>Product category:</label>
        <select className="select"  onChange={(e)=>{Setcategory(e.target.value)}} value={category} >
          <option value="">Select Category</option>
          <option value="Mechanical Tools">Mechanical Tools</option>
          <option value="Electrical Tools">Electrical Tools</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
      </select>
           
          </div>
       
        <div className="inputs" > 
        <label >Product Price:</label>
        <input  type="number" value={price} onChange={(e)=>{Setprice(e.target.value)}} placeholder='Add price of the product' />
        </div>
        <div className="inputs"  >
        <label >Product Amount:</label>
        <input  type="number" value={amount} onChange={(e)=>{Setamount(e.target.value)}} placeholder='Add amount of product'/>
        </div>
        <div className="inputs" > 
          <label>Description:</label>
          <textarea className='description discr ' name="description" value={description} onChange={(e)=>{Setdescription(e.target.value)}} placeholder='Description of product'></textarea>
        </div>
        <div className='btn-container'>
          <button className='btn btn-primary' onClick={editItem}>Submit</button>
        </div>
      </form>
</div>
    </div>
  )
}

export default EditPage