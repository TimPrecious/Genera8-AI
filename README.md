# Genera8 setup (Windows) - all free

1. Unzip, then open the `genera8` folder in VS Code.
2. In the terminal run:  npm install
3. Get a free Groq key: console.groq.com > API Keys > Create API Key (starts with gsk_).
   It powers the chat AND speech-to-text. No credit card needed.
4. Rename `.env.example` to `.env.local`, then paste the key:
       GROQ_API_KEY=gsk_yourKeyHere
   (no quotes, no spaces)
5. Start the app:  npm run dev   ->  open http://localhost:3000
6. Changed .env.local? Stop the app (Ctrl + C) and run npm run dev again.

Images use Pollinations and need no key. If images ever fail with a 401/403 message,
get a free key at enter.pollinations.ai and add POLLINATIONS_API_KEY=... to .env.local.

## If `npm` is blocked in PowerShell
Run `npm.cmd run dev`, or switch the terminal to Command Prompt.
"# Genera8-AI" 
