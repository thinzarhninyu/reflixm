import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center mb-16 p-10 lg:p-24">
            <SignIn />
        </main>
    );
}