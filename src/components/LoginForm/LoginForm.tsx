import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const LoginForm: FC = () => {
  return (
    <form>
      <div className="flex flex-col gap-1.5">
        <Input type="email" placeholder="Email" />
        <Input type="passowrd" placeholder="Password" />
        <Button>Login</Button>
      </div>
    </form>
  );
};

export { LoginForm };
