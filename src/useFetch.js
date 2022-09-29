const { useState, useEffect } = require("react")

const useFetch = (API_REQUEST) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(API_REQUEST).then(res => {
                if(!res.ok){
                    throw Error('Could not fetch the data from that URL');
                }
                return res.json();
            }).then(data => {
                setLoading(false);
                setData(data);
                setError(null);
            }).catch(err => {
                setLoading(false);
                setError(err.message);
            })
        }, 1500)
    }, [API_REQUEST])

    const refetch = () => {
        fetch(API_REQUEST).then(res => {
            if(!res.ok){
                throw Error('Could not fetch the data from that URL');
            }
            return res.json();
        }).then(data => {
            setLoading(false);
            setData(data);
            setError(null);
        }).catch(err => {
            setLoading(false);
            setError(err.message);
        })
    }

    return { data, loading, error, refetch };
}

export default useFetch;
    