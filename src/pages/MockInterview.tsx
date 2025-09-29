import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  Star,
  Lightbulb,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/apiConfig";

interface Question {
  id: string;
  type: "behavioral" | "technical" | "situational";
  company: string;
  question: string;
  tips: string[];
  difficulty: "easy" | "medium" | "hard";
}

interface Answer {
  questionId: string;
  answer: string;
  timeSpent: number;
  score?: number;
  feedback?: string;
}

const MockInterview = () => {
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState("google");
  const [selectedType, setSelectedType] = useState("technical");
  const [role, setRole] = useState("Software Engineer");
  const [skills, setSkills] = useState("React, TypeScript, System Design");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const companies = [
    { value: "google", label: "Google", color: "bg-blue-500" },
    { value: "meta", label: "Meta", color: "bg-blue-600" },
    { value: "amazon", label: "Amazon", color: "bg-orange-500" },
    { value: "apple", label: "Apple", color: "bg-gray-800" },
    { value: "microsoft", label: "Microsoft", color: "bg-blue-700" },
    { value: "netflix", label: "Netflix", color: "bg-red-600" },
  ];

  const questionTypes = [
    {
      value: "technical",
      label: "Technical",
      description: "Problem-solving and technical skills",
    },
    {
      value: "behavioral",
      label: "HR",
      description: "Behavioral and HR questions",
    },
  ];
  const skillTags = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "SQL",
    "System Design",
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "AWS",
  ];

  const toggleSkill = (tag: string) => {
    const set = new Set(
      skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
    if (set.has(tag)) {
      set.delete(tag);
    } else {
      set.add(tag);
    }
    setSkills(Array.from(set).join(", "));
  };

  const mockQuestions: Question[] = [
    {
      id: "1",
      type: "behavioral",
      company: "google",
      question:
        "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on your actions and what you learned",
        "Show emotional intelligence and conflict resolution skills",
      ],
      difficulty: "medium",
    },
    {
      id: "2",
      type: "technical",
      company: "google",
      question:
        "How would you design a system to handle 1 million concurrent users?",
      tips: [
        "Start with clarifying questions about requirements",
        "Discuss scalability, load balancing, and caching",
        "Consider database design and microservices architecture",
      ],
      difficulty: "hard",
    },
    {
      id: "3",
      type: "situational",
      company: "google",
      question:
        "If you discovered a critical bug in production just before a major product launch, what would you do?",
      tips: [
        "Assess the severity and impact of the bug",
        "Communicate with stakeholders immediately",
        "Propose solutions with risk-benefit analysis",
      ],
      difficulty: "medium",
    },
    {
      id: "4",
      type: "behavioral",
      company: "meta",
      question:
        "Describe a time when you had to learn a new technology quickly to complete a project.",
      tips: [
        "Highlight your learning methodology",
        "Show resourcefulness and adaptability",
        "Discuss the impact of your quick learning",
      ],
      difficulty: "easy",
    },
    {
      id: "5",
      type: "technical",
      company: "amazon",
      question:
        "Explain the difference between SQL and NoSQL databases and when you would use each.",
      tips: [
        "Compare ACID properties vs. eventual consistency",
        "Discuss use cases for each type",
        "Mention specific examples like MySQL vs. MongoDB",
      ],
      difficulty: "medium",
    },
  ];

  const [questions, setQuestions] = useState<Question[]>([]);
  const filteredQuestions = questions.length
    ? questions
    : mockQuestions.filter(
        (q) => q.company === selectedCompany && q.type === selectedType
      );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewStarted && !isPaused && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, isPaused, isComplete]);

  const startInterview = async () => {
    // Attempt to fetch 15 AI-generated questions first
    try {
      const context = `ROLE:${role}; SKILLS:${skills}; COMPANY:${selectedCompany}; TYPE:${selectedType}`;
      const res = await fetch(API_ENDPOINTS.REGENERATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputType: "mock_interview",
          text: context,
          keywords: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          experienceLevel: "mid",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.rewrittenText || "";
        const list = text
          .split(/\n|•/)
          .map((t: string) => t.trim())
          .filter((t: string) => t.length > 10)
          .slice(0, 15);
        if (list.length) {
          const diffs: Array<"easy" | "medium" | "hard"> = [
            "easy",
            "medium",
            "hard",
          ];
          setQuestions(
            list.map((q, i) => ({
              id: String(i + 1),
              type: selectedType as "behavioral" | "technical" | "situational",
              company: selectedCompany,
              question: q,
              tips: ["Use the STAR framework", "Be concise", "Mention impact"],
              difficulty: diffs[i % 3],
            }))
          );
        }
      }
    } catch {
      /* ignore AI failure and fallback to mock */
    }

    setIsInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    setAnswers([]);
    setCurrentAnswer("");
    setIsComplete(false);
  };

  const pauseInterview = () => {
    setIsPaused(!isPaused);
  };

  const nextQuestion = () => {
    // Save current answer
    if (currentAnswer.trim()) {
      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        timeSpent: timeElapsed,
        score: Math.floor(Math.random() * 3) + 3, // Mock score 3-5
        feedback: generateMockFeedback(),
      };
      setAnswers((prev) => [...prev, newAnswer]);
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer("");
      setTimeElapsed(0);
    } else {
      setIsComplete(true);
      setIsInterviewStarted(false);
    }
  };

  const generateMockFeedback = () => {
    const feedbacks = [
      "Great use of specific examples! Consider adding more quantifiable results.",
      "Good structure with the STAR method. Try to be more concise in your delivery.",
      "Excellent technical explanation. You could improve by discussing trade-offs.",
      "Strong problem-solving approach. Consider mentioning alternative solutions.",
      "Well-articulated response. Adding more context about the business impact would strengthen it.",
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const resetInterview = () => {
    setIsInterviewStarted(false);
    setIsPaused(false);
    setTimeElapsed(0);
    setCurrentQuestionIndex(0);
    setCurrentAnswer("");
    setAnswers([]);
    setIsComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getOverallScore = () => {
    if (answers.length === 0) return 0;
    const totalScore = answers.reduce(
      (sum, answer) => sum + (answer.score || 0),
      0
    );
    return Math.round((totalScore / answers.length) * 20); // Convert to percentage
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
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-l font-bold text-foreground">
                AI Mock Interview
              </h1>
            </div>
            {isInterviewStarted && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  {formatTime(timeElapsed)}
                </div>
                <Button variant="outline" size="sm" onClick={pauseInterview}>
                  {isPaused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isInterviewStarted && !isComplete ? (
          /* Setup Screen */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Practice Interview Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Prepare for your dream job with AI-powered mock interviews from
                top tech companies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Selection */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Select Company
                  </CardTitle>
                  <CardDescription>
                    Choose the company you want to practice for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={selectedCompany}
                    onValueChange={setSelectedCompany}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"any"}>
                        Any Company (Optional)
                      </SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company.value} value={company.value}>
                          {company.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Badge
                      key={"any"}
                      variant={
                        selectedCompany === "any" ? "default" : "secondary"
                      }
                      className="cursor-pointer justify-center py-1 text-[11px]"
                      onClick={() => setSelectedCompany("any")}
                    >
                      Any
                    </Badge>
                    {companies.map((company) => (
                      <Badge
                        key={company.value}
                        variant={
                          selectedCompany === company.value
                            ? "default"
                            : "secondary"
                        }
                        className="cursor-pointer justify-center py-1 text-[11px]"
                        onClick={() => setSelectedCompany(company.value)}
                      >
                        {company.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question Type Selection */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Question Type
                  </CardTitle>
                  <CardDescription>
                    Choose the type of questions to practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Role and Skills */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Role & Skills
                </CardTitle>
                <CardDescription>
                  Tell us your target role and key skills to tailor questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Role
                  </label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Frontend Engineer"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Skills
                  </label>
                  <Input
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., React, Node.js, AWS"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-muted-foreground mb-2">
                    Quick add skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={skills.includes(tag) ? "default" : "secondary"}
                        className="cursor-pointer text-[11px] py-1"
                        onClick={() => toggleSkill(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Interview Preview</CardTitle>
                <CardDescription>
                  You'll practice {filteredQuestions.length} questions from{" "}
                  {companies.find((c) => c.value === selectedCompany)?.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuestions.slice(0, 3).map((question, index) => (
                    <div
                      key={question.id}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg"
                    >
                      <Badge variant="outline" className="text-xs">
                        Q{index + 1}
                      </Badge>
                      <Badge
                        className={`text-xs ${getDifficultyColor(
                          question.difficulty
                        )} text-white`}
                      >
                        {question.difficulty}
                      </Badge>
                      <span className="text-sm text-foreground flex-1">
                        {question.question.substring(0, 80)}...
                      </span>
                    </div>
                  ))}
                  {filteredQuestions.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{filteredQuestions.length - 3} more questions
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <Card className="bg-gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <Play className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Start Mock Interview</h3>
                <p className="text-blue-100 mb-4">
                  Begin your practice session with {filteredQuestions.length}{" "}
                  carefully selected questions
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={startInterview}
                  disabled={filteredQuestions.length === 0}
                >
                  Start Interview
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : isComplete ? (
          /* Results Screen */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Interview Complete!
              </h2>
              <p className="text-xl text-muted-foreground">
                Great job! Here's your performance summary
              </p>
            </div>

            {/* Overall Score */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {getOverallScore()}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Overall Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {answers.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Questions Answered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {Math.round(
                        answers.reduce((sum, a) => sum + a.timeSpent, 0) /
                          answers.length /
                          60
                      )}
                      m
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg. Time per Question
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Question Results */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Question-by-Question Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {answers.map((answer, index) => {
                    const question = mockQuestions.find(
                      (q) => q.id === answer.questionId
                    );
                    return (
                      <div
                        key={answer.questionId}
                        className="p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (answer.score || 0)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatTime(answer.timeSpent)}
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {question?.question}
                        </p>
                        <div className="bg-background p-3 rounded text-sm text-muted-foreground mb-2">
                          <strong>Your answer:</strong>{" "}
                          {answer.answer.substring(0, 150)}...
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {answer.feedback}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetInterview}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Practice Again
              </Button>
              <Button variant="hero" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          /* Interview Screen */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Question {currentQuestionIndex + 1} of{" "}
                    {filteredQuestions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
                <Progress
                  value={
                    ((currentQuestionIndex + 1) / filteredQuestions.length) *
                    100
                  }
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedType}</Badge>
                    <Badge
                      className={`${getDifficultyColor(
                        currentQuestion?.difficulty || "medium"
                      )} text-white`}
                    >
                      {currentQuestion?.difficulty}
                    </Badge>
                  </div>
                  <Badge variant="secondary">
                    {companies.find((c) => c.value === selectedCompany)?.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {currentQuestion?.question}
                </h3>

                {/* Tips */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Tips for answering:
                  </h4>
                  <ul className="space-y-1">
                    {currentQuestion?.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Answer Input */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">
                    Your Answer:
                  </label>
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here... Take your time to think through your response."
                    rows={8}
                    className="resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {currentAnswer.length} characters
                    </span>
                    <Button
                      onClick={nextQuestion}
                      disabled={!currentAnswer.trim()}
                      variant="hero"
                    >
                      {currentQuestionIndex < filteredQuestions.length - 1
                        ? "Next Question"
                        : "Finish Interview"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
