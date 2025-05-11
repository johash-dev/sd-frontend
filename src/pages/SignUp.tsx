import AboutContent from '@/components/AboutContent';
import { SignUpForm } from '@/components/SignUpForm';

const SignUp = () => {
  return (
    <div className="h-full flex items-center gap-4">
      <div className="flex-4/6 px-24 min-h-3/5">
        <AboutContent />
      </div>

      <div className="flex-2/6 px-24">
        <div className="text-center mb-5 text-2xl font-light">
          <h1>Create an account</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
