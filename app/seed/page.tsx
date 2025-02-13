import Seed from "@/server/action";


export default function SeedData() {
    return (
        <div>
            <form action={Seed}>
                <button>Seed data</button>
            </form>
        </div>
    )
}