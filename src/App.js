import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import Delivery from './Delivery';

//import 'bootstrap/dist/css'

function App() {

  const [id, setId] = useState('')

  const submit = async (e) => {
    console.log('hila');
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const response = await fetch('http://localhost:8000/deliveries/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          type: "CREATE_DELIVERY",
          data
        })
    });
    const { id } = await response.json();

    setId(id)
    //console.log(id);
  }
  return <div className='py-5'>
    <div className='d-grid gap 2 d-sm-flex justify-content sm-center mb-5'>

      {id === '' ?

        <div className='card bg-success'>
          <div className='card-header text-light'>
            Crear pedido
          </div>
          <form className='card-body' onSubmit={submit}>
            <div className='mb-3'>
              <input type='number' name="budget" className='form-control' placeholder='presupuesto' />
            </div>
            <div className='mb-3'>
              <textarea name="notes" className='form-control' placeholder='Notas' />
            </div>
            <button className='btn-btn-primary'>Enviar</button>
          </form>
        </div> : <Delivery id={id} />}
    </div>

  </div>
}

export default App;