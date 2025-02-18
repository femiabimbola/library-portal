import { Button } from "@/components/ui/button"


const Books = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7"> 
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-xl font-semibold"> All Books</h2>
      <Button> Create a New Book</Button>
    </div>
    </section>
  )
}

export default Books