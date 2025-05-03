import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormData } from '@/models/Login';
import { loginUser } from '@/features/authSlice';
import { useAppDispatch } from '@/app/store';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1.5">
        <Input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export { LoginForm };
