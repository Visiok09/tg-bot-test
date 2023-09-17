import React, { useState, useEffect, useCallback } from 'react';
import Style from './Form.module.css';
import { useTelegram } from '../../hooks/useTelegram';
import { citiesByCountry, countries } from '../config';

const Form = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    country: '',
    city: '',
    subject: 'client',
    MasterOptions: {
      external: [],
      internal: [],
      complex: [],
    },
  });

  const [selectedMasterOption, setSelectedMasterOption] = useState('');
  const [selectedSubOptions, setSelectedSubOptions] = useState({
    external: [],
    internal: [],
    complex: [],
  });
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = JSON.stringify(user);
    tg.sendData(data);
  }, [user, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Send data',
    });
  }, []);

  useEffect(() => {
    if (!user.name || !user.country || !user.city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [user, tg]);

  const handleChange = (event) => {
    const { name, city, country, value } = event.target;
    if (event.target.value == user.name) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
    if (event.taget.value == user.city) {
      setUser((prevUser) => ({
        ...prevUser,
        [city]: value,
      }));
    }
    if (event.taget.value == user.country) {
      setUser((prevUser) => ({
        ...prevUser,
        [country]: value,
      }));
    }
  };
  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity('');
  };
  const handleChangeCity = (event) => {
    setSelectedCity(event.target.value);
  };

  const cityOptions = citiesByCountry[selectedCountry] || [];

  const handleMasterOptionChange = (event) => {
    const { value } = event.target;
    setSelectedMasterOption(value);
  };

  const handleSubOptionChange = (event) => {
    const { value } = event.target;

    setSelectedSubOptions((prevSelectedSubOptions) => ({
      ...prevSelectedSubOptions,
      [selectedMasterOption]: prevSelectedSubOptions[selectedMasterOption]
        ? prevSelectedSubOptions[selectedMasterOption].includes(value)
          ? prevSelectedSubOptions[selectedMasterOption].filter(
              (option) => option !== value
            )
          : [...prevSelectedSubOptions[selectedMasterOption], value]
        : [value],
    }));
  };

  return (
    <div className={Style.form}>
      <h3>Input your data</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={handleChange}
        className={Style.input}
      />
      <select
        name="country"
        value={selectedCountry}
        onChange={handleChangeCountry}
        className={Style.select}
      >
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        className={Style.input}
        type="text"
        name="city"
        placeholder="City"
        value={selectedCity}
        onChange={handleChangeCity}
      >
        {cityOptions.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        name="subject"
        value={user.subject}
        onChange={handleChange}
        className={Style.select}
      >
        <option value={'client'}>Client</option>
        <option value={'master'}>Master</option>
      </select>
      {user.subject === 'master' && (
        <div>
          <select
            name="masterOption"
            value={selectedMasterOption}
            onChange={handleMasterOptionChange}
            className={Style.select}
            multiple
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="external">External</option>
            <option value="internal">Internal</option>
            <option value="complex">Complex</option>
          </select>
          {selectedMasterOption && (
            <select
              name="subOption"
              value={selectedSubOptions[selectedMasterOption] || []}
              onChange={handleSubOptionChange}
              className={Style.select}
              multiple
            >
              {selectedMasterOption === 'external' && (
                <>
                  <option value="" disabled selected>
                    Choose your option
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </>
              )}
              {selectedMasterOption === 'internal' && (
                <>
                  <option value="" disabled selected>
                    Choose your option
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </>
              )}
              {selectedMasterOption === 'complex' && (
                <>
                  <option value="" disabled selected>
                    Choose your option
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </>
              )}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
