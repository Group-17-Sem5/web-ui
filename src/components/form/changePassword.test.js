import { render, screen,act,wait,waitForElement,waitFor,fireEvent} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ChangePasswordForm from './changePassword'
import {DetailProvider} from 'src/context/DetailContext'

describe("Login page", () => {

    it("Button enable and form data", async () => {
      render(
        <HashRouter>
          <DetailProvider>
            <ChangePasswordForm />
          </DetailProvider>
        </HashRouter>
      );
  
        expect(screen.getByRole("button", { name: /save details/i })).toBeEnabled();
        // userEvent.type(screen.getByPlaceholderText(/password/i), "password");
        // userEvent.type(screen.getByPlaceholderText(/confirm password/i), "password");
        
        
    });
    it("values", async () => {
        render(
          <HashRouter>
            <DetailProvider>
              <ChangePasswordForm />
            </DetailProvider>
          </HashRouter>
        );
    
          const pw = screen.getByPlaceholderText(/enter value/i)
          userEvent.type(pw, "123");
          expect(pw.value).toBe("123")

          const conPw = screen.getByPlaceholderText(/confirm password/i)
          userEvent.type(conPw, "123");
          expect(conPw.value).toBe("123")
          
      });

      it("check both values same or not", async () => {
        render(
          <HashRouter>
            <DetailProvider>
              <ChangePasswordForm />
            </DetailProvider>
          </HashRouter>
        );
    
        const pw = screen.getByPlaceholderText(/enter value/i)
        userEvent.type(pw, "123");
        const conPw = screen.getByPlaceholderText(/confirm password/i)
        userEvent.type(conPw, "123");

        expect(pw.value).toBe(conPw.value)
          
      });

    
  });