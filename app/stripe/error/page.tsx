import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsDown } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <AlertCircle className="text-red-600 w-16 h-16 md:w-20 md:h-20 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-3xl text-xl text-gray-800 font-semibold text-center">
            Oops!
          </h3>
          <p className="text-gray-600 my-2">Something went wrong!</p>
          <p>Back to shop and try again</p>

          <Button variant="ghost" size="icon" className="mt-6">
            <Link href="/">
              <ChevronsDown className="w-10 h-10" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
