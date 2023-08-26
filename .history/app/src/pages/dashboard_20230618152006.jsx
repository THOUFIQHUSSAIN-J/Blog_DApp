import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'



export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")

  const {user, initialized, initUser, showModal, setShowModal, createPost, posts} = useBlog();
  // Static Data

  /////////////////

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14  shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink"
            >
              Blog It!
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2 capitalize underlinepink">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (  
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true)
                  }}>
                  Create Post
                </Button>
                ) : (
                  <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser()
                  }}>
                  Create User
                </Button>
                )}
            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="row">

            <article className="best-post">
              <div
                className="best-post-image"
                style={{
                  backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/011/007/135/original/man-standing-holding-laptop-while-giving-ok-sign-with-hand-3d-render-character-illustration-free-png.png")`,
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-cat">September 9, 2022<span className="dot"> </span>Blog</div>
                <div className="best-post-content-title">
                  My Very First Blog Site Using Solana
                </div>
                <div className="best-post-content-sub">
                  Welcome, dear readers, to my first-ever blog! Today, I am filled with a mixture of excitement, nerves, and anticipation as I take my first steps into the world of online writing. This blog marks the beginning of a new chapter in my life, where I have chosen to embrace the power of words and share my thoughts, experiences, and passions with all of you. Join me on this incredible journey of self-expression, exploration, and growth.
                </div>
              </div>
            </article>

            <div className="all__posts">
              {posts.map((item) => {
                return (
                  <article className="post__card-2"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`)
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url("data:image/jpeg;base64,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")`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">December 2, 2021<span className="dot"> </span>{item.account.title} </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >×</span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
