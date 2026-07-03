import React from 'react'
import {

    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"



import users from '@/components/Data/Users'
function DSHeding() {
    const [date, setDate] = React.useState({
        from: new Date(new Date().getFullYear(), 0, 20),
        to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    })
    return (
        <>
            <div className='flex w-full justify-between items-center'>
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {users[0]?.name || "Admin"}</h1>
                </div>
                <div>
                    <Field className="mx-auto w-60">
                        <Popover>
                            <PopoverTrigger render={<Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal"><CalendarIcon data-icon="inline-start" />{date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}</Button>} />
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                </div>
            </div>
        </>
    )
}

export default DSHeding