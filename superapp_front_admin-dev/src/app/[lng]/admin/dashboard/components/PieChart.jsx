"use client"

import {useEffect} from 'react'
import './pie-chart.css'
import { Doughnut } from "react-chartjs-2"
import {Chart, ArcElement} from 'chart.js'

export default function PieChart ({title, items}) {
    Chart.register(ArcElement);
    const labels = items.map((item)=>item.label)
  const dataValues = items.map((item)=>item.value)

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: items.map((item)=>item.color),
        borderColor: items.map((item)=>item.color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2
  }

    return <div className="pie-charts">
      <div className="pieID--micro-skills pie-chart--wrapper">
        <h2 className='mb-2'>{title}</h2>
        <div className="pie-chart">
        <div>
        <Doughnut data={data} options={options}/>
        </div>
          <ul className="pie-chart__legend mt-2">
            {items.map((item, key)=>{
                return (<li key={key} style={{borderLeft: `1.25em solid ${item.color}`}}>
                <em>{item.label}</em>
                <span>{item.value}</span>
              </li>)
            })}
          </ul>
        </div>
      </div>
  </div>
}