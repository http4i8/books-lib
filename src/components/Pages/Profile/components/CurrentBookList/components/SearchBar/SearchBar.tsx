import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Input } from '../../../../../../UI';

import { entriesHandler } from '../../../../../../../utils/entriesHandler';
import { useDebounce } from '../../../../../../../hooks';

import classes from './SearchBar.module.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchTerm = useDebounce(searchQuery, 800);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      if (searchParams.has('search')) {
        searchParams.delete('search');
        setSearchParams(searchParams);
        return;
      }
    } else {
      const entries = entriesHandler(searchParams);
      setSearchParams({
        ...entries,
        search: debouncedSearchTerm,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.search}>
      <Input
        onChange={onChangeSearch}
        type="text"
        id="search"
        placeholder="Search..."
        value={searchQuery}
        onClick={onClearSearch}
      />
    </div>
  );
};
