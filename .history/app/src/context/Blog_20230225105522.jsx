import { createContext, useContext } from "react";
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getAvatarUrl } from "src/functions/getAvatarUrl";
import {getRandomName} from "src/functions/getRandomName";
import idl from "src/idl.json";

import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey"; 
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes"; 

const BlogContext = createContext();

const PROGRAM_KEY = new PublicKey(idl.metadata,address)


export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside PostsProvider");
  }

  return context;
};

export const BlogProvider = ({ children }) => {

const user = {
    name: "Thoufiq",
    avatar: "https://avatarfiles.alphacoders.com/283/thumb-283778.jpg",
  }

const anchorWallet = useAnchorWallet()
const { connection } = useConnection();
const {publicKey} = useWallet(); 



  return (
    <BlogContext.Provider
      value={{
        user
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
