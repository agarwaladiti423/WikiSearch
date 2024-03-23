This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server on another repo WikiServer by using node server.js and then run this:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Performance and security considerations:
 -> Debouncing is applied for optimizing network calls.
 -> Intersection observer is used for managing infinite scrolls where we are only scrolling next set of results when last element is visible on the screen.
 -> Proper error handling is taken care using error boundary.
 -> Unnecessary rerenders is avoided using useCallback

For security below mitigation strategy can be used:
-> DOM purify library can be used for sanitizing the data
-> CSP headers can be used
-> API details can be encypted if it is having sensitive information

## More details:
 -> Read more navigates to wiki page for reading the detailed article
 -> Search history is maintained and clicking on search history will refetch the selected topic
 -> Search history is only manintained for the current session
 -> Search results are automatically fetched once user type in the search box (using onChange event)
 -> Loading text would be shown until we are getting the search results
 -> Clearing the search text from search box will clear the previously fetched results
 -> Accessibility is also taken care

