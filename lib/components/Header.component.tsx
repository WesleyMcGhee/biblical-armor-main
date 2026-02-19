import { Button } from "@/components/ui/button";

export function Header() {
   return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-primary -skew-y-12 origin-top-left "  />
      <div className="flex justify-between">
      <div className="h-[50vh]">
        <h1>Logo</h1>
      </div>
        <div>
          <ul className="flex">
            <li className="text-foreground">Home</li>
            <li>Articles</li>
            <li>About</li>
          </ul>
        </div>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
      
    </div>
  )
}
