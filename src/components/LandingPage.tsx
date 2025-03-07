import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Clock,
  Calendar,
  MessageSquare,
  ChevronRight,
  Star,
  Zap,
  BarChart4,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">TempoFlow AI</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild className="h-10 px-5">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="h-10 px-5 bg-primary hover:bg-primary/90"
            >
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </nav>
            <div className="flex flex-col space-y-3 pt-3 border-t">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="h-4 w-4 mr-2" />
                <span>AI-Powered Productivity Suite</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Organize Tasks & Boost{" "}
                <span className="text-primary">Productivity</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl">
                Manage everything seamlessly with AI-powered insights that adapt
                to your work style and help you achieve more every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild className="h-12 px-6 text-base">
                  <Link to="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 text-base"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="relative z-10 bg-gradient-to-br from-card to-background p-2 rounded-2xl shadow-2xl border border-border/40">
                <img
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
                  alt="TempoFlow AI Dashboard"
                  className="rounded-xl w-full"
                />
              </div>
              <div className="absolute -right-6 -bottom-6 bg-card p-4 rounded-lg shadow-lg border border-border/40 z-20">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Productivity Score
                    </div>
                    <div className="text-2xl font-bold">87%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-2" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Maximize Productivity
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered tools adapt to your work style and help you achieve
              more with less effort
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Smart Task Management
              </h3>
              <p className="text-muted-foreground">
                AI-powered task prioritization that learns from your habits and
                suggests optimal task ordering.
              </p>
              <div className="mt-6 flex items-center text-primary text-sm font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pomodoro Timer</h3>
              <p className="text-muted-foreground">
                Integrated focus timer with customizable work/break intervals to
                maximize your productivity.
              </p>
              <div className="mt-6 flex items-center text-primary text-sm font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
              <p className="text-muted-foreground">
                Get personalized productivity patterns and suggestions based on
                your work habits.
              </p>
              <div className="mt-6 flex items-center text-primary text-sm font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Assistant</h3>
              <p className="text-muted-foreground">
                Chat with your AI assistant to create tasks, set reminders, and
                get productivity advice.
              </p>
              <div className="mt-6 flex items-center text-primary text-sm font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          <div className="mt-20 bg-card rounded-2xl overflow-hidden shadow-xl border border-border/40">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  <span>AI-Powered Analytics</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Understand Your Productivity Patterns
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI analyzes your work habits and provides actionable
                  insights to help you optimize your time and energy.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Identify your peak productivity hours</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Track focus session effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Get personalized improvement suggestions</span>
                  </li>
                </ul>
                <Button size="lg" className="h-12 px-6">
                  Explore Analytics
                </Button>
              </div>
              <div className="bg-muted/30 p-8 h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Analytics Dashboard"
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Clock className="h-4 w-4 mr-2" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How TempoFlow AI Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes and transform your productivity immediately
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-1/2 h-0.5 bg-primary/20 w-[calc(66.6%-6rem)] -translate-x-1/2"></div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="relative z-10 bg-card p-8 rounded-xl shadow-md border border-border/40 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Tasks</h3>
                <p className="text-muted-foreground">
                  Add your tasks with priorities, due dates, and descriptions to
                  keep everything organized.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"
                  alt="Create Tasks"
                  className="mt-6 rounded-lg w-full h-40 object-cover"
                />
              </div>

              <div className="relative z-10 bg-card p-8 rounded-xl shadow-md border border-border/40 text-center md:mt-12">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Focus with Pomodoro
                </h3>
                <p className="text-muted-foreground">
                  Use the Pomodoro timer to work in focused intervals and take
                  structured breaks.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80"
                  alt="Focus with Pomodoro"
                  className="mt-6 rounded-lg w-full h-40 object-cover"
                />
              </div>

              <div className="relative z-10 bg-card p-8 rounded-xl shadow-md border border-border/40 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get AI Insights</h3>
                <p className="text-muted-foreground">
                  Review your productivity patterns and receive AI-powered
                  recommendations to improve.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
                  alt="Get AI Insights"
                  className="mt-6 rounded-lg w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild className="h-12 px-6">
              <Link to="/login">
                Start Your Productivity Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of professionals who have transformed their
              workflow with TempoFlow AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-md border border-border/40 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User Avatar"
                  className="h-16 w-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-lg">John D.</h4>
                  <p className="text-sm text-muted-foreground">
                    Product Manager
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg italic">
                "TempoFlow AI has transformed how I manage my daily tasks. The
                AI insights are surprisingly accurate and have helped me
                increase my productivity by 40%."
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md border border-border/40 hover:shadow-lg transition-all duration-300 md:translate-y-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="User Avatar"
                  className="h-16 w-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-lg">Sarah M.</h4>
                  <p className="text-sm text-muted-foreground">
                    Freelance Designer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg italic">
                "The Pomodoro timer integrated with task management has boosted
                my productivity by at least 30%. As a freelancer, this has been
                a game-changer for my business."
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md border border-border/40 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                  alt="User Avatar"
                  className="h-16 w-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold text-lg">Michael T.</h4>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg italic">
                "The AI chat assistant is a game-changer. I can quickly add
                tasks and reminders through natural conversation. It feels like
                having a personal productivity coach."
              </p>
            </div>
          </div>

          <div className="mt-16 bg-card rounded-2xl overflow-hidden shadow-xl border border-border/40">
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Star className="h-4 w-4 mr-2" />
                <span>Trusted by Teams</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Join 10,000+ professionals using TempoFlow AI
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
                <div className="text-2xl font-bold">Company A</div>
                <div className="text-2xl font-bold">Company B</div>
                <div className="text-2xl font-bold">Company C</div>
                <div className="text-2xl font-bold">Company D</div>
                <div className="text-2xl font-bold">Company E</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-2" />
              <span>Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you and your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card p-8 rounded-xl shadow-md border border-border/40 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Free
                </h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="mt-3 text-muted-foreground">
                  Perfect for individuals just getting started
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Basic task management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Pomodoro timer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Limited AI insights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>1 user</span>
                </li>
              </ul>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-card p-8 rounded-xl shadow-xl border-2 border-primary/30 hover:shadow-lg transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Pro
                </h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="mt-3 text-muted-foreground">
                  For professionals seeking advanced features
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced task management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Customizable Pomodoro timer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Full AI insights & recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>1 user</span>
                </li>
              </ul>

              <Button size="lg" className="w-full" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>

            {/* Team Plan */}
            <div className="bg-card p-8 rounded-xl shadow-md border border-border/40 hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Team
                </h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="mt-3 text-muted-foreground">
                  For teams that need to collaborate
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Team collaboration features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Team analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Admin controls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Up to 10 users</span>
                </li>
              </ul>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of users who have transformed their workflow with
            TempoFlow AI.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="h-12 px-8 text-base"
          >
            <Link to="/login">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">TempoFlow AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered productivity tools to help you achieve more every
                day.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Updates
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TempoFlow AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
