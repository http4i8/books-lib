import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import { DropdownElm } from './DropdownElm/DropdownElm';
import { useClickOutside } from '../../../hooks';

import { StatusItem } from '../../../types';

import classes from './Dropdown.module.scss';

interface DropdownProps {
  dropdownItems: StatusItem[];
  defaultItem: StatusItem;
  onStatusChange: Dispatch<SetStateAction<StatusItem>>;
}

export const Dropdown = ({
  dropdownItems,
  defaultItem,
  onStatusChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  const dropdownRef = useClickOutside(onCloseHandler);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onChangeText = (id: number) => {
    const selectedElm = dropdownItems.find((s) => s.id === id);

    if (selectedElm === undefined) {
      return;
    }
    onStatusChange(selectedElm);
    toggleDropdown();
  };

  useEffect(() => {
    setSelectedItem(defaultItem);
  }, [defaultItem]);

  const dropdownTitle = isOpen
    ? `${classes.dropdown__title} ${classes.active}`
    : classes.dropdown__title;

  const openDropdown = isOpen
    ? `${classes.dropdown__list} ${classes.open}`
    : classes.dropdown__list;

  const btnText = isOpen
    ? `${classes.dropdown__btn} ${classes.change}`
    : classes.dropdown__btn;

  return (
    <div className={classes.dropdown}>
      <span className={dropdownTitle}>Status*</span>
      <div ref={dropdownRef} className={classes.dropdown__wrapper}>
        <button type="button" onClick={toggleDropdown} className={btnText}>
          <div>{selectedItem.title}</div>
        </button>
        <ul className={openDropdown}>
          {dropdownItems.map((elm) => {
            return (
              <DropdownElm
                key={elm.id}
                onClick={() => onChangeText(elm.id)}
                title={elm.title}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
