import React, { useState, useEffect, useMemo } from "react";

function Eslint() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/eslint')
            .then(res => res.json())
            .then((data) => {
                //console.log(data);
                setData(data);
            })
            .catch(console.log)
    }, []);
    const listDataItems = useMemo(() => {
        if(data.length <= 0)
            return <p>Loading ...</p>
        return data.map(item =>
            <li key={item._id}>
                <ul>
                    {
                        item.elements[0].elements.map((element,index) =>
                            <li key={"key"+index}>
                                <ol>
                                    <li>Name: {(element.attributes.name)}</li>
                                    { element && element.elements &&
                                        Array.prototype.slice.call(element.elements).map((e,index) =>
                                        <li key={"key"+index}>
                                            <p>Line: {e.attributes.line}</p>
                                            <p>Column: {e.attributes.column}</p>
                                            <p>Severity: {e.attributes.severity}</p>
                                            <p>Message: {e.attributes.message}</p>
                                            <p>Source: {e.attributes.source}</p>
                                        </li>
                                    )
                                    }
                                </ol>
                            </li>
                        )
                    }
                </ul>
            </li>
        );
    }, [data])
    return (
        <ul>
            {listDataItems}
        </ul>
    )
}

export default Eslint