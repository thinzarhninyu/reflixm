import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const AlertBox = ({ title, description }: { title: string, description: string }) => {
    return (
        <Alert className="mx-10 w-75">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export default AlertBox;