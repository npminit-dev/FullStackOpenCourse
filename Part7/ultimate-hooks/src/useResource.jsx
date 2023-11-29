import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    setResources(getAll())
  }, [])

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    let data = await request.data
    setResources(data)
  }
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources => [...resources, newObject])
  }
  
  const update = async (id, newObject) => {
    await axios.put(`${ baseUrl }/${id}`, newObject)
    console.log('updated!')
  }

  const service = {
    getAll,
    create,
    update
  }

  return [
    resources, service
  ]
}