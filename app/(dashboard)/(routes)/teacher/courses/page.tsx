import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage () {
    return (
        <div className="p-6">
            <Link href="/teacher/addcourse">
                <Button>
                    Add course
                </Button>
            </Link>
        </div>
    )
}