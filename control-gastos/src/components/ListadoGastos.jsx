import React from 'react'
import Gasto from '../components/Gasto'

const ListadoGastos = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro,
    gastosFiltrados
}) => {


    return (
        <div className='listado-gastos contenedor'>
            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos':'No hay gastos en esta categoría'}</h2>
                        {
                            gastosFiltrados.map(gasto => (
                                <Gasto
                                    eliminarGasto = {eliminarGasto}
                                    setGastoEditar = {setGastoEditar}
                                    key={gasto.id}
                                    gasto={gasto}
                                />
                            )) 
                        }
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos':'No hay gastos aún'}</h2>
                        {
                            gastos.map(gasto => (
                                <Gasto
                                    eliminarGasto = {eliminarGasto}
                                    setGastoEditar = {setGastoEditar}
                                    key={gasto.id}
                                    gasto={gasto}
                                />
                            )) 
                        }
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos