import React, { useEffect, useState } from 'react';
import "./Facets.css"

export default function Facets({ heroId }) {
    const [facets, setFacets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!heroId) { 
            console.error('HeroId is not provided');
            setLoading(false);
            return;
        }

        const fetchFacets = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/facet/${heroId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();               
                setFacets(data);
            } catch (err) {
                console.error('Error fetching facets:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFacets();
    }, [heroId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="Facets">
            {facets.length > 0 ? (
                facets.map(facet => (
                    <div key={facet.FacetId} className="facet" style={{ backgroundColor: facet.Color }}>
                        <h3>{facet.FacetName}</h3>                         
                        {/* <p>{facet.FacetDescription}</p> */}
                    </div>
                ))
            ) : (
                <p>No facets available for this hero.</p>
            )}
        </div>
    );
}
