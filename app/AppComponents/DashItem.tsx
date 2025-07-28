import { Pencil, Trash2, ShoppingCart } from "lucide-react"
import {
    Card,
    CardContent,
} from "../components/ui/card"

interface CardListItemProps {
    name: string
    price: number
}

export function DashItem({
    name,
    price,
}: CardListItemProps) {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col">
                {/* Icon and Details */}
                <div className="flex items-center gap-4">
                    {/* Icon Thumbnail */}
                    <div className="p-2 bg-gray-100 rounded-full">
                        <ShoppingCart className="h-10 w-10 text-blue-600" />
                    </div>
                    {/* Text Details */}
                    {/* <div className="flex flex-1"> */}
                        <div className="flex gap-2 items-center">
                            <div className="text-base font-semibold">{name}</div>
                            <div className="text-sm text-gray-500">${price.toFixed(2)}</div>

                        </div>
                        
                    {/* </div> */}
                </div>
            </CardContent>
        </Card>
    )
}
