import { ChevronDown, Search } from 'lucide-react'
import React from 'react'
import CategoryTable from './CategoryTable'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function CategoryFilters() {
    return (
        <div className='bg-white w-full h-full border border-gray-200 rounded-xl p-3 flex flex-col min-h-0 overflow-hidden'>
            <div className="flex w-full justify-between items-center gap-5 mb-3 shrink-0">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search category..."
                        className="w-full h-9 pl-9 pr-3 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
                    />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger className="p-4" render={<Button variant="outline" className="h-9 border-gray-200 bg-white text-gray-600 font-normal hover:bg-gray-50">
                                All Status
                                <ChevronDown size={16} />
                            </Button>} />
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>

                                        Active
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                                </DropdownMenuGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="h-9 border-gray-200 bg-white text-gray-600 font-normal">
                                <SelectValue placeholder="Sort By: Newest" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <CategoryTable />
            </div>
        </div>
    )
}
