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
                  backgroundImage: `url("data:image/jpeg;base64,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")`,
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-cat">September 9, 2022<span className="dot"> </span>Blog</div>
                <div className="best-post-content-title">
                  My Very First Blog Site Using Solana
                </div>
                <div className="best-post-content-sub">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                          backgroundImage: `url("https://user-images.githubusercontent.com/62637513/184338539-9cdbdc58-1e72-4c48-8203-0b7ec23d3eb0.png")`,
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
