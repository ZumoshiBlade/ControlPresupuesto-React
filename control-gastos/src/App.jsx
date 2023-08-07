import { useState, useEffect } from 'react'

import Header from './components/header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  // State de presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  );
  // State de gastos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  // State para los filtros
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)


  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      // Llama al formulario modal para editar el gasto.
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 300)
    }
  }, [gastoEditar])

  // UseEffect para el pesupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  // UseEffect para los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  // UseEffect para los filtros
  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados)
  }

  const guardarGasto = gasto => {
    // Si gasto contiene un id, Actualizará el gasto
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Si el gasto no contiene una id, le genera una id con en snippet y una fecha, luego pasa a guardar el nuevo gasto
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 400)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        gastos = {gastos}
        setGastos = {setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos
              eliminarGasto = {eliminarGasto}
              setGastoEditar = {setGastoEditar}
              gastos={gastos}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
            src={IconoNuevoGasto}
            alt="Icono Nuevo Gasto"
            onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
      setGastoEditar = {setGastoEditar}
      setModal={setModal} 
      animarModal ={animarModal}
      setAnimarModal = {setAnimarModal}
      guardarGasto = {guardarGasto}
      gastoEditar = {gastoEditar}
      />}

    </div>
  )
}

export default App
