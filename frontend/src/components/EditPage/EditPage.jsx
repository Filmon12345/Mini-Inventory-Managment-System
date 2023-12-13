// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from 'react'
import './EditPage.css'
import inventory from '../../img/inventory.png'
import { useParams } from 'react-router-dom';
function EditPage() {
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
  const { Id } = useParams();

  function Base64(e){
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      Setimage(reader.result);
      // console.log(reader.result);
    };
    reader.onerror=(err)=>{
      console.log('error', err);
    };
    }
    
    async function editItem(e) {
        e.preventDefault();
        try {
            alert('edited successfully')
          const response = await fetch(`http://localhost:8000/products/edit/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              image,
              category,
              description,
              price,
              amount,
            }),
          });
    
          if (response.ok) {
            console.log('Item edited successfully');
            // Handle success, e.g., redirect or show a success message
          } else {
            console.error('Failed to edit item');
            // Handle failure, e.g., show an error message
          }
        } catch (err) {
          console.error('Error:', err);
          // Handle other errors, e.g., network issues
        }
      }
    
      useEffect(() => {
       
      }, [Id]);


  return (
    <div className='edit-wrapper'>
   <img className='background' src={inventory} alt="background" />
   <form className='forms row'>
      

        <div className='col-lg-6'>
        <h1 className='addNew'>Add New Product</h1>
          <input accept='image/*' type="file"onChange={Base64}/>
          <img className='choosen-image' src={image} alt="" />
        </div>


        
        <div className='col-lg-6'>
        <label className='col-12'>Product name:</label>
        <input className='col-9' type="text" onChange={(e)=>{Setname(e.target.value)}} placeholder='Add product name' />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product category:</label>
        <input className='col-9' type="text" onChange={(e)=>{Setcategory(e.target.value)}}  placeholder='Add product category'/>
        </div>
       
        <div className='col-lg-6'> 
        <label className='col-12 '>Product Price:</label>
        <input className='col-9' type="number" onChange={(e)=>{Setprice(e.target.value)}} placeholder='Add price of the product' />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product Amount:</label>
        <input className='col-9' type="number" onChange={(e)=>{Setamount(e.target.value)}} placeholder='Add amount of product'/>
        </div>
        <div className='col-12 col-lg-6'> 
          <label>Description:</label>
          <textarea className='description col-12' name="description" onChange={(e)=>{Setdescription(e.target.value)}} cols="35" rows="10" placeholder='Description of product'></textarea>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={editItem}>Submit</button>
        </div>
      </form>
</div>
  )
}

export default EditPage