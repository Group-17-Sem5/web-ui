import { render, screen,act,wait,waitForElement,waitFor,fireEvent} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from './LoginForm'
import {DetailProvider} from 'src/context/DetailContext'

describe("Login page", () => {

    it("First dave details button desabled", async()=>{
        render(
            <HashRouter>
              <DetailProvider>
                <LoginForm />
              </DetailProvider>
            </HashRouter>
          );
          expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
    })

    it("Login page enable login button", async () => {
      render(
        <HashRouter>
          <DetailProvider>
            <LoginForm />
          </DetailProvider>
        </HashRouter>
      );
  
        expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
        userEvent.type(screen.getByPlaceholderText(/email address/i), "email@gmail.com");
        userEvent.type(screen.getByPlaceholderText(/password/i), "password");
        expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
        
    });
    it("Login page check values", async () => {
        render(
          <HashRouter>
            <DetailProvider>
              <LoginForm />
            </DetailProvider>
          </HashRouter>
        );
    
          const email = screen.getByPlaceholderText(/email address/i)
          userEvent.type(email, "email@gmail.com");
          expect(email.value).toBe("email@gmail.com")

          const password = screen.getByPlaceholderText(/password/i)
          userEvent.type(password, "password");
          expect(password.value).toBe("password")
         
          
      });

    
  });