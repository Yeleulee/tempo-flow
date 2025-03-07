import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Mail, Lock, AlertCircle, User, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      const user = result.user;
      console.log("Successfully signed in:", user.displayName);

      toast({
        title: "Login successful",
        description: `Welcome to TempoFlow AI, ${user.displayName || "User"}!`,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      // More detailed error message
      const errorMessage =
        error.message || "Failed to sign in with Google. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      toast({
        title: "Login successful",
        description: `Welcome to TempoFlow AI, ${user.email || "User"}!`,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Email sign-in error:", error);
      let errorMessage =
        "Failed to sign in with email. Please check your credentials.";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage =
          "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) return;

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      console.log("Creating account with:", {
        email,
        passwordLength: password.length,
      });

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = result.user;
      console.log("Account created successfully", user);

      // Update profile with name if provided
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      toast({
        title: "Account created successfully",
        description: `Welcome to TempoFlow AI, ${name || user.email || "User"}!`,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign-up error:", error.code, error.message);
      let errorMessage = "Failed to create account. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please sign in instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check and try again.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please use a stronger password (at least 6 characters).";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage =
          "Email/password accounts are not enabled. Please contact support.";
      }

      setError(`${errorMessage} (${error.code})`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding and Features */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">TempoFlow AI</h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Boost Your Productivity with AI-Powered Insights
          </h2>

          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals who use TempoFlow AI to organize
            tasks, focus better, and achieve more every day.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center mt-1">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Smart Task Management</h3>
                <p className="opacity-80">
                  AI-powered prioritization that learns from your habits
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center mt-1">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Focus Timer</h3>
                <p className="opacity-80">
                  Integrated Pomodoro timer with customizable intervals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center mt-1">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-lg">AI Assistant</h3>
                <p className="opacity-80">
                  Get personalized productivity recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full md:w-1/2 bg-background p-8 md:p-12 lg:p-16 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <TabsContent value="signin" className="space-y-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-12 border-muted-foreground/20 hover:bg-muted transition-all duration-300"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 bg-background"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="signin-password"
                      className="text-sm font-medium"
                    >
                      Password
                    </Label>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs"
                      disabled
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-background"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full h-12 mt-2"
                  onClick={handleEmailSignIn}
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-12 border-muted-foreground/20 hover:bg-muted transition-all duration-300"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 bg-background"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 bg-background"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="signup-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-background"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <Button
                  className="w-full h-12 mt-2"
                  onClick={handleSignUp}
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setActiveTab("signin")}
                >
                  Sign in
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
