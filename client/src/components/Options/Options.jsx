import React, { useEffect,} from 'react'
import { useDispatch} from 'react-redux'
import s from '../Options/Options.module.css'
import { getCreates, getFilterAsc, getFilterMax, getRecipes, getTypeDiet} from '../../redux/action'
import { Link } from 'react-router-dom'

const Options = () => {

    const dispatch = useDispatch()
   
   

    const handleByOrder =(e)=>{
        e.preventDefault()
        dispatch(getFilterAsc(e.target.value))
    }

    useEffect(() => {
      dispatch(getRecipes())
    //   dispatch(types())
    }, [dispatch])


    const handlefilter = (e)=>{
        e.preventDefault()
        dispatch( getTypeDiet(e.target.value))
       
    }
    

    const sortByScore = (e)=>{
        e.preventDefault()
        dispatch(getFilterMax(e.target.value))
    }

    const handleCreate = (e)=>{
        e.preventDefault()
        dispatch(getCreates(e.target.value))
    }
    
  return (
    <div className={s.flexi}>
        <Link to="/create" className={s.crea}>
            <button>Create Recipes</button>
        </Link>
        <div>
        <label htmlFor="">Filter By:</label>
        <select onChange={handleCreate} >
                    <option value='ALL'> Total Recipes </option>
                    <option value='createdInDb'> Recipes Created </option>
                    <option value='JE'> Recipes Api </option> 
                </select>
        </div>
        <div>
        <label htmlFor="">Filter By A-Z:</label>
            <select  onChange={handleByOrder}>
                <option >Alphabetical Order</option>
                <option value="asc"> A-Z </option>
                <option value="desc"> Z-A </option>
            </select>
        </div>

        <div>
            <label htmlFor="">Diet Types:</label>
            <select  onChange={handlefilter}>
                <option value="All">types..</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="vegan">Vegan</option>
                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                <option value="fodmap friendly">Formap Friendly</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="whole 30">Whole 30</option>
                <option value="vegetarian">Vegetarian</option>
            </select>
        </div>

        <div>
                <label htmlFor="">Score:</label>
                     <select onChange={sortByScore}>
                        <option>Score:</option>
                        <option value="max">Max Score</option>
                        <option value="min">Min Score</option>
                    </select>
         </div>
    </div>
  )
}

export default Options