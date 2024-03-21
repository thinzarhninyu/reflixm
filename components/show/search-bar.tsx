"use client"

import { useState } from 'react';
import { Genre } from '@prisma/client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

const SearchBar = ({
  search: initialSearch = "",
  genre: initialGenre = "",
  setSearch,
  setGenre,
}: {
  search?: string;
  genre?: Genre | string;
  setSearch?: (search: string) => void;
  setGenre?: (genre: Genre) => void;
}) => {
  const [search, setSearchValue] = useState(initialSearch);
  const [genre, setGenreValue] = useState(initialGenre ?? "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (setSearch) {
      setSearch(e.target.value);
    }
  };

  const handleGenreChange = (selectedGenre: Genre) => {
    setGenreValue(selectedGenre);
    if (setGenre) {
      setGenre(selectedGenre);
    }
  };

  const genres = Object.keys(Genre);

  return (
    <div className="flex flex-row gap-x-3 w-full">
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search show..."
      />
      <Select value={genre} onValueChange={handleGenreChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button asChild>
        <Link
          href={`/shows?${search ? `search=${search}` : ""}${search && genre ? "&" : ""
            }${genre ? `genre=${genre}` : ""}`}
        >
          Search
        </Link>
      </Button>
    </div>
  );
};

export default SearchBar;