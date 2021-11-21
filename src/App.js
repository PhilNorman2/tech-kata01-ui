import { Outlet, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { postSubscriber } from '../src/services/techKota01Service.js';

export default function App() {

  const [values, setValues] = useState({
    firstName: '',
    city: '',
    addedDate: '',
  });

  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [response_status_text, setResponseStatusText] = useState('');
  const [input_status, setInputStatus] = useState('');
  const [input_color, setInputColor] = useState('');
  const [post_data, setPostData] = useState(Object);

  let response_status = 0;

  useEffect(() => {
    // Post a Subscriber when submit is valid    
    if(valid) {
      handleSubscriberPost();
      setValid(false);
    }

    if(post_data.id !== undefined && post_data.id) {
      navigate(`/subscriber/${post_data.id}`);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid, post_data.id, navigate]);
  

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleCityInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      city: event.target.value,
    }));
  };
  
  const handleAddedDateInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      addedDate: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(values.firstName && values.city && values.addedDate) {
      setValid(true);
    };
  };

  async function handleSubscriberPost() {
    console.log("ready to postSubscriber");
    await postSubscriber('http://localhost:8080/api/subscribers/', values)
      .then(response => {
        response_status = response.status;
        if (response_status !== 200) {
          setResponseStatusText(response.statusText);
        }
        return response.text();
      })
      .then(data => {
        setPostData(JSON.parse(data));
        if (response_status !== 200)
          throw Error(`${response_status_text} ${data}`);    
      })
      .catch(error => {
        setInputColor('red');
        setInputStatus(`${error}`);
      });
  };

  return (
   <div>
      <div className="form-container">
        <h2> Create Subscriber </h2>
        <form className="subscriber-form" onSubmit={handleSubmit}>
          <input className="form-field"
            id="first-name"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleFirstNameInputChange}
          />
          { submitted && !values.firstName && <span id='first-name-error'>Please enter a first name</span> }
          <input
            id="city"
            className="form-field"
            type="text"
            placeholder="City Name"
            name="city"
            value={values.city}
            onChange={handleCityInputChange}
          />
          { submitted && !values.city && <span id='city-error'>Please enter a city</span> }
          <input
            id="addedDate"
            className="form-field"
            type="text"
            placeholder="Date of Joining (YYYY-MM-DD)"
            name="addedDate"
            value={values.addedDate}
            onChange={handleAddedDateInputChange}
          />
          { submitted && !values.addedDate && <span id='added-date-error'>Please enter the date subscriber was added</span> }
          <button className="form-field" type="submit">
            Next
          </button>
          <span style={{color: input_color}}> {input_status} </span>
          <nav>
        </nav>
        </form>       
        <Outlet />
        </div>      
    </div>
  );
}