const { useState, useEffect } = require("react")

const useFetch = (API_REQUEST) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_REQUEST).then(res => {
            if(!res.ok){
                throw Error('Cannot fetch the data from that resource try again later')
            }
            return res.json();
        }).then(data => {
            setLoading(false)
            setData(data);
            setError(null)
        }).catch(err => {
            setLoading(false)
            setError(err.message)
        })
    }, [API_REQUEST])

    return {data, loading, error}
}

export default useFetch;