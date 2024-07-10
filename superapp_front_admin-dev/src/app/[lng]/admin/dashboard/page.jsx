"use client"

import { useEffect, useState } from 'react'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import {getWorkflowsCompletedsReport, getWorkflowsPendingsReport} from '@/services/ReportService'

export default function Dashboard() {

  const [chart1, setChart1] = useState([
    {
      label: "Dentro del plazo de 72 hrs",
      value: 0,
      color: "rgb(106, 142, 34)"
    }, 
    {
      label: "Pendientes fuera del plazo de 72 hrs",
      value: 0,
      color: "rgb(129, 0, 127)"
    }
  ])

  const [chart2, setChart2] = useState([
    {
      label: "A puertas del vencimiento",
      value: 0,
      color: "rgb(254, 165, 0)"
    }, 
    {
      label: "Vigente",
      value: 0,
      color: "rgb(1, 0, 128)"
    }
  ])

  const [chart3, setChart3] = useState([
    {
      label: "Dentro del plazo de 72 hrs",
      value: 1,
      color: "rgb(254, 165, 0)"
    }, 
    {
      label: "Pendientes Fuera del plazo de 72hrs",
      value: 0,
      color: "rgb(249, 101, 73)"
    }
  ])

  const [chart4, setChart4] = useState([
    {
      label: "Total de Créditos Adquiridos",
      value: 200,
      color: "rgb(129, 0, 127)"
    }, 
    {
      label: "Total de Créditos Usados",
      value: 150,
      color: "rgb(106, 142, 34)"
    },
    {
      label: "Total de Créditos Disponible",
      value: 50,
      color: "rgb(254, 165, 0)"
    }, 
  ])

  const [chart5, setChart5] = useState([
    {
      label: "Contratos recibidos para firma",
      value: 3,
      color: "rgb(106, 142, 34)"
    }, 
    {
      label: "Contratos Firmados",
      value: 2,
      color: "rgb(63, 224, 208)"
    },
    {
      label: "Contratos No Firmados",
      value: 1,
      color: "rgb(129, 0, 127)"
    }, 
  ])

  const [chart6, setChart6] = useState([
    {
      label: "Total de Créditos Asignados",
      value: 5,
      color: "rgb(106, 142, 34)"
    }, 
    {
      label: "Total de Créditos Usados",
      value: 3,
      color: "rgb(1, 0, 128)"
    },
    {
      label: "Total de Créditos Disponibles",
      value: 2,
      color: "rgb(34, 139, 34)"
    }, 
  ])

  useEffect(()=>{
    getWorkflowsCompletedsReport().then((response)=>{
      setChart1(response)
    })

    getWorkflowsPendingsReport().then((response)=>{
      setChart2(response)
    })
  },[])

  return <>
  <div className='grid grid-cols-3 gap-4'>
    <BarChart title={"Contrato Firmados"} items={chart1} /> 
    <BarChart title={"Estado de contratos"} items={chart2} /> 
    <BarChart title={"Contratos Firmados por el Usuario"} items={chart3} /> 
    <BarChart title={"Total de Créditos"} items={chart4} /> 
    <BarChart title={"Contratos del Usuario"} items={chart5} /> 
    <BarChart title={"Total de Créditos del Usuario"} items={chart6} /> 
  </div>
  
  </>;
}
