'use client'

import { FortyTwoProject } from '@/types/forty-two'

import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCalculatorStore } from '@/stores/calculator'

export function AddProject({ projects }: { projects: Array<FortyTwoProject> }) {
  const [open, setOpen] = useState(false)
  const [, setValue] = useState('')
  const { addProject } = useCalculatorStore()

  if (!projects) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          size="icon"
          aria-expanded={open}
        >
          <CirclePlus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandEmpty>No projects found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[400px]">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    addProject({
                      ...project,
                      final_mark: 100,
                      bonus_coalition: false
                    })

                    setValue('')
                    setOpen(false)
                  }}
                >
                  {project.name}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
