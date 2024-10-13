import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const [PODs, setPODs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7166/api/Pod')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPODs(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>PODs from API:</h1>
            {PODs && PODs.length > 0 ?
                (
                    PODs.map((pod) => (
                        <div key={pod.id}>
                            <p>Id: {pod.id}</p>
                            <p>Type: {pod.date}</p>
                            <p>Slot: {pod.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
        </div>
    );
};

export default MyComponent;

// const PODsContext = React.createContext([]);

// function PODsProvider({ children }) {
//     const [STOREs, setSTOREs] = useState(null);
//     const [TYPEs, setTYPEs] = useState(null);
//     const [PODs, setPODs] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch('https://localhost:7166/api/Store')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setSTOREs(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error);
//                 setLoading(false);
//             });
//         fetch('https://localhost:7166/api/Type')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setTYPEs(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error);
//                 setLoading(false);
//             });
//         fetch('https://localhost:7166/api/Pod')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setPODs(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <PODsContext.Provider value={{ STOREs, TYPEs, PODs, loading, error }}>
//             {children}
//         </PODsContext.Provider>
//     );
// }

// export { PODsProvider, PODsContext };
