import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormData } from '@/models/Login';
import { loginUser } from '@/features/authSlice';
import { RootState, useAppDispatch } from '@/app/store';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useSelector } from 'react-redux';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmitLogin: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button variant="link" className="p-0 h-auto text-xs" type="button">
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in..' : 'Sign In'}
      </Button>
    </form>
  );
};

export { LoginForm };
