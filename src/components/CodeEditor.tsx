import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Code } from "lucide-react";

interface AnalysisResult {
  type: "success" | "warning" | "error";
  message: string;
  icon: React.ReactNode;
}

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let result: AnalysisResult;

    if (code.trim() === '') {
      result = {
        type: "warning",
        message: "Please enter some code to analyze.",
        icon: <AlertTriangle className="w-5 h-5" />
      };
    } else if (code.includes('console.log') && code.includes('function')) {
      result = {
        type: "success",
        message: "Great! Your code includes proper function structure and debugging statements. Code looks well-structured.",
        icon: <CheckCircle className="w-5 h-5" />
      };
    } else if (code.includes('error') || code.includes('undefined') || code.includes('null')) {
      result = {
        type: "error",
        message: "Found potential errors or undefined references in the code. Consider adding proper error handling.",
        icon: <XCircle className="w-5 h-5" />
      };
    } else if (code.includes('var ')) {
      result = {
        type: "warning",
        message: "Consider using 'let' or 'const' instead of 'var' for better variable scoping.",
        icon: <AlertTriangle className="w-5 h-5" />
      };
    } else if (code.length < 20) {
      result = {
        type: "warning",
        message: "Code snippet seems quite short. Consider adding more logic for a comprehensive analysis.",
        icon: <AlertTriangle className="w-5 h-5" />
      };
    } else {
      result = {
        type: "success",
        message: "Code looks good! No obvious errors found. Well done!",
        icon: <CheckCircle className="w-5 h-5" />
      };
    }

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="container mx-auto py-8 px-6 space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            Write Your Code Here
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Type your JavaScript code here..."
            className="min-h-[300px] font-mono text-sm bg-code text-code-foreground border-2 focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-4">
            <Button 
              onClick={analyzeCode}
              disabled={isAnalyzing}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Code"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Analysis Output</CardTitle>
        </CardHeader>
        <CardContent>
          {analysisResult ? (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-subtle">
              <Badge variant={analysisResult.type === "success" ? "default" : 
                             analysisResult.type === "warning" ? "secondary" : "destructive"} 
                     className="mt-0.5">
                {analysisResult.icon}
              </Badge>
              <p className="text-sm leading-relaxed">{analysisResult.message}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Your analysis results will appear here after you click "Analyze Code".
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeEditor;