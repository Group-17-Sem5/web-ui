import { render, screen,act,wait,waitForElement,waitFor,fireEvent} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddPostForm from './addPost'
import {DetailProvider} from 'src/context/DetailContext'

describe("Login page", () => {

    it("First save details button desabled", async()=>{
        render(
            <HashRouter>
              <DetailProvider>
                <AddPostForm />
              </DetailProvider>
            </HashRouter>
          );
          expect(screen.getByRole("button", { name: /save details/i })).toBeDisabled();
    })

    it("After form fill button enabled", async()=>{
        render(
            <HashRouter>
              <DetailProvider>
                <AddPostForm />
              </DetailProvider>
            </HashRouter>
          );
            
            userEvent.type(screen.getByPlaceholderText(/sender/i), "sender001");
            userEvent.type(screen.getByPlaceholderText(/receiver/i), "receiver001");
            userEvent.type(screen.getByPlaceholderText(/LastAppeared Branch/i), "sender001");
            userEvent.type(screen.getByPlaceholderText(/Receiving Branch/i), "sender001");
            expect(screen.getByRole("button", { name: /save details/i })).toBeEnabled();
    })

  });