import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, withRouter, Link, Route } from 'react-router-dom';
import Repository from './Repository';

function Build({ location }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/builds')
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                alert(e);
            })
    }, []);
    const listDataItems = useMemo(() => {
        if (loading)
            return <li>Loading ...</li>
        return data.map(item =>
            <li key={item._id}>
                <p>Repository: <Link to={"/repository?name="+item.repository+"&build="+item.build_count}>{item.repository}</Link></p>
                <p>Build count: {item.build_count}</p>
                <p>Created at: {item.created_at}</p>
            </li>
        );
    }, [data, loading])
    return (
        <BrowserRouter>
            <Route path="/builds" render={() => <ul>{listDataItems}</ul>} />
            <Route path="/repository" component={Repository} />
        </BrowserRouter>
    )
}

export default withRouter(Build)