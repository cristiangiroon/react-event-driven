import React, { useEffect, useState } from 'react';

const Delivery = (props) => {
    const [state, setState] = useState({});

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8000/deliveries/${props.id}/status`);
            const data = await response.json();
            setState(data);
        })()
    }, [refresh]);
    const submit = async (e, type) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const response = await fetch('http://localhost:8000/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    type,
                    data,
                    delivery_id: state.id
                })
        });
        if (!response.ok) {
            const { detail } = await response.json();
            alert(detail);
            return;
        }
        setRefresh(!refresh);

    }


    return <div className='row w-100' >
        <div className='col-12 mb-4'>
            <h4 className='fw-bold text-white'>PEDIDO {state.id}</h4>
        </div>
        <div className='col-12 mb-5'>
            <div className='progress'>
                {state.status !== 'ready' ?
                    <div className={state.status === 'active' ? 'progress-bar bg-info progress-bar-striped progress-bar-animated' : 'progress-bar bg-success'}
                        role="progressbar" style={{ width: '50%' }}>
                    </div> : ''}
                {state.status === 'collected' || state.status === 'completed' ?
                    <div className={state.status === 'collected' ? 'progress-bar bg-info progress-bar-striped progress-bar-animated' : 'progress-bar bg-success'}
                        role="progressbar" style={{ width: '50%' }}>
                    </div> : ''}
            </div>
        </div>
        <div className='col-3'>
            <div className='card bg-success'>
                <div className='card-header text-light'>
                    Empezar pedido
                </div>
                <form className='card-body' onSubmit={e => submit(e, "START_DELIVERY")}>
                    <button className='btn-btn-primary'>Enviar</button>
                </form>
            </div>
        </div>

        <div className='col-3'>
            <div className='card bg-success'> {/* Agregué la clase bg-primary para hacer el fondo azul */}
            <div className='card-header text-light'>
                    presupuesto del producto
                </div>
                <form className='card-body' onSubmit={e => submit(e, "INCREASE_BUDGET")}>
                    <div className='mb-3'>
                        <input type='number' name="budget" className='form-control' placeholder='presupuesto' />
                    </div>
                    <button className='btn-btn-primary'>Enviar</button>
                </form>
            </div>
        </div>


        <div className='col-3'>
            <div className='card bg-success'>
            <div className='card-header text-light'>
                    Cantidad de producto
                </div>
                <form className='card-body' onSubmit={e => submit(e, "PICKUP_PRODUCTS")}>
                    <div className='input-group mb-3'>
                        <input type='number' name="purchase_price" className='form-control' placeholder='Cantidad' />
                    </div>
                    <div className='mb-3'>
                        <input type='number' name="quantity" className='form-control' placeholder='Multiplicador' />
                    </div>
                    <button className='btn-btn-primary'>Enviar</button>
                </form>
            </div>
        </div>

        <div className='col-3'>
            <div className='card bg-success'>
            <div className='card-header text-light'>
                    Entregar productos
                </div>
                <form className='card-body' onSubmit={e => submit(e, "DELIVER_PRODUCTS")}>
                    <div className='input-group mb-3'>
                        <input type='number' name="sell_price" className='form-control' placeholder='Cantidad' />
                    </div>
                    <div className='mb-3'>
                        <input type='number' name="quantity" className='form-control' placeholder='Multiplicador' />
                    </div>
                    <button className='btn-btn-primary'>Enviar</button>
                </form>
            </div>
        </div>
        <code className='col-12 mt-4 text-light  '>
            {
                JSON.stringify(state)
            }
        </code>
    </div>
};





export default Delivery;