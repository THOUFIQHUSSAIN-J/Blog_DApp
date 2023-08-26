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
