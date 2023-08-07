import React from 'react'
import {formatearFecha} from '../helpers'

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoHobby from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    Ahorro : IconoAhorro,
    Comida : IconoComida,
    Casa : IconoCasa,
    Varios : IconoGastos,
    Hobby : IconoHobby,
    Salud : IconoSalud,
    Suscripciones : IconoSuscripciones,
}



const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    // Aplicando destructuring
    const {categoria, nombre, cantidad, id, fecha} = gasto;

    // Los paréntesis representan los return de las funciones y así retorne los componentes.
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                destructive={true}
                onClick={() => eliminarGasto(id)}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                // Parte derecha del componente para desplazarlo.
                leadingActions={leadingActions()}
                // Parte izquierda del componente para desplazarlo.
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className="contenido-gasto">
                        <img src={diccionarioIconos[categoria]} alt="icono gasto" />
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">$ {cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto