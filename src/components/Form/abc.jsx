import React, { useState, useEffect, useCallback } from 'react';
import Style from './Form.module.css';
import { useTelegram } from '../../hooks/useTelegram';
import { citiesUkr, countries } from '../config';

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
  const [country, setCountry] = useState('');

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
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

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
      />
      <div class="input-field col s12">
        <select
          name="country"
          value={user.country}
          onChange={handleChangeCountry}
          multiple
        >
          <option value="" disabled selected>
            Choose your option
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <input
        className={Style.input}
        type="text"
        name="city"
        placeholder="City"
        value={user.city}
        onChange={handleChange}
      />
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
