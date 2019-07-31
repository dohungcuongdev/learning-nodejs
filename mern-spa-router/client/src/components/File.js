import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, withRouter, Link, Route } from 'react-router-dom';
import Problem from './Problem';

function File({ location }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = new URLSearchParams(location.search);
    const repository = params.get('repository');
    const build = params.get('build');
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/files?repository=' + repository + '&build=' + build)
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
            return <p>Loading ...</p>
        return data.map(item =>
            <li key={item._id}>
                <p>File: <Link to={"/problem?repository="+repository+"&build="+build+"&file="+encodeURIComponent(item.file_name)}>{item.file_name}</Link></p>
            </li>
        );
    }, [data, loading])
    return (
        <BrowserRouter>
            <Route path={"/file"} render={() => <ul>{listDataItems}</ul>} />
            <Route path={"/problem"} component={Problem} />
        </BrowserRouter>
    )
}

export default withRouter(File)