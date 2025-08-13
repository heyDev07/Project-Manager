import { useState } from 'react';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const useLoginMutation = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    data: LoginData,
    options?: {
      onSuccess?: (data: AuthResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      const response: AuthResponse = {
        user: {
          id: '1',
          email: data.email,
          name: 'User'
        },
        token: 'mock-jwt-token'
      };
      
      options?.onSuccess?.(response);
    } catch (error) {
      options?.onError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};

export const useSignupMutation = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    data: SignupData,
    options?: {
      onSuccess?: (data: AuthResponse) => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      const response: AuthResponse = {
        user: {
          id: '1',
          email: data.email,
          name: data.name
        },
        token: 'mock-jwt-token'
      };
      
      options?.onSuccess?.(response);
    } catch (error) {
      options?.onError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};

export const useForgotPasswordMutation = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    data: { email: string },
    options?: {
      onSuccess?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};

export const useResetPasswordMutation = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    data: { newPassword: string; confirmPassword: string; token: string },
    options?: {
      onSuccess?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};

export const useLogoutMutation = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    options?: {
      onSuccess?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear local storage
      localStorage.removeItem('authToken');
      
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}; 