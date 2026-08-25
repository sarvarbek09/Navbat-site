import Salon from "./salon"

const salons = [
    {id:"asdfwe",title:"Aura Studio", owner:"Elena Rodriguez", types: ["Hair Styling", "Color"], imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VZhhVv30Zl9fSg4yZnbzEn-I6JFPasbuhuhYQe-bWQ&s=10", badge:"verified", reviews: 124, rating:4.9},
    {id:"qfasfa",title:"Zenith Spa", owner:"Elena Rodriguez", types: ["Hair Styling", "Color"], imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VZhhVv30Zl9fSg4yZnbzEn-I6JFPasbuhuhYQe-bWQ&s=10", badge:"verified", reviews: 124, rating:4.9},
    {id:"24aasd",title:"Polished Studio", owner:"Elena Rodriguez", types: ["Hair Styling", "Color"], imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VZhhVv30Zl9fSg4yZnbzEn-I6JFPasbuhuhYQe-bWQ&s=10", badge:"verified", reviews: 124, rating:4.9},
    {id:"heha14",title:"Level up", owner:"Elena Rodriguez", types: ["Hair Styling", "Color"], imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VZhhVv30Zl9fSg4yZnbzEn-I6JFPasbuhuhYQe-bWQ&s=10", badge:"verified", reviews: 124, rating:4.9},
]

export default function SalonsGrid () {
    return (<>
        <div className="grid grid-cols-4 gap-4">{salons.map(item => (
            <Salon key={item.id} {...item}/>
        ))}</div>
    </>)
}