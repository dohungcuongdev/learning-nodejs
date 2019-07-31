import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, withRouter, Link, Route } from 'react-router-dom';
import File from './File';

function Repository({ match, location }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const repository = params.get('name');
        const build = params.get('build');
        fetch('http://localhost:8080/api/repository?name='+repository+'&build='+build)
            .then(res => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                alert(e);
            })
    }, [location.search]);
    const listDataItems = useMemo(() => {
        if (loading)
            return <li>Loading ...</li>
        return data.map(item =>
            <li key={item._id}>
                <p>Repository: <Link to={"/file?repository="+item.repository+"&build="+item.build_count}>{item.repository}</Link></p>
                <p>{item.build_count}</p>
                <p>Created at: {item.created_at}</p>
            </li>
        );
    }, [data, loading])
    return (
        <BrowserRouter>
            <Route path={"/repository"} render={() => <ul>{listDataItems}</ul>} />
            <Route path={"/file"} component={File} />
        </BrowserRouter>
    )
}

export default withRouter(Repository)