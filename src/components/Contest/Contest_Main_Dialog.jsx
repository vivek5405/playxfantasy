import React, { useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import style from './style1.module.css';
import SvgIcon from '../SvgIcon';
import { contest } from '../../assets/SvgCodes/Contest';
const FilterDialog = ({ isOpen, onClose, onFilterApply , entryFilters, setEntryFilters  }) => {
  const cancelButtonRef = useRef(null)

  const data = [
    {
      name : 'Entry',
      field : 'entry_amount',
      items : [
        {
          name : '₹1 to ₹50',
          min : 1,
          max : 50
        },
        {
          name : '₹51 to ₹100',
          min : 51,
          max : 100
        },
        {
          name : '₹101 to ₹1000',
          min : 101,
          max : 1000
        },
        {
          name : '₹1001 & above',
          min : 1001,
          max : 1000000
        }
      ]
    },
    {
      name : 'Spots ',
      field : 'total_entries',
      items : [
        {
          name : '2',
          min : 1,
          max : 2
        },
        {
          name : '3-10',
          min : 3,
          max : 10
        },
        {
          name : '11-100',
          min : 11,
          max : 100
        },
        {
          name : '101-1000',
          min : 101,
          max : 1000
        },
        {
          name : '1001 & above',
          min : 1001,
          max : 1000000
        }
      ]
    },
    {
      name : 'Prize Pool',
      field : 'pool_prize_amount',
      items : [
        {
          name : '₹1 - ₹10000',
          min : 1,
          max : 10000
        },
        {
          name : '₹10000 - ₹1 Lakh',
          min : 10000,
          max : 100000
        },
        {
          name : '₹1 Lakh - ₹10 Lakh',
          min : 100000,
          max : 1000000
        },
        {
          name : '₹10 Lakh - ₹25 Lakh',
          min : 1000000,
          max : 2500000
        },
        {
          name : '₹25 Lakh & above',
          min : 2500000,
          max : 99000000
        }
      ]
    },
    {
      name : 'Contest Type',
      field : 'max_entry',
      field2 : 'total_winners_count',
      items : [
        {
          name : 'Single Entry',
          min : 1,
          max : 1
        },
        {
          name : 'Multiple Entry',
          min : 1,
          max : 50
        },
        {
          name : 'Single Winner',
          min : 1,
          max : 1
        },
        {
          name : 'Multi Winner',
          min : 1,
          max : 1000000000
        },
        {
          name : 'Guaranteed',
          min : 2500000,
          max : 99000000
        }
      ]
    }
  ]
  const ClearFilter = () => {
    setEntryFilters([null]);
  };

  const getFilterValues = (category, selectedFilters) => {
    if (selectedFilters.length === 0) {
      return null; // No filters selected, return null for this category
    }
  
    const selectedItems = category.items.filter((item) => selectedFilters.includes(item.name));
  
    if (selectedItems.length === 0) {
      return null; // No items selected, return null for this category
    }
  
    // Handle different conditions for the "Contest Type" category
    if (category.field2 && category.field2 !== category.field) {
      const minValues = selectedItems.map((item) => item.min);
      const maxValues = selectedItems.map((item) => item.max);
  
      return {
        field: category.field,
        field2: category.field2,
        min: Math.min(...minValues),
        max: Math.max(...maxValues),
      };
    } else {
      const minValues = selectedItems.map((item) => item.min);
      const maxValues = selectedItems.map((item) => item.max);
  
      return {
        field: category.field,
        min: Math.min(...minValues),
        max: Math.max(...maxValues),
      };
    }
  };
  

  const toggleFilter = (category, item, setFilter) => {
    setFilter((prevFilters) => {
      if (prevFilters.includes(item.name)) {
        // Deselecting filter
        console.log(`Deselected: ${category.name} - ${item.name}`);
        return prevFilters.filter((prevFilter) => prevFilter !== item.name);
      } else {
        // Selecting filter
        console.log(`Selected: ${category.name} - ${item.name}, Min: ${item.min}, Max: ${item.max}`);
        return [...prevFilters, item.name];
      }
    });
  };

  const isButtonActive = (filter, selectedFilters) => {
    return selectedFilters.includes(filter);

  };

  const handleApply = () => {
    const appliedFilters = data
      .map((category) => getFilterValues(category, entryFilters))
      .filter(Boolean); // Filter out null values
    onFilterApply(appliedFilters);
    onClose();
  };


  return (
    <Transition show={isOpen} as="div">
      <Dialog
        as="div"
        className={style.filter_dialog_main_container}
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className={style.header_container}>
          <SvgIcon iconName={contest?.icon7} onClick={onClose} />
          <p className={style.header_title}>Filter</p>
          <button type="button" onClick={ClearFilter}>
            <SvgIcon iconName={contest?.icon8} />
            Clear
          </button>
        </div>

        <div className={style.filter_dialog_content_container}>
        {
          data.map((category,index) => (
            <div key={category.field}>
              <p className={style.title}>{category.name}</p>
              <div className={style.filter_button_wrapper}>
                {category.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={isButtonActive(item.name, entryFilters) ? style.active : style.inactive}
                    onClick={() => toggleFilter(category, item, setEntryFilters)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              { index !== 3 ? ( <div className={style.hr}></div>) :  null}
            </div>
          ))
        }
        </div>

        <div className={style.apply_btn_container}>
          <button type="button" className={style.apply_btn} onClick={handleApply}>
          Apply
        </button>
        </div>
        
      </Dialog>
    </Transition>
  );
}

export default FilterDialog;

