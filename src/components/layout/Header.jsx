import { SidebarTrigger } from "../ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
  const [search, setSearch] = useState("");

  console.log(search);
  
  const user = [

    { id: 1, name: "Manohar" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Amit" },

  ]
  return (
    <>
      <header className="p-5 flex items-center justify-center w-full border-b gap-5">
        <div className="border w-fit rounded-lg p-0.5">
          <SidebarTrigger className='cursor-pointer' />
        </div>
        <div className="flex-1">
          <InputGroup className="max-w-sm">
            <InputGroupInput ref={inputRef} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <InputGroupAddon>
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd className='hidden md:block'>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user}`} />
            <AvatarFallback>{user[0].name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger >
              <div className="flex items-center gap-2 cursor-pointer">
                <p>{user[0].name}</p>
                <ChevronDown size={15} />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">

              <div className="px-2 py-2">
                <p className="font-medium">
                  {user[0].name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Admin
                </p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                My Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                Account Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                Notifications
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Help & Support
              </DropdownMenuItem>

              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

    </>
  )
}

export default Header
