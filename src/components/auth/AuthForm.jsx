import React from 'react';

import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import Responsive from '../../styles/Responsive';
import palette from '../../styles/palette';
import Button from '../../styles/Button';

const AuthFormWrapper = styled(Responsive)`
  height: 400px;
  width: 400px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  background: ${palette.gray[1]};
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  padding: 3rem;
  h2{
    margin-top: 0;
    color: black;
    font-weight: bold;
    font-size: 2rem;
  }
`;

const FormWrapper = styled.form`
  margin-top: 32px;
  display: grid;
  grid-template-rows: repeat(1,1fr);
  grid-row-gap: 1rem;
`;

const ErrorWrapper = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  color: ${palette.warn[2]};
  text-align: center;
`;

const InputWrapper = styled.input`
  background: white;
  height: 40px;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 24px;
  color: #5f5f5f;
  box-shadow: none;
  border: 0;
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;
  padding: 8px 12px;
  border: 2px solid #D7E2EB;
  &:focus{
    border: 2px solid ${palette.teal[5]};
  }
  &:hover{
    border: 2px solid ${palette.teal[5]};
  }
  width: 400px;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid ${palette.gray[4]};
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  
  a {
    font-weight: bold;
    color: ${palette.teal[5]};
    &:hover {
      color: ${palette.teal[3]};
    }
  }

  span {
    font-weight: lighter;
    color: ${palette.gray[6]};
    margin-right: 0.75rem;
  }
`;

const SpaceBlock = styled.div`
  height: 11rem;
`;

const StyledButton = styled(Button)`
  height: 40px;
  border: 2px solid ${palette.teal[5]};
  &:hover{
    border: 2px solid ${palette.teal[5]};
  }
`;

const FORM_TYPE = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({
  type, fields, onChange, onSubmit, error,
}) => {
  const formType = FORM_TYPE[type];

  const { userEmail, password } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <>
      <SpaceBlock />
      <AuthFormWrapper>
        <h2>{formType}</h2>
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper
            type="text"
            value={userEmail}
            name="userEmail"
            placeholder="이메일"
            autoComplete="email"
            onChange={handleChange}
          />
          <InputWrapper
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호"
            autoComplete="password"
            onChange={handleChange}
          />
          {type === 'register' && (
            <InputWrapper
              type="password"
              value={fields.passwordConfirm}
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              autoComplete="new-password"
              onChange={handleChange}
            />
          )}
          {error && (
            <ErrorWrapper>{error}</ErrorWrapper>
          )}
          <StyledButton
            success
            type="submit"
            data-testid="auth-button"
          >
            {formType}
          </StyledButton>
          {type === 'login' && (
            <Footer>
              <span>아직 회원이 아니신가요?</span>
              <Link
                to="/register"
                data-testid="sign-up-link"
              >
                회원가입
              </Link>
            </Footer>
          )}
        </FormWrapper>
      </AuthFormWrapper>
    </>
  );
};

export default AuthForm;
