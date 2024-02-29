import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Autocomplete = ({ options = [], value, placeholder, onChange }) => {
  const autocomplete = useRef();

  const [optionsData, setOptionsData] = useState([]);
  const [query, setQuery] = useState(value);
  const [isShow, setIsShow] = useState(false);

  const handleInputChange = (v) => {
    setQuery(v);
    onChange(v);
    v === ""
      ? setOptionsData([])
      : setOptionsData([
          ...options.filter(
            (x) => x.toLowerCase().indexOf(v.toLowerCase()) > -1
          )
        ]);
  };

  const handleClickOutSide = (e) => {
    if (!autocomplete.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  const hilightSearchText = (text) => {
    var pattern = new RegExp("(" + query + ")", "gi");
    var new_text = text.replace(pattern, `<b>${query}</b>`);
    return new_text;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    optionsData.length !== 0 ? setIsShow(true) : setIsShow(false);
  }, [optionsData]);

  return (
    <Wrapper ref={autocomplete}>
      <InputField
        type="search"
        placeholder={placeholder}
   
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        className="inputStyle auto-complete-state"
      />
      {isShow && (
        <ListWrapper>
          {optionsData.map((x, index) => (
            <ListItem
              onClick={() => {
                setQuery(x);
                setIsShow(false);
                onChange(x);
              }}
              key={index}
            >
              {
                <div className="p-2 font-medium"
                  dangerouslySetInnerHTML={{ __html: hilightSearchText(x) }}
                />
              }
            </ListItem>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default Autocomplete;

const Wrapper = styled.div`
  position: relative;
  min-width: 320px;
  margin-top:10px;
 
`;

const InputField = styled.input`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  color: #5777E5;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.08px;
  outline: none;
  border: 0px;
  background: transparent;
  min-width: 320px;
  border-radius: 8px;
  border: 1.5px solid #717DCC;
  display: flex;
  align-items: center;
  padding: 14px;
  box-shadow: 0px 3px 10px 0px rgba(64, 92, 189, 0.20);
  &:focus {
    border: 2px solid #5777E5; /* Change the border color and thickness on focus */
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
  position: absolute;
  top: 44px;
  z-index: 10;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06);
  margin-top: 10px;
 
`;

const ListItem = styled.button`
  text-align: left;
  padding:  8px;
  width: 100%;
  background: #fff;
  outline: none;
  border: none;
  color:white;
  background-color:#161720 !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    background: #fff;
  }
`;
