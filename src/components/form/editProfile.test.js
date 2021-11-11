import { render, screen,act,wait,waitForElement,waitFor,fireEvent} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditProfileForm from './editProfile'
import {DetailProvider} from 'src/context/DetailContext'

describe("Login page", () => {

    it("Button enable and form data", async () => {
      render(
        <HashRouter>
          <DetailProvider>
            <EditProfileForm />
          </DetailProvider>
        </HashRouter>
      );
  
        expect(screen.getByRole("button", { name: /save details/i })).toBeEnabled();
        userEvent.type(screen.getByPlaceholderText(/email address/i), "email@gmail.com");
        userEvent.type(screen.getByPlaceholderText(/phone number/i), "776544342");
        userEvent.type(screen.getByPlaceholderText(/username/i), "user123");
        
    });
    it("values", async () => {
        render(
          <HashRouter>
            <DetailProvider>
              <EditProfileForm />
            </DetailProvider>
          </HashRouter>
        );
    
          const email = screen.getByPlaceholderText(/email address/i)
          userEvent.type(email, "email@gmail.com");
          expect(email.value).toBe("email@gmail.com")

          const username = screen.getByPlaceholderText(/username/i)
          userEvent.type(username, "user123");
          expect(username.value).toBe("user123")

          const number = screen.getByPlaceholderText(/phone number/i)
          userEvent.type(number, "0776544342");
          expect(number.value).toBe("776544342")
          
      });

    
  });