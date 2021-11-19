import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getSubscriber } from '../../src/services/techKota01Service.js';
import '../App.css';
import '../index.css';

export default function Subscriber(props) {
  let params = useParams();

  const [subscriber_text, setSubscriberText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [retrieved_data, setRetrievedData] = useState(false);
  const [retrieved_button_clicked, setRetriveButtonClicked] = useState(false);
  const [parsed_data, setParsedData] = useState(false);
  const [subscriber_data, setSubscriberData] = useState([]) 


  useEffect(() => {
    if(retrieved_button_clicked) {
      SubscriberText(params.id);
      setRetrievedData(true);
    } else
      setRetrievedData(false);
      

    if((subscriber_text !== '') && !parsed_data) {
      setSubscriberData(JSON.parse(subscriber_text))
      setParsedData(true);
    }
  }, [retrieved_data, params.id, subscriber_text, parsed_data, retrieved_button_clicked]); 

  
  async function SubscriberText(id) {
    await getSubscriber(id)
      .then(res => res.text())
      .then(res => {
        setSubscriberText((res));
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }

    return (
      <div className="form-container">
        <h2>Subscriber</h2>
        {parsed_data && subscriber_data.id && <div className="form-field"> <b>Id:</b> {subscriber_data.id}</div>}
        {parsed_data && subscriber_data.firstName && <div className="form-field"> <b>First Name:</b> {subscriber_data.firstName}</div>}
        {parsed_data && subscriber_data.city && <div className="form-field"> <b>City Name:</b> {subscriber_data.city}</div>}
        {parsed_data && subscriber_data.id && <div className="form-field"> <b>Date of Joining:</b> {subscriber_data.addedDate}</div>}
        <span style={{color: 'red'}}> {errorMsg} </span>
        <button className="form-field"
          onClick={() => setRetriveButtonClicked(true)}>
          Retrieve
        </button>
      </div>
    );
    
  }