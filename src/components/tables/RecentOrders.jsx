import TableHeading from "./TableHeading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { recentOrders } from "../Data/DummyData";


export default function RecentOrders() {
  return (
    <>
      <div className="bg-white p-4">
        <TableHeading title={"Recent Order"} link={'/orders'} />
        <div className="pt-4">
          <Table>
            <TableCaption>A list of your recent Orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                recentOrders.slice(0, 9).map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell className='flex items-center gap-1'>
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${item.customerName}`} />
                          <AvatarFallback>{item.customerName}</AvatarFallback>
                        </Avatar>
                        {item.customerName}
                      </TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                      <TableCell className={item.orderStatus === "Delivered" ? 
                        'text-right' : 'text-right' }>{item.orderStatus}</TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </div>
      </div>

    </>
  )
}
