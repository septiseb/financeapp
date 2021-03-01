import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
export default function CurrenciesRates() {
// 1. ESTADOS
    // DATOS DEL API
    const [data, setData] = useState({})
    // DATOS DE SI ESTÁ CARGANDO O NO
    const [loading, setLoading] = useState(true)
    // DATOS DE LAS FECHAS DE LOS INPUTS
    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })
    const { currency } = useParams()
    useEffect(() => {
        const getRates = async (cur) => {
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)
            const rates = await res.data.rates
            const labels = Object.keys(rates)
            const dataValues = Object.keys(rates).map((e) => {
                return rates[e][cur]
                // rates."2020-01-01".ILS
            })
            setData({
                labels: labels, // 39 fechas
                datasets: [
                    {
                        label: "Tipo de cambio USD",
                        data: dataValues, // 39 datos
                        borderColor: "blue",
                        pointBackgroundColor: "red",
                        pointRadius: 5
                    }
                ]
            })
            setLoading(false)
        }
        getRates(currency)
    },[currency, date])
    const handleDate = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }    
    return (
        <div>
            <div>
                <input 
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.startDate}
                    name="startDate"
                />
                <input 
                    type="date"
                    onChange={(e) => {handleDate(e)}}
                    value={date.endDate}
                    name="endDate"
                />
            </div>
            {
                loading ?
                    <h1>Cargando...</h1>
                    :
                    <Line 
                        data={data}
                    />
            }
        </div>
    )
}