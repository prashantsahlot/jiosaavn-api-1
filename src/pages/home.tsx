/** @jsxImportSource react */
import React, { useState, useEffect } from 'react'
import { Hono } from 'hono'

export const Home = new Hono()

// A small component to show a "fake" total-songs-searched counter that increments over time
export const SongCounter = () => {
  const [count, setCount] = useState(100000) // start at 1,00,000

  useEffect(() => {
    // Increase the count by a small random amount every second
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 10)) // up to +9
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
        Total Songs Searched
      </span>
      <span className="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
        {count.toLocaleString()}
      </span>
      <div className="text-neutral-400 mt-2 text-sm">
        (Fake count, updated gradually for demo purposes)
      </div>
    </div>
  )
}

// A meteor effect component. You can keep it or tweak colors if you like.
export const Meteors = ({ number }: { number: number }) => {
  return (
    <>
      {Array.from({ length: number || 20 }, (_, idx) => (
        <span
          key={idx}
          className="meteor animate-[meteorAnimation_3s_linear_infinite] absolute h-1 w-1 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
          }}
        />
      ))}
    </>
  )
}

Home.get('/', (c) => {
  const title = 'JioSaavn API'
  const description =
    'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

  return c.html(
    <html>
      <head>
        <title>JioSaavn API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saavn.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://saavn.dev/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Frozen-Bots/jiosaavn-api/main/assets/preview.jpg"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/Frozen-Bots/jiosaavn-api/main/assets/preview.jpg"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://raw.githubusercontent.com/Frozen-Bots/jiosaavn-api/main/assets/favicon.ico"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
              font-family: 'Inter', sans-serif;
            }
            /* Change background to a darker slate/blue color */
            body {
              background-color: #0f172a; /* slate-900 */
            }
            /* Animate a subtle gradient for the text (cold sky blue) */
            @keyframes borderAnimation {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
            /* Meteor effect color changed to a lighter bluish (#93c5fd ~ Tailwind sky-300) */
            @keyframes meteorAnimation {
              0% {
                transform: rotate(215deg) translateX(0);
                opacity: 1;
              }
              70% {
                opacity: 1;
              }
              100% {
                transform: rotate(215deg) translateX(-500px);
                opacity: 0;
              }
            }
            .meteor::before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, #93c5fd, transparent);
            }
            .animate-meteor-effect {
              animation-name: meteorAnimation;
            }
          `
          }}
        />
      </head>
      <body className="mx-auto md:min-h-screen max-w-screen-lg flex flex-col">
        <main className="mx-auto my-auto flex flex-col space-y-8 px-4 pb-8 md:py-10 relative overflow-y-hidden overflow-x-hidden">
          <Meteors number={15} />

          {/* Header */}
          <div className="flex flex-row items-center space-x-4 ml-6">
            <svg className="sm:h-12 sm:w-12 h-8 w-8 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#3B82F6" 
                d="M3.172 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.172 8.535C4.343 22 6.229 22 10 22h3.376A4.25 4.25 0 0 1 17 16.007V12.25a2.25 2.25 0 0 1 4.5 0a.75.75 0 0 0 .5.707V12c0-4.714 0-7.071-1.172-8.536C19.657 2 17.771 2 14 2h-4C6.229 2 4.343 2 3.172 3.464"
                opacity=".5"
              />
              <path
                fill="#3B82F6"
                fillRule="evenodd"
                d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m11-.5a.75.75 0 0 1 .75.75a2.25 2.25 0 0 0 2.25 2.25a.75.75 0 0 1 0 1.5a3.734 3.734 0 0 1-2.25-.75v5a2.75 2.75 0 1 1-1.5-2.45v-5.55a.75.75 0 0 1 .75-.75m-.75 8.75a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-2xl md:text-4xl text-transparent font-bold leading-none bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
              JioSaavn API
              <span className="uppercase text-sm ml-3 text-gray-400 font-normal sm:hidden">Unofficial</span>
            </p>
            <p className="hidden sm:block animate-[borderAnimation_3s_linear_infinite] rounded bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-[length:400%_400%] p-1">
              <span className="block rounded px-1.5 py-0.5 text-xs text-white uppercase tracking-wider">Unofficial</span>
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-0 relative grid-flow-row">
            {/* 1) Explore Docs */}
            <a
              target="_blank"
              className="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="/docs"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-600 text-blue-600">
                  Get Started
                </span>
                <span className="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
                  Explore the Docs
                </span>
                <div className="text-neutral-400 mt-2">
                  Check out the documentation to learn how to use the JioSaavn API.
                </div>
              </div>
            </a>

            {/* 2) (Replaced "Open Source" with "Free to Use for All") */}
            <a
              target="_blank"
              className="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="#"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
                  Free
                </span>
                <span className="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
                  Free to Use for All
                </span>
                <div className="text-neutral-400 mt-2">
                  No cost or usage limit! Enjoy unlimited access to music data.
                </div>
              </div>
            </a>

            {/* 3) Contribute */}
            <a
              target="_blank"
              className="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="https://t.me/Frozensupport1"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
                  Contribute
                </span>
                <span className="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
                  Get Involved
                </span>
                <div className="text-neutral-400 mt-2">
                  Encounter a bug or have a feature suggestion? Report it on GitHub or
                  contribute by submitting a pull request.
                </div>
              </div>
            </a>

            {/* 4) Contact + Fake Counter */}
            <div className="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4">
              <div className="flex flex-col space-y-8">
                <div>
                  <span className="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
                    Contact
                  </span>
                  <span className="block text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
                    Frozen Bots
                  </span>
                  <div className="text-neutral-400 mt-2">
                    Have a question or need help? Reach out on{' '}
                    <a
                      href="https://github.com/prashantsahlot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-400"
                    >
                      GitHub
                    </a>
                    ,{' '}
                    <a
                      href="https://t.me/xyz09723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-300"
                    >
                      Twitter
                    </a>
                    , or{' '}
                    <a
                      href="https://t.me/xyz09723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-200"
                    >
                      Telegram
                    </a>
                    .
                  </div>
                </div>

                {/* Fake total-songs-searched counter */}
                <SongCounter />
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
})


