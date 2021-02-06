import React from 'react';

import { Link } from 'react-router-dom';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

import { NOT_MEMBER_YET, REGISTER, FORM_TYPE } from '../../util/constants/constants';

import palette from '../../styles/palette';
import Button from '../../styles/Button';

const mq = facepaint([
  '@media(min-width: 1024px)',
]);

const AuthFormWrapper = styled.div`
  ${mq({
    width: ['calc(100% - 10rem)', '600px'],
    height: ['calc(100% - 1rem)', '400px'],
  })};
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  background: ${palette.gray[1]};

  h2 {
  ${mq({
    fontSize: ['3.5vw', '2rem'],
  })};
    font-weight: bold;
    margin-top: 0;
    color: black;
  }
`;

const FormWrapper = styled.form`
  display: grid;
  margin-top: 32px;
  grid-row-gap: 1rem;
  grid-template-rows: repeat(1,1fr);
`;

const ErrorWrapper = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  color: ${palette.warn[2]};
`;

const InputWrapper = styled.input`
  ${mq({
    height: ['auto', '40px'],
    width: ['45vw', '400px'],
    padding: ['1vw 12px', '8px 12px'],
  })};
  font-size: 1rem;
  line-height: 24px;
  border: 0;
  box-shadow: none;
  border: 2px solid #D7E2EB;
  border-radius: 0.25rem;
  color: #5f5f5f;
  background: white;
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;
  &:focus, &.hover {
    border: 2px solid ${palette.teal[5]};
  }
`;

const Footer = styled.div`
  ${mq({
    fontSize: ['2vw', '1rem'],
  })};
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  border-top: 1px solid ${palette.gray[4]};
  padding-top: 20px;
  
  a {
    font-weight: bold;
    color: ${palette.teal[5]};
    &:hover {
      color: ${palette.teal[3]};
    }
  }

  span {
    font-weight: lighter;
    margin-right: 0.75rem;
    color: ${palette.gray[6]};
  }
`;

const SpaceBlock = styled.div`
  height: 11rem;
`;

const StyledButton = styled(Button)`
  ${mq({
    height: ['100%', '40px'],
  })};
  border: 2px solid ${palette.teal[5]};
  &:hover{
    border: 2px solid ${palette.teal[5]};
  }
`;

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
              <span>{NOT_MEMBER_YET}</span>
              <Link
                to="/register"
                data-testid="sign-up-link"
              >
                {REGISTER}
              </Link>
            </Footer>
          )}
        </FormWrapper>
      </AuthFormWrapper>
    </>
  );
};

export default AuthForm;
