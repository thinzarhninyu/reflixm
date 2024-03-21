"use client"


import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Genre } from "@prisma/client"
import { Button } from "@/components/ui/button"

const GenreSelect = () => {

    const genres = Genre ? Object.keys(Genre) : [];

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? genres.find((genre) => genre === value)
              : "Select genre..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search genre..." />
            <CommandEmpty>No genre found.</CommandEmpty>
              {genres.map((genre) => (
                <CommandItem
                  key={genre}
                  value={genre}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? Genre.action : currentValue as Genre)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === genre ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {genre}
                </CommandItem>
              ))}
          </Command>
        </PopoverContent>
      </Popover> 
    )
}

export default GenreSelect;