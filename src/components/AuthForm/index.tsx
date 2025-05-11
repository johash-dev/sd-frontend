import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LoginForm } from '../LoginForm/LoginForm';
import { SignUpForm } from '../SignUpForm';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 flex flex-col items-center">
        {/* <PokerLogo className="h-16 w-16 mb-2" /> */}
        <CardTitle className="text-2xl font-bold text-center">
          Scrum Deck
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === 'login'
            ? 'Sign in to your account to continue'
            : 'Create an account to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            {' '}
            <LoginForm />{' '}
          </TabsContent>
          <TabsContent value="signup">
            {' '}
            <SignUpForm />{' '}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
