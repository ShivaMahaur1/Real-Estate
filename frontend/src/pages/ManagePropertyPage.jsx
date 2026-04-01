// frontend/src/pages/ManagePropertyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManagePropertyPage = () => {
  const { token } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/manage/${token}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load property.');
        setLoading(false);
      }
    };
    fetchProperty();
  }, [token]);

  if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Manage Your Property: {property.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Interested Buyers ({property.interestedBuyers.length})</h3>
          {property.interestedBuyers.length === 0 ? <p>No buyers yet.</p> : (
            <ul className="list-group">
              {property.interestedBuyers.map((buyer, index) => (
                <li key={index} className="list-group-item">
                  <strong>{buyer.name}</strong> ({buyer.email}) - {new Date(buyer.date).toLocaleDateString()}
                  <p className="mb-0 mt-1">{buyer.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-6">
          <h3>Interested Renters ({property.interestedRenters.length})</h3>
          {property.interestedRenters.length === 0 ? <p>No renters yet.</p> : (
            <ul className="list-group">
              {property.interestedRenters.map((renter, index) => (
                <li key={index} className="list-group-item">
                  <strong>{renter.name}</strong> ({renter.email}) - {new Date(renter.date).toLocaleDateString()}
                  <p className="mb-0 mt-1">{renter.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePropertyPage;