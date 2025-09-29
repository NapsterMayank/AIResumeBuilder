import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Sparkles, 
  RefreshCw,
  Building,
  Briefcase,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/config/apiConfig';

const CoverLetterGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [jobDetails, setJobDetails] = useState({
    company: '',
    position: '',
    jobDescription: '',
    hiringManager: '',
    source: ''
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentRole: '',
    experience: ''
  });

  const [tone, setTone] = useState('professional');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and passionate' },
    { value: 'confident', label: 'Confident', description: 'Assertive and self-assured' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' }
  ];

  const generateCoverLetter = async () => {
    if (!jobDetails.company || !jobDetails.position) {
      alert('Please fill in at least the company name and position');
      return;
    }

    setIsGenerating(true);
    try {
      const context = `ROLE:${jobDetails.position}; COMPANY:${jobDetails.company}; MANAGER:${jobDetails.hiringManager}; SOURCE:${jobDetails.source}; TONE:${tone}; CANDIDATE:${personalInfo.name} ${personalInfo.email} ${personalInfo.phone}; CURRENT_ROLE:${personalInfo.currentRole}; EXPERIENCE:${personalInfo.experience}; JOB_DESC:${jobDetails.jobDescription}`;
      const res = await fetch(API_ENDPOINTS.REGENERATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType: 'cover_letter', text: context, keywords: skills.split(',').map(s=>s.trim()).filter(Boolean), experienceLevel: tone })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const letter = data.rewrittenText || '';
      setGeneratedLetter(letter);
      setWordCount(letter.split(' ').length);
    } catch (e) {
      alert('Failed to generate via AI. Please ensure API is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResumeUpload = async (file: File) => {
    try {
      const text = await file.text();
      // Extremely lightweight parsing heuristic to pre-fill fields
      const lines = text.split(/\r?\n/).filter(Boolean);
      const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
      const phoneMatch = text.match(/\+?\d[\d\s().-]{7,}/);
      setPersonalInfo(prev => ({
        ...prev,
        name: prev.name || lines[0]?.trim() || prev.name,
        email: prev.email || emailMatch?.[0] || prev.email,
        phone: prev.phone || (phoneMatch ? phoneMatch[0] : prev.phone),
      }));
      // Guess current role from keywords
      const roleMatch = text.match(/(Engineer|Developer|Designer|Manager|Analyst|Scientist)/i);
      if (roleMatch && !personalInfo.currentRole) {
        setPersonalInfo(prev => ({ ...prev, currentRole: roleMatch[0] }));
      }
    } catch {
      // ignore parse errors
    }
  };

  const downloadAsPdf = () => {
    // Use browser print-to-PDF for a clean export
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>Cover Letter</title>
      <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; padding:24px; line-height:1.6}
      h1{font-size:20px;margin:0 0 16px} pre{white-space:pre-wrap; font:inherit}</style></head><body>
      <h1>Cover Letter</h1><pre>${generatedLetter.replace(/</g,'&lt;')}</pre></body></html>`);
    w.document.close();
    w.focus();
    w.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    // You could add a toast notification here
  };

  const regenerateLetter = () => {
    generateCoverLetter();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-l font-bold text-foreground">AI Cover Letter Generator</h1>
            </div>
            <div className="flex items-center gap-4">
              {generatedLetter && (
                <>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="hero" size="sm" onClick={downloadAsPdf}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            {/* Upload Resume */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Upload Resume (Optional)
                </CardTitle>
                <CardDescription>We will pre-fill some details from your resume text.</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.rtf,.doc,.docx,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleResumeUpload(file);
                  }}
                />
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Job Details
                </CardTitle>
                <CardDescription>
                  Information about the position you're applying for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={jobDetails.company}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Google"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={jobDetails.position}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hiringManager">Hiring Manager</Label>
                    <Input
                      id="hiringManager"
                      value={jobDetails.hiringManager}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, hiringManager: e.target.value }))}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source">How did you find this job?</Label>
                    <Input
                      id="source"
                      value={jobDetails.source}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, source: e.target.value }))}
                      placeholder="LinkedIn, Company website, etc."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDetails.jobDescription}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, jobDescription: e.target.value }))}
                    placeholder="Paste the job description here to get a more tailored cover letter..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Your Information
                </CardTitle>
                <CardDescription>
                  Your professional background and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input
                      id="currentRole"
                      value={personalInfo.currentRole}
                      onChange={(e) => setPersonalInfo(prev => ({ ...prev, currentRole: e.target.value }))}
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={personalInfo.experience}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="5 years"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tone Selection */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Writing Style
                </CardTitle>
                <CardDescription>
                  Choose the tone that best fits the company culture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((toneOption) => (
                        <SelectItem key={toneOption.value} value={toneOption.value}>
                          <div>
                            <div className="font-medium">{toneOption.label}</div>
                            <div className="text-sm text-muted-foreground">{toneOption.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((toneOption) => (
                      <Badge 
                        key={toneOption.value}
                        variant={tone === toneOption.value ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => setTone(toneOption.value)}
                      >
                        {toneOption.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Generate Cover Letter</h3>
                <p className="text-blue-100 mb-4">
                  AI will create a personalized cover letter based on your inputs
                </p>
                <Button 
                  variant="hero" 
                  className="w-full bg-white text-primary hover:bg-white/90"
                  onClick={generateCoverLetter}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Cover Letter */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Generated Cover Letter
                    </CardTitle>
                    <CardDescription>
                      {generatedLetter ? `${wordCount} words` : 'Your personalized cover letter will appear here'}
                    </CardDescription>
                  </div>
                  {generatedLetter && (
                    <Button variant="outline" size="sm" onClick={regenerateLetter}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="space-y-4">
                    <div className="bg-background p-6 rounded-lg border border-border">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                        {generatedLetter}
                      </pre>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </Button>
                      <Button variant="hero" onClick={downloadAsPdf}>
                        <Download className="h-4 w-4 mr-2" />
                        Download as PDF
                      </Button>
                      <Button variant="outline" onClick={regenerateLetter}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Enhance with AI
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Fill in the job details and click "Generate with AI" to create your cover letter</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Cover Letter Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Address the hiring manager by name when possible</li>
                  <li>• Mention specific requirements from the job posting</li>
                  <li>• Highlight 2-3 key achievements with metrics</li>
                  <li>• Show enthusiasm for the company and role</li>
                  <li>• Keep it concise (3-4 paragraphs max)</li>
                  <li>• End with a clear call to action</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;