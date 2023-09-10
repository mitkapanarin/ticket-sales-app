import React from 'react'
import { useSearchEventsQuery } from "../store/API/EventsAPI";
import { useSelector } from 'react-redux';


const DisplaySearchResult = () => {
    const searchTerm = useSelector<string>(state => state.SearchTerm.searchTerm);
    // console.log(searchTerm)
    const { data, error, isLoading } = useSearchEventsQuery(searchTerm);
    console.log(data);
    return (
        <div>DisplaySearchResult</div>
    )
}

export default DisplaySearchResult