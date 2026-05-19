import { Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CV from "../components/CV";
import { Button } from "@/components/ui/button";

const CVPage = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:p-0 print:py-0">
            <div className="container mx-auto max-w-[210mm] relative print:w-full print:max-w-none print:m-0 print:p-0">
                {/* Controls - Hidden on print */}
                <div className="flex justify-between items-center mb-6 print:hidden px-4 md:px-0">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                    <Button onClick={handlePrint} className="gap-2 shadow-lg">
                        <Printer className="w-4 h-4" />
                        Print / Save as PDF
                    </Button>
                </div>

                {/* CV Content */}
                <CV />

                <div className="mt-8 text-center text-sm text-gray-500 print:hidden pb-8">
                    <p>Tip: Use "Save as PDF" in the print dialog to download.</p>
                </div>
            </div>
        </div>
    );
};

export default CVPage;
