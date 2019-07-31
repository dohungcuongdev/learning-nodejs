import React, { useState, useEffect, useMemo } from "react";
import { withRouter } from 'react-router-dom'

function Problem({ location }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const repository = params.get('repository');
        const build = params.get('build');
        const file = params.get('file');
        fetch('http://localhost:8080/api/problems?repository=' + repository + '&build=' + build + '&file=' + file)
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
                <p>Line: {item.line}</p>
                <p>Column: {item.column}</p>
                <p>Message: {item.message}</p>
                <p>Source: {item.source}</p>
            </li>
        );
    }, [data, loading])
    return (
        <ol>
            {listDataItems}
        </ol>
    )
}

export default withRouter(Problem)